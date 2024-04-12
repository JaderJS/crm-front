import { client } from "@/lib/apollo"
import { Board, Card, CardTagsUncheckedCreateNestedManyWithoutCardInput, CardUncheckedCreateInput, Column, Field } from "@/types"
import { FetchResult, gql } from "@apollo/client"
import { schemaContentCard } from "./schema"

const CREATE_ONE_CARD_IN_FUNCTION_CARD = gql`
    mutation creteOneCardInFunctionCard($args:CardUncheckedCreateInput! ){
        createOneCard(data: $args) {
            id
            name
            column{
                id
                board{
                    id
                    title
                }
            }
        }
    }
`

const FIND_UNIQUE_BOARD_IN_FUNCTION_CARD = gql`
    query findUniqueBoardInBoardEditor($id: String!) {
        board(where: {id:$id}) {
            id
            column(orderBy:{order:asc}) {
                id
                order
            }
        }
     }
`

const CREATE_ONE_FIELD_VALUE_IN_FUNCTION_CARD = gql`
mutation createOneFieldValueInFunctionCard($args: FieldsValueUncheckedCreateInput!){
    createOneFieldsValue(data: $args) {
        id
    }
}
`


type CreateOneCardProps = ({ args }: { args: CardUncheckedCreateInput }) => Promise<FetchResult>

export const createOneCard: CreateOneCardProps = async (args) => {

    const newCard = client.mutate({
        mutation: CREATE_ONE_CARD_IN_FUNCTION_CARD,
        variables: { ...args }
    })

    return newCard
}

type CreateOneCardInInitialBoard = ({ args, boardId }: { args: Omit<CardUncheckedCreateInput, "columnId">, boardId: string }) => Promise<FetchResult>

type BoardData = {
    board: Board
}
export const createOneCardInInitialBoard: CreateOneCardInInitialBoard = async ({ args, boardId }) => {

    const { data: board } = await client.query<BoardData>({
        query: FIND_UNIQUE_BOARD_IN_FUNCTION_CARD,
        variables: { id: boardId }
    })

    const firstColumnId = board.board.column?.[0].id

    const newCard = client.mutate({
        mutation: CREATE_ONE_CARD_IN_FUNCTION_CARD,
        variables: { ...args, columnId: firstColumnId }
    })
    return newCard
}

export const createOneCardInInitialColumn: CreateOneCardInInitialBoard = async ({ args, boardId }) => {

    const { data: board } = await client.query<BoardData>({
        query: FIND_UNIQUE_BOARD_IN_FUNCTION_CARD,
        variables: { id: boardId }
    })
    const firstColumnId = board.board.column?.[1].id

    const newCard = client.mutate({
        mutation: CREATE_ONE_CARD_IN_FUNCTION_CARD,
        variables: { args: { ...args, columnId: firstColumnId } }
    })


    return newCard
}



export const updateOneHistoryCard = ({ content, card, id, field: field_, updatedBy, name }: { content: any, card: Card, id: number, field: { id: number, fieldType: string }, updatedBy: string, name: string }) => {

    client.mutate({
        mutation: CREATE_ONE_FIELD_VALUE_IN_FUNCTION_CARD,
        variables: {
            args: {
                cardId: card.id,
                createdBy: updatedBy,
                fieldId: field_.id,
                fieldType: field_.fieldType,
                content: { value: content }
            }
        }
    }).catch(console.warn)



    // console.log("BEFORE", card)
    const updatedContent = {
        ...card, column: {
            ...card.column, fieldValue: card.column.fieldValue.map(field => {
                if (field.fieldColumn.id === field_.id) {

                    const seedA = {
                        ...field, fieldColumn: {
                            ...field.fieldColumn, FieldsValue: [{
                                ...field.fieldColumn.FieldsValue[0],
                                content: {
                                    value: content
                                },
                                createdAt: new Date(),
                                createdBy: updatedBy,
                                user: {
                                    ...field.fieldColumn.FieldsValue[0]?.user,
                                    uuid: updatedBy,
                                    name: name
                                }
                            }]
                        }
                    }
                    console.log("SEED", seedA)
                    return seedA
                }
                return field
            })
        },
        updatedBy
    }

    try {
        // console.log("AFTER", updatedContent)
        const verifySeed = schemaContentCard.parse(updatedContent)
        return verifySeed
    } catch (error) {
        console.error(error)
        return card
    }

}


type MovementColumn = {
    from: string;
    to: string;
    createdAt: string;
    step: "back" | "front";
}

export const aggregateUniqueOrderMovementCard = ({ card, showAll }: { card?: Card, showAll: boolean }) => {


    if (showAll) {
        return card?.moviment
    }

    const groupedColumns: MovementColumn = card?.moviment?.reduce((groups: any, movement) => {
        const key = `${movement.fromColumn.id}-${movement.toColumn.id}`

        if (!groups[key] || movement.createdAt > groups[key].createdAt) {

            groups[key] = {
                id: movement.id,
                from: movement.fromColumn.id,
                to: movement.toColumn.id,
                createdAt: movement.createdAt,
                step: (movement.toColumn.order - movement.fromColumn.order) > 0 ? "front" : "back"
            }
        }

        return groups
    }, {}) ?? {}

    const columnsArray = Object.values(groupedColumns)

    return card?.moviment.filter((movement) => columnsArray.map((item: any) => item.id).includes(movement.id))


}