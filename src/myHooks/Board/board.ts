import { OptionType } from "./../../components/BoardComponents/primitivesBoard/components/PrimitivesProjects/index";
import { format } from "date-fns";
import { Card } from "./../../components/projectPageComponents/ClientInf/styles";
import { client } from "@/lib/apollo"
import { Board, Column, User, FieldsValue, FieldType } from "@/types"
import { FetchResult, gql } from "@apollo/client"
import { z } from "zod"
import { ptBR } from "date-fns/locale";

export const SchemaUpdateBoard = z.object({
    id: z.string(),
    title: z.string().min(5, { message: "Adicione um titulo com no mínimo cinco caracteres" }),
    category: z.array(z.object({ value: z.string(), label: z.string() })).nullable(),
    isPublic: z.boolean(),
    showInCards: z
        .array(z.object({ value: z.string(), label: z.string(), show: z.boolean() }))
        .nullable()
        .optional(),
    groups: z.array(
        z.object({
            id: z.number().nullable().optional(),
            name: z.string(),
            permission: z
                .object({
                    id: z.number().nullable().optional(),
                    read: z.boolean().default(false),
                    write: z.boolean().default(false),
                    update: z.boolean().default(false),
                    delete: z.boolean().default(false),
                })
                .nullable()
                .optional(),
        }),
    ),
    columns: z.array(
        z.object({
            id: z.number(),
            title: z.string(),
            order: z.number(),
            fieldValue: z
                .array(
                    z.object({
                        fieldColumn: z.object({
                            fieldType: z.string(),
                            name: z.string(),
                            description: z.string(),
                            required: z.boolean(),
                        }),
                    }),
                )
                .nullable(),
        }),
    ),
})

const FIND_MANY_USERS_IN_FUNCTION_BOARD = gql`
query findManyUsersInFunctionBoard{
    users(where:{typeUser:{equals:invest}}){
        uuid
        role
    }
}
`

const UPSERT_ONE_GROUP_IN_FUNCTION_BOARD = gql`
mutation upsertOneGroupInFunctionBoard($id:Int!, $update:GroupUncheckedUpdateInput!, $create:GroupUncheckedCreateInput!){
    upsertOneGroup(where:{id:$id}, update:$update, create:$create){
        id
        groupUser {
            user{
                name
            }
        }
    }
}
`

const DELETE_MANY_GROUPS_IN_FUNCTION_BOARD = gql`
mutation deleteManyGroupsInFunctionBoard($where:GroupWhereInput!){
    deleteManyGroup(where:$where){
        count
    }
}
`

const FIND_UNIQUE_BOARD_IN_FUNCTION_BOARD = gql`
query findUniqueBoardInFunctionBoard($id:String!) {
    board(where:{id: $id}){
        id
        group{
            id
        }
    }
}
`

const UPDATE_ONE_BOARD_IN_FUNCTION_BOARD = gql`
mutation updateOneBoardInFunctionBoard($args: BoardUncheckedUpdateInput!, $id:String!){
    updateOneBoard(data: $args, where:{id:$id} ) {
        id
        group{
            id
            name
            permission {
                id
            }
        }
    }
}
`


type BoardData = {
    board: Board
}
type UserData = {
    users: User[]
}


