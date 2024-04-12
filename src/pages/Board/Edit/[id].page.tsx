import { ButtonHTMLAttributes, useContext, useEffect, useState } from "react"

import {
  Board,
  Column,
  BoardUncheckedUpdateInput,
  PrimitiveFields,
  ColumnUncheckedCreateInput,
  ColumnUncheckedUpdateManyInput,
  ColumnUncheckedUpdateInput,
  FieldColumn,
  Field,
  FieldsValue,
  User,
  Role,
} from "@/types"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { GetServerSideProps } from "next"

import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import {
  BoardContainer,
  ButtonAdd,
  ButtonsContainer,
  ColumnContainer,
  ColumnContent,
  ColumnsCenterAlign,
  Container,
  GroupsContainer,
  MenuPlusContainer,
  TableContainer,
  TrashButton,
} from "./styles"
import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { AddCircle, ArrowLeft, ArrowRight, Trash } from "iconsax-react"
import Swal from "sweetalert2"
import { DefaultButton } from "@/components/DefaultButton"
import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"
import { FormText } from "@/components/InputFormComponents/Text"
import FormSelect from "@/components/InputFormComponents/Select"
import FormSwitch from "@/components/InputFormComponents/Switch"
import PrimitivesMySwitch from "@/components/BoardComponents/primitivesBoard/components/primitiveMySwitch"
import { AuthContext } from "@/contexts/AuthContext"
import Skeleton from "react-loading-skeleton"
import { updateOneBoard } from "@/myHooks/Board/board"

const NOT_SHOW_ROLES = ["root", "user"]

const FIND_UNIQUE_BOARD_IN_BOARD_EDIT = gql`
  query findUniqueBoardInBoardEdit($id: String!) {
    board(where: { id: $id }) {
      id
      title
      isPublic
      category
      authorizedCustom {
        isAuth
      }
      group {
        id
        name
        permission {
          id
          write
          read
          update
          delete
        }
        groupUser {
          user {
            name
          }
        }
      }
      groupMenbership {
        group {
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
      createdByUser {
        name
        avatarUrl
      }
      updatedByUser {
        name
        avatarUrl
      }
      column(orderBy: { order: asc }) {
        id
        title
        order
        updatedByUser {
          name
          avatarUrl
        }

        fieldValue(orderBy: { fieldColumn: { order: asc } }) {
          columnId
          fieldColumnId

          fieldColumn {
            fieldType
            name
            required
            description
            id
            showInCard
            content
            FieldsValue {
              content
            }
          }
        }
        card {
          id
          name
        }
      }
      createdAt
      updatedAt
    }
  }
`

const FIND_MANY_INVEST_IN_EDIT_BOARD = gql`
  query findManyInvestInEditBoard {
    users(where: { typeUser: { equals: invest } }) {
      uuid
      name
      role
    }
  }
`

const CREATE_ONE_COLUMN_IN_BOARD_EDIT = gql`
  mutation createOneColumnInBoardEdit($args: ColumnUncheckedCreateInput!) {
    createOneColumn(data: $args) {
      id
      title
      order
    }
  }
`

const DELETE_ONE_COLUMN_IN_BOARD_EDIT = gql`
  mutation deleteOneColumnInBoardEdit($id: Int!) {
    deleteOneColumn(where: { id: $id }) {
      id
    }
  }
`

const COUNT_CARDS_OF_COLUMN_IN_BOARD_EDIT = gql`
  query countCardsOfColumnInBoardEdit($id: Int!) {
    column(where: { id: $id }) {
      _count {
        card
      }
    }
  }
`

const UPDATE_ONE_COLUMNS_IN_BOARD_EDIT = gql`
  mutation updateOneColumnsInBoardEdit($id: Int!, $args: ColumnUncheckedUpdateInput!) {
    updateOneColumn(data: $args, where: { id: $id }) {
      id
    }
  }
`

const UPDATE_ONE_FIELD_IN_BOARD_EDIT = gql`
  mutation updateOneFieldInBoardEdit($id: Int!, $args: FieldUncheckedUpdateInput!) {
    updateOneField(data: $args, where: { id: $id }) {
      id
    }
  }
`

// const UPSERT_ONE_GROUP_IN_BOARD_EDIT = gql`
//   mutation upsertOneGroupInBoardEdit(
//     $id: Int!
//     $create: GroupUncheckedCreateInput!
//     $update: GroupUncheckedUpdateInput!
//   ) {
//     upsertOneGroup(where: { id: $id }, create: $create, update: $update) {
//       id
//       name
//       groupUser {
//         user {
//           name
//         }
//       }
//     }
//   }
// `

// const UPSERT_ONE_PERMISSION_IN_EDIT_BOARD = gql`
//   mutation upsertOnePermissionInEditBoard(
//     $id: Int!
//     $create: PermissionUncheckedCreateInput!
//     $update: PermissionUncheckedUpdateInput!
//   ) {
//     upsertOnePermission(where: { id: $id }, create: $create, update: $update) {
//       id
//     }
//   }
// `

// const DELETE_ONE_GROUP_IN_BOARD_EDIT = gql`
//   mutation deleteOneGroupInBoardEdit($id: Int!) {
//     deleteOneGroup(where: { id: $id }) {
//       id
//     }
//   }
// `

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  return {
    props: {
      params,
    },
  }
}

const SchemaUpdateBoard = z.object({
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
type SchemaUpdateBoardProp = z.infer<typeof SchemaUpdateBoard>

interface BoardData {
  board: Board
}

interface UsersData {
  users: User[]
}

export default function EditBoard({ params }: { params: { id: string } }) {
  const { uuid } = useContext(AuthContext)

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    getValues,
    watch,
    register,
    formState: { errors },
  } = useForm<SchemaUpdateBoardProp>({
    resolver: zodResolver(SchemaUpdateBoard),
    mode: "onChange",
  })

  const {
    fields: fieldsColumn,
    append: appendColumn,
    remove: removeColumn,
    swap: swapColumn,
  } = useFieldArray({
    keyName: "customId",
    control,
    name: "columns",
  })

  const { fields: fieldsGroups } = useFieldArray({ control, keyName: "key", name: "groups" })

  const { data: users } = useQuery<UsersData>(FIND_MANY_INVEST_IN_EDIT_BOARD)

  const {
    data: board,
    refetch: refetchBoard,
    loading,
  } = useQuery<BoardData>(FIND_UNIQUE_BOARD_IN_BOARD_EDIT, {
    variables: { id: params.id },
    skip: params.id === undefined,
    fetchPolicy: "network-only",

    onCompleted: (response) => {
      const defaultResumeCardFields =
        response.board.column
          .reduce(
            (acc, column) => {
              const fields = column.fieldValue.map((field) => ({
                value: field.fieldColumn.id.toString(),
                label: field.fieldColumn.name,
                show: field.fieldColumn.showInCard,
              }))
              return acc.concat(fields)
            },
            [] as { value: string; label: string; show: boolean }[],
          )
          .filter((item) => item.show === true) ?? []

      console.log("SHOW IN CARD", defaultResumeCardFields)
      console.log("ROLES", Object.values(Role))

      const groups = Object.values(Role)
        .filter((role) => (!NOT_SHOW_ROLES.includes(role)))
        .map((role) => ({
          id: undefined,
          name: role,
          permission: {
            id: undefined,
            write: false,
            delete: false,
            read: false,
            update: false,
          },
        }))
        .filter((group) => !response.board.group.map((g) => g.name).includes(group.name))

      reset({
        id: response.board.id,
        category: response.board.category.map((category) => ({ value: category, label: category })),
        columns: response.board.column,
        groups: response.board.group
          .map((group) => ({
            id: group.id,
            name: group.name,
            permission: {
              ...group.permission,
            },
          }))
          .concat(groups as any),
        title: response.board.title,
        showInCards: defaultResumeCardFields,
        isPublic: response.board.isPublic,
      })
    },
  })

  console.log(board)

  const [countCardsInColumn] = useLazyQuery(COUNT_CARDS_OF_COLUMN_IN_BOARD_EDIT)

  const [createOneColumn] = useMutation(CREATE_ONE_COLUMN_IN_BOARD_EDIT)
  const [updateOneField] = useMutation(UPDATE_ONE_FIELD_IN_BOARD_EDIT, { onCompleted: () => refetchBoard() })
  const [deleteColumn] = useMutation(DELETE_ONE_COLUMN_IN_BOARD_EDIT, { onCompleted: () => refetchBoard() })
  const [updateColumn] = useMutation(UPDATE_ONE_COLUMNS_IN_BOARD_EDIT, { onCompleted: () => refetchBoard() })

  const handleDeleteOneColumn = async ({ id, index }: { id: number; index: number }) => {
    try {
      const { data: cards } = await countCardsInColumn({ variables: { id } })
      if (cards.column._count.card !== 0) {
        Swal.fire({
          icon: "warning",
          title: "Você deseja deletar essa coluna?",
          text: `Você tem ${cards.column._count.card ?? 0} cards afetados`,
          showCancelButton: true,
          confirmButtonText: "Sim, delete isso!",
          cancelButtonText: "Não, cancele!",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deletado!", "Coluna deletada com sucesso!")
            deleteColumn({ variables: { id } })
            removeColumn(index)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelado", "Imagina quantos cards vc salvou :)")
          }
        })
      } else {
        deleteColumn({ variables: { id } })
        removeColumn(index)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const showInCardOptions =
    board?.board.column.reduce(
      (acc, column) => {
        const fields = column.fieldValue.map((field) => ({
          value: field.fieldColumn.id.toString(),
          label: field.fieldColumn.name,
          show: field.fieldColumn.showInCard,
        }))
        return acc.concat(fields)
      },
      [] as { value: string; label: string; show: boolean }[],
    ) ?? []

  const onSubmit = async (data: SchemaUpdateBoardProp) => {

    await updateOneBoard(data).then(() => {
      tostComponent({ title: "Alterações foram feitas no Kanban" })
    })

    data.columns.map((column, index: number) => {
      updateColumn({ variables: { id: column.id, args: { order: { set: index }, title: { set: column.title } } } })
    })


    showInCardOptions?.forEach(field => {
      if (data.showInCards?.map((item) => item.value).includes(field.value)) {
        updateOneField({ variables: { id: Number(field.value), args: { showInCard: { set: true } } } })
        return
      }
      updateOneField({ variables: { id: Number(field.value), args: { showInCard: { set: false } } } })
    })
    // data.showInCards?.map((field) => {
    //   if (field.show)
    //     updateOneField({ variables: { id: Number(field.value), args: { showInCard: { set: field.show } } } }).catch(
    //       console.error,
    //     ).then(() => {
    //       console.log("field show updated", field)
    //     })
    // })
  }

  const handleCreateColumn = async () => {
    await createOneColumn({
      variables: {
        args: { boardId: params.id, title: "New column", order: fieldsColumn.length + 1 ?? 0 },
      },
    }).then((response) => {
      const { id, title, order } = response.data.createOneColumn
      appendColumn({ id, title, order, fieldValue: [] })
    })
    await refetchBoard()
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

  if (loading) {
    return (
      <Container>
        <Skeleton height={40} width={200} style={{ margin: "1rem 0" }} baseColor='#e0e0e0' highlightColor='#f5f5f5' />
        <BoardContainer>
          <ColumnContainer>
            <ColumnContent>
              <Skeleton
                height={40}
                width={200}
                style={{ margin: "1rem 0" }}
                baseColor='#e0e0e0'
                highlightColor='#f5f5f5'
              />
              <Skeleton
                height={40}
                width={200}
                style={{ margin: "1rem 0" }}
                baseColor='#e0e0e0'
                highlightColor='#f5f5f5'
              />
              <Skeleton
                height={40}
                width={200}
                style={{ margin: "1rem 0" }}
                baseColor='#e0e0e0'
                highlightColor='#f5f5f5'
              />
              <Skeleton
                height={40}
                width={200}
                style={{ margin: "1rem 0" }}
                baseColor='#e0e0e0'
                highlightColor='#f5f5f5'
              />
            </ColumnContent>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                width: "100%",
                padding: "0rem 1rem",
                alignItems: "center",
              }}
            >
              <Skeleton
                height={40}
                width={200}
                style={{ margin: "1rem 0" }}
                baseColor='#e0e0e0'
                highlightColor='#f5f5f5'
              />
            </div>
          </ColumnContainer>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              height: "90%",
            }}
          >
            <Skeleton
              height={40}
              width={200}
              style={{ margin: "1rem 0" }}
              baseColor='#e0e0e0'
              highlightColor='#f5f5f5'
            />
          </div>
        </BoardContainer>
      </Container>
    )
  }

  return (
    <Container>
      <MenuHistoryPaths
        items={[
          { path: "/Adm/Boards", name: "Boards" },
          { path: `/board/${params.id}/edit`, name: `Editar board > ${board?.board.title}` },
        ]}
        loading={loading}
      />

      <BoardContainer>
        <ColumnContainer>
          <ColumnContent>
            <FormText
              label='Titulo do board'
              description='Nomeie de maneira descritiva seu board'
              register={register("title")}
              error={errors.title}
            />

            <FormSelect
              label='Categoria'
              description='A quais categorias o board deve aparecer?'
              {...{
                control,
                name: "category",

                options: [
                  { value: "Financeiro", label: "Financeiro" },
                  { value: "Operação", label: "Operação" },
                  { value: "P&P", label: "P&P" },
                  { value: "Vendas", label: "Vendas" },
                  { value: "ADM", label: "ADM" },
                  { value: "Gestão", label: "Gestão" },
                  { value: "CS", label: "CS" },
                  { value: "root", label: "root" },
                ],
              }}
              error={errors.category}
            />

            <FormSelect
              label='Resumo'
              description='Quais fields deseja trazer como visualização rápida dentro do card?'
              {...{ control, name: "showInCards", options: showInCardOptions }}
              error={errors.showInCards}
            />

            <FormSwitch label='Público?' control={control} name={"isPublic"} error={errors.isPublic} />

            {!watch("isPublic") && (
              <TableContainer>
                <GroupsContainer>
                  <th>Grupos</th>
                  {fieldsGroups?.map((group) => <td key={group.id}>{group.name}</td>)}
                </GroupsContainer>
                <ColumnsCenterAlign>
                  <th>Leitura</th>
                  {columnRead?.map((permission, index) => (
                    <td key={permission.id}>
                      <FormSwitch name={`groups.${index}.permission.read`} control={control} />
                    </td>
                  ))}
                </ColumnsCenterAlign>
                <ColumnsCenterAlign>
                  <th>Escrita</th>
                  {columnWrite?.map((permission, index) => (
                    <td key={permission.id}>
                      <FormSwitch name={`groups.${index}.permission.write`} control={control} />
                    </td>
                  ))}
                </ColumnsCenterAlign>
                <ColumnsCenterAlign>
                  <th>Edição</th>
                  {columnUpdate?.map((permission, index) => (
                    <td key={permission.id}>
                      <FormSwitch name={`groups.${index}.permission.update`} control={control} />
                    </td>
                  ))}
                </ColumnsCenterAlign>
                <ColumnsCenterAlign>
                  <th>Delete</th>
                  {columnDelete?.map((permission, index) => (
                    <td key={permission.id}>
                      <FormSwitch name={`groups.${index}.permission.delete`} control={control} />
                    </td>
                  ))}
                </ColumnsCenterAlign>
              </TableContainer>
            )}
          </ColumnContent>

          <DefaultButton onClick={handleSubmit(onSubmit)}>
            <p>Salvar</p>
          </DefaultButton>
        </ColumnContainer>

        {fieldsColumn?.map((column, index: number) => (
          <div key={column.id}>
            <ColumnContainer>
              <ColumnContent>
                {index !== 0 && (
                  <>
                    <TrashButton onClick={() => handleDeleteOneColumn({ id: column.id, index })}>
                      <Trash />
                    </TrashButton>
                    <PrimitivesBoard
                      typeField='SHORTTEXT'
                      label='Título da coluna'
                      register={register(`columns.${index}.title`)}
                      onBlur={handleSubmit(onSubmit)}
                    />
                  </>
                )}

                {index === 0 && <label>{column.title}</label>}
                {column.fieldValue?.map((field: any) => (
                  <PrimitivesBoard
                    key={field.fieldColumn.id}
                    typeField={field.fieldColumn.fieldType}
                    label={field.fieldColumn.name}
                    description={field.fieldColumn.description}
                    disabled={true}
                    onChange={() => {}}
                    options={field?.fieldColumn?.content?.options}
                  />
                ))}
              </ColumnContent>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  width: "100%",
                  padding: "0rem 1rem",
                  alignItems: "center",
                }}
              >
                <Link href={`/Board/Column/Edit/${column.id}`}>
                  <DefaultButton>Editar campos</DefaultButton>
                </Link>
              </div>
            </ColumnContainer>
            <ArrowOrderComponent
              index={index}
              maxLength={board?.board.column.length ?? 0}
              column={column as any}
              swap={swapColumn}
              onChange={handleSubmit(onSubmit)}
            />
          </div>
        ))}
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            height: "90%",
          }}
        >
          <ButtonAdd onClick={() => handleCreateColumn()}>
            <p>
              Adicionar
              <br />
              coluna
            </p>
            <AddCircle />
          </ButtonAdd>
        </div>
      </BoardContainer>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          alignItems: "center",
        }}
      >
        {board?.board.column.map((column) => (
          <Link href={`/Board/Column/Edit/${column.id}`} key={column.id}>
            <DefaultButton
              key={column.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                width: "100%",
                padding: "0rem 1rem",
                fontSize: ".65rem",
                fontWeight: 600,
                height: "2rem",
              }}
            >
              {column.title}
            </DefaultButton>
          </Link>
        ))}
      </div>
    </Container>
  )
}

interface ArrowOrderProps {
  index: number
  maxLength: number
  column?: Column
  swap: any
  onChange: () => void
}

const ArrowOrderComponent = ({ index, maxLength, column, swap, onChange }: ArrowOrderProps) => {
  const handleUpdateOrder = ({ id, dir }: { id?: number; dir: "left" | "right" }) => {
    if (!id) return

    if (dir === "right") {
      swap(index, index + 1)
    } else {
      swap(index, index - 1)
    }
    onChange()
  }

  return (
    <>
      {index !== 0 && (
        <ButtonsContainer>
          {index !== 1 ? (
            <button onClick={() => handleUpdateOrder({ id: column?.id, dir: "left" })}>
              <ArrowLeft />
              <p>Mover para a esquerda</p>
            </button>
          ) : (
            <span></span>
          )}
          {index !== maxLength - 1 ? (
            <button onClick={() => handleUpdateOrder({ id: column?.id, dir: "right" })}>
              <p>Mover para a direita</p>
              <ArrowRight />
            </button>
          ) : (
            <span></span>
          )}
        </ButtonsContainer>
      )}
    </>
  )
}

const tostComponent = ({ title }: { title: string }) => {
  Swal.fire({
    icon: "success",
    position: "bottom-right",
    toast: true,
    title,
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })
}
