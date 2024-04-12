import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"
import {
  BoardContainer,
  ColumnContainer,
  ColumnsCenterAlign,
  Container,
  GroupsContainer,
  TableContainer,
} from "./styles"
import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { gql, useMutation, useQuery } from "@apollo/client"
import { Board, Group, Role, User } from "@/types"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import router, { useRouter } from "next/router"
import PrimitivesMySwitch from "@/components/BoardComponents/primitivesBoard/components/primitiveMySwitch"
import { DefaultButton } from "@/components/DefaultButton"

const FIND_MANY_GROUPS_IN_CREATE_BOARD = gql`
  query findManyGroupsInCreateBoard {
    groups {
      id
      name
      permission {
        id
        read
        write
        update
        delete
      }
    }
  }
`

const FIND_MANY_INVEST_IN_CREATE_BOARD = gql`
  query findManyInvestInCreateBoard {
    users(where: { typeUser: { equals: invest } }) {
      uuid
      name
      role
    }
  }
`

const CREATE_ONE_BOARD_IN_CREATE_BOARD = gql`
  mutation createOneBoardInCreateBoard($data: BoardUncheckedCreateInput!) {
    createOneBoard(data: $data) {
      id
    }
  }
`

const CREATE_ONE_GROUPS_IN_CREATE_BOARD = gql`
  mutation createOneGroupsInCreateBoard($args: GroupUncheckedCreateInput!) {
    createOneGroup(data: $args) {
      id
      name
      groupUser {
        user {
          name
        }
      }

      groupMenbership {
        group {
          groupUser {
            user {
              name
            }
          }
        }
      }
    }
  }
`

const BoardSchema = z.object({
  title: z.string(),
  category: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
  resume: z.string(),
  isPublic: z.boolean(),
  groups: z.array(
    z.object({
      id: z.number().nullable().optional(),
      name: z.string(),
      permission: z
        .object({
          id: z.number().nullable().optional(),
          read: z.boolean(),
          write: z.boolean(),
          update: z.boolean(),
          delete: z.boolean(),
        })
        .nullable(),
    }),
  ),
})

type BoardData_ = z.infer<typeof BoardSchema>

interface GroupsData {
  groups: Group[]
}

interface UsersData {
  users: User[]
}

export default function CreateBoard() {
  const router = useRouter()
  const { uuid } = useContext(AuthContext)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
    watch,
    register,
  } = useForm<BoardData_>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      title: "New Board",
      category: [],
      resume: "resume",
      isPublic: false,
      groups: Object.values(Role).map((role) => ({
        name: role,
        permission: {
          write: true,
          delete: true,
          read: true,
          update: true,
        },
      })),
    },
  })
  const { fields: fieldsGroups, update: updateGroup } = useFieldArray({ control, keyName: "key", name: "groups" })

  const { data: users } = useQuery<UsersData>(FIND_MANY_INVEST_IN_CREATE_BOARD)

  // const { data: groups } = useQuery<GroupsData>(FIND_MANY_GROUPS_IN_CREATE_BOARD)

  const [createBoard] = useMutation(CREATE_ONE_BOARD_IN_CREATE_BOARD)
  const [createOneGroup] = useMutation(CREATE_ONE_GROUPS_IN_CREATE_BOARD)

  const submit = async (data: BoardData_) => {

    if (data.category.length === 0) {
      return
    }

    try {
      const board = await createBoard({
        variables: {
          data: {
            title: data.title,
            isPublic: data.isPublic,
            createdBy: uuid,
            updatedBy: uuid,
            column: { create: { title: "Formulário do card", order: 0 } },
            category: { set: data?.category?.map((category) => category.value) },
          },
        },
      })

      if (board.data.createOneBoard.isPublic) {
        return
        // router.push(`/Board/Edit/${response.data.createOneBoard.id}`)
      }

      const seed = data.groups.map(async (group) => {
        const users_ = users?.users.filter((user) => user.role === group.name).map((user) => ({ userUuid: user.uuid }))
        if (users_?.length === 0) {
          return
        }

        const group_ = await createOneGroup({
          variables: {
            args: {
              name: group.name,
              createdBy: uuid,
              updatedBy: uuid,
              groupUser: { createMany: { data: users_ } },
              boardId: board.data.createOneBoard.id,
              permission: {
                create: {
                  write: group.permission?.write,
                  read: group.permission?.read,
                  update: group.permission?.update,
                  delete: group.permission?.delete,
                },
              },
            },
          },
        })
        return group_.data.createOneGroup
      })

      const result = (await Promise.all(seed)).filter((group) => group !== undefined)
      const result_ = result.filter((group) => group !== undefined)
        router.push(`/Board/Edit/${board.data.createOneBoard.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const columnRead = fieldsGroups?.map((group) => ({
    id: group.permission?.id,
    status: Boolean(group.permission?.read),
  }))
  const columnWrite = fieldsGroups?.map((group) => ({
    id: group.permission?.id,
    status: Boolean(group.permission?.write),
  }))
  const columnUpdate = fieldsGroups?.map((group) => ({
    id: group.permission?.id,
    status: Boolean(group.permission?.update),
  }))
  const columnDelete = fieldsGroups?.map((group) => ({
    id: group.permission?.id,
    status: Boolean(group.permission?.delete),
  }))

  return (
    <Container>
      <MenuHistoryPaths
        items={[
          { path: "/Adm/Boards", name: "Boards" },
          { path: "Board/CreateBoard", name: "Criar Board" },
        ]}
        loading={false}
      />
      <BoardContainer>
        <ColumnContainer>
          <PrimitivesBoard
            typeField='SHORTTEXT'
            label='Titulo do board'
            register={register("title")}
            placeholder='Titulo do board'
          />

          <PrimitivesBoard
            typeField='MY_MULTISELECT'
            label='Categoria'
            name='category'
            description='Escolha a categoria do board'
            control={control}
            options={[
              { value: "Financeiro", label: "Financeiro" },
              { value: "Operação", label: "Operação" },
              { value: "P&P", label: "P&P" },
              { value: "Vendas", label: "Vendas" },
              { value: "ADM", label: "ADM" },
              { value: "Gestão", label: "Gestão" },
              { value: "CS", label: "CS"}
            ]}
          />
          <PrimitivesMySwitch label='Público?' name='isPublic' control={control} />
          {!watch("isPublic") && (
            <TableContainer>
              <GroupsContainer>
                <th>Grupos</th>
                {fieldsGroups.map((group) => (
                  <td key={group.id}>{group.name}</td>
                ))}
              </GroupsContainer>

              <ColumnsCenterAlign>
                <th>Leitura</th>
                {columnRead?.map((permission, index) => (
                  <td key={permission.id}>
                    <PrimitivesMySwitch name={`groups.${index}.permission.read`} control={control} />
                  </td>
                ))}
              </ColumnsCenterAlign>
              <ColumnsCenterAlign>
                <th>Escrita</th>
                {columnWrite?.map((permission, index) => (
                  <td key={permission.id}>
                    <PrimitivesMySwitch name={`groups.${index}.permission.write`} control={control} />
                  </td>
                ))}
              </ColumnsCenterAlign>
              <ColumnsCenterAlign>
                <th>Edição</th>
                {columnUpdate?.map((permission, index) => (
                  <td key={permission.id}>
                    <PrimitivesMySwitch name={`groups.${index}.permission.update`} control={control} />
                  </td>
                ))}
              </ColumnsCenterAlign>
              <ColumnsCenterAlign>
                <th>Delete</th>
                {columnDelete?.map((permission, index) => (
                  <td key={permission.id}>
                    <PrimitivesMySwitch name={`groups.${index}.permission.delete`} control={control} />
                  </td>
                ))}
              </ColumnsCenterAlign>
            </TableContainer>
          )}

          <DefaultButton
            type='button'
            onClick={handleSubmit(submit)}
            style={{
              minHeight: "2.81rem",
            }}
          >
            Salvar
          </DefaultButton>
        </ColumnContainer>
      </BoardContainer>
    </Container>
  )
}