export const updateOneBoard = async (data: z.infer<typeof SchemaUpdateBoard>) => {

    const categories = data.category?.map((category) => category.value)

    const { data: board } = await client.query<BoardData>({
        query: FIND_UNIQUE_BOARD_IN_FUNCTION_BOARD,
        variables: {
            id: data.id
        }
    })

    const { data: users } = await client.query<UserData>({
        query: FIND_MANY_USERS_IN_FUNCTION_BOARD
    })


    if (!data.isPublic) {

        await client.mutate({
            mutation: UPDATE_ONE_BOARD_IN_FUNCTION_BOARD,
            variables: {
                id: data.id,
                args: {
                    category: { set: data?.category?.map((category) => category.value) },
                    title: { set: data.title },
                    isPublic: { set: data.isPublic },
                },
            }
        })

        const filteredGroups = verifyRoleInGroup({ groups: data.groups })

        const seed = filteredGroups.map((group) => {
            return client.mutate({
                mutation: UPSERT_ONE_GROUP_IN_FUNCTION_BOARD,
                variables: {
                    id: group.id ?? 0,
                    create: {
                        boardId: data.id,
                        name: group.name,
                        permission: {
                            create: {
                                read: group.permission?.read,
                                write: group.permission?.write,
                                update: group.permission?.update,
                                delete: group.permission?.delete,
                            },
                        },
                        groupUser: {
                            createMany: {
                                data: users.users.filter(user => user.role === group.name).map(user => ({ userUuid: user.uuid })),
                                skipDuplicates: true,
                            }
                        }
                    },
                    update: {
                        boardId: { set: data.id },
                        name: { set: group.name },
                        permission: {
                            update: {
                                read: { set: group.permission?.read },
                                write: { set: group.permission?.write },
                                update: { set: group.permission?.update },
                                delete: { set: group.permission?.delete },
                            }
                        },
                        groupUser: {
                            createMany: {
                                data: users.users.filter(user => user.role === group.name).map(user => ({ userUuid: user.uuid })),
                                skipDuplicates: true,
                            }
                        }
                    }
                }
            })
        })

        return await Promise.all(seed)

    }

    if (data.isPublic) {
        await client.mutate({
            mutation: UPDATE_ONE_BOARD_IN_FUNCTION_BOARD,
            variables: {
                id: data.id,
                args: {
                    category: { set: data?.category?.map((category) => category.value) },
                    title: { set: data.title },
                    isPublic: { set: data.isPublic },
                },
            }
        })

        return client.mutate({
            mutation: DELETE_MANY_GROUPS_IN_FUNCTION_BOARD,
            variables: {
                where: {
                    id: {
                        in: board.board.group.map((group) => group.id)
                    }
                }
            }
        })

    }

}

type group = {
    id?: number | null,
    name: string,
    permission?: {
        id?: number | null,
        read: boolean,
        write: boolean,
        update: boolean,
        delete: boolean
    } | null
}

const verifyRoleInGroup = ({ groups }: { groups: group[] }) => {
    return groups.filter((group) => {
        if (group?.permission?.read || group?.permission?.write || group?.permission?.delete || group?.permission?.update) {
            return true
        }
    })
}


export const searchInBoard = ({ board, text = "", showOnlyCards, users }: { board: Board, text?: string, showOnlyCards: boolean, users?: User[] }) => {
    const lowerCaseText = text.toLocaleLowerCase();
    const filterByUser = text.includes("@") ? lowerCaseText.replace("@", "") : "";
    const filterByCardId = text.includes("#") ? lowerCaseText.replace("#", "") : "";
    const filterByUserUuid = filterByUser ? users?.find(user => user.name.toLocaleLowerCase().includes(filterByUser))?.uuid : "";

    const filteredColumns = board.column.map((column) => {
        const filteredCards = column.card.filter((card) => {
            const lowerCaseName = card.name.toLocaleLowerCase();
            return lowerCaseName.includes(lowerCaseText) ||
                card.id === filterByCardId ||
                card.updatedBy === filterByUserUuid ||
                card.createdBy === filterByUserUuid ||
                card.cardTags.some((card) => card.tag.title.toLocaleLowerCase().includes(lowerCaseText)) ||
                card.cardAssignment.some((assignment) => assignment.user.uuid === filterByUserUuid) ||
                matchFields(card.fieldValue, lowerCaseText)
        })
        return { ...column, card: filteredCards }
    })

    const filter = showOnlyCards ? filteredColumns.filter((column) => column.card.length > 0) : filteredColumns

    return { ...board, column: filter }
}

// const matchFields = (fields: FieldsValue[], search: string) => {
//     const process = fields.map((f) => {
//         if (f.field?.showInCard && filterAllContents({ search, content: f.content?.value, fieldType: f.fieldType })) {
//             return true
//         }
//         return false
//     }).some((f) => f === true)
//     return process
// }


const matchFields = (fields: FieldsValue[], search: string) => {
    return fields.some(f => 
        f.field?.showInCard && filterAllContents({ search, content: f.content?.value, fieldType: f.fieldType })
    );
}
const filterAllContents = ({ search, content, fieldType }: { search: string, content: string | string[] | number, fieldType: FieldType }) => {

    if (fieldType === "DATE") {
        const date = format(new Date(content as any), "P", { locale: ptBR })
        return date.includes(search)
    }

    if (fieldType === "PROJECTS") {
        const content_: OptionType[] = content as any
        return content_.map((item) => item.label).join()?.toLocaleLowerCase().includes(search)
    }

    if (typeof content === "string") {
        return content?.toLocaleLowerCase().includes(search)
    } else if (Array.isArray(content)) {
        return content.some(item => typeof item === "string" && item?.toLocaleLowerCase().includes(search))
    } else if (typeof content === "number") {
        return content?.toLocaleString.toString().includes(search)
    }

    return false

}