import { GetServerSideProps } from "next"
import {
  ColumnCard,
  ColumnContainer,
  ColumnContent,
  ColumnRow,
  Container,
  DestinationContainer,
  FieldsContainer,
  ItemContainer,
  RowColumn,
} from "./styles"
import { gql, useMutation, useQuery } from "@apollo/client"
import { PrimitiveFields, Column, FieldColumn, Board, Field } from "@/types"
import { useCallback, useContext, useEffect, useState } from "react"
import { PopUpShortText } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpShortText"
import { UserContext } from "@/contexts/UserContext"
import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { PopUpLongText } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpLongText"
import { PopUpDate } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpDate"
import { DragDropContext, Droppable, Draggable, DropResult, OnDragStartResponder } from "react-beautiful-dnd"
import { ArrowRight, Trash } from "iconsax-react"
import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"
import { useRouter } from "next/router"
import { PopUpConnectionBoard } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpConnectionBoard"
import { PopUpCity } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpCity"
import { PopUpRadioButton } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpRadioButton"
import { PopUpMoney } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpMoney"
import { ChoicePopUpComponent } from "./choicePopUp"
import { PoPupAppointment } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpAppointment"
import { PopUpClient } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpClient"
import { PopUpAttachment } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpAttachment"
import { PopUpTel } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpTel"
import { PopUpImage } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpImage"
import { PopUpDocs } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpDocs"
import { PopUpNumber } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpNumber"
import { PopUpLink } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpLink"
import { PopUpInvest } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpInvest"
import { PopUpCep } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpCep"
import { PopUpEmail } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpEmail"
import { PopUpState } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpState"
import { PopUpCheckbox } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpCheckbox"
import { PopUpHour } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpHour"
import Swal from "sweetalert2"
import { PopUpProjects } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpProjects"
const UPDATE_ONE_COLUMN_IN_EDIT_COLUMN = gql`
  mutation updateOneColumnInEditColumn($id: Int!, $args: ColumnUncheckedUpdateManyWithoutLinkingColumnsNestedInput!) {
    updateOneColumn(data: { linkedColumns: $args }, where: { id: $id }) {
      id
    }
  }
`

const FIND_MANY_COLUMNS_IN_EDIT_COLUMN = gql`
  query findManyPrimitiveFields($id: Int!) {
    column(where: { id: $id }) {
      id
      linkingColumns {
        title
        id
      }
      linkedColumns {
        title
        id
      }
      board {
        column(orderBy: { order: asc }) {
          linkingColumns {
            id
          }
          linkedColumns {
            id
          }
          id
          order
          title
        }
      }
    }
  }
`

const FIND_UNIQUE_COLUMN_IN_EDIT_COLUMN = gql`
  query findUniqueColumnInEditColumn($id: Int!) {
    column(where: { id: $id }) {
      id
      board {
        content
        id
        column(orderBy: { order: asc }, take: 1) {
          id
        }
      }
      fieldValue(orderBy: { fieldColumn: { order: asc } }) {
        column {
          id
          title
        }
        columnId
        fieldColumnId
        fieldColumn {
          id
          fieldType
          name
          description
          required
          order
          content
          primitive {
            content
          }
        }
      }
    }
  }
`

const UPDATE_ONE_FIELD_IN_EDIT_COLUMN = gql`
  mutation updateOneFiledInEditColumn($id: Int!, $args: FieldUncheckedUpdateInput!) {
    updateOneField(data: $args, where: { id: $id }) {
      id
      order
      name
    }
  }
`

const DELETE_ONE_FIELD_IN_EDIT_COLUMN = gql`
  mutation deleteOneFieldInEditColumn($args: FieldColumnColumnIdFieldColumnIdCompoundUniqueInput!) {
    deleteOneFieldColumn(where: { columnId_fieldColumnId: $args }) {
      columnId
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  return {
    props: {
      params,
    },
  }
}

interface ColumnData {
  column: Column
}

export default function EditColumn({ params }: { params: { id: string } }) {
  const { uuid } = useContext(UserContext)

  const { data: columns,loading } = useQuery<ColumnData>(FIND_MANY_COLUMNS_IN_EDIT_COLUMN, {
    variables: { id: Number(params.id) },
    skip: params.id === undefined,
    fetchPolicy: "network-only",

  })

  const { data: column, refetch } = useQuery<ColumnData>(FIND_UNIQUE_COLUMN_IN_EDIT_COLUMN, {
    variables: { id: Number(params.id) },
    skip: params.id === undefined,
    fetchPolicy: "network-only",
  })

  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }

  return (
    <div>
      <MenuHistoryPaths
        items={[
          { path: "/Boards", name: "Boards" },
          { onClick: handleBackClick, name: "Editar Board" },
          { path: `/board/${params.id}/edit`, name: "Editar coluna" },
        ]}
        loading={loading}
      />
      <Container>
        <h2>
          {column?.column?.fieldValue[0]?.column?.title
            ? `Você esta editando a coluna : ${column?.column?.fieldValue[0]?.column?.title}`
            : "Edite sua coluna"}
        </h2>
        <RowColumn>
          <FieldsContainer>
            <h3>Escolha os campos que você deseja adicionar na sua coluna</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                alignItems: "center",
                overflowY: "auto",
                gap: "1.25rem",
              }}
            >
              <PopUpShortText columnId={Number(params.id)} typeField='SHORTEXT' uuid={uuid} refetch={() => refetch()} />
              <PopUpLongText columnId={Number(params.id)} typeField='LONGTEXT' uuid={uuid} refetch={() => refetch()} />
              <PopUpDate columnId={Number(params.id)} typeField='DATE' uuid={uuid} refetch={() => refetch()} />
              <PopUpConnectionBoard
                columnId={Number(params.id)}
                typeField='CONNECTIONBOARD'
                uuid={uuid}
                refetch={() => refetch()}
              />
              <PopUpCity columnId={Number(params.id)} typeField='CITY' uuid={uuid} refetch={() => refetch()} />
              <PopUpRadioButton
                columnId={Number(params.id)}
                typeField='RADIOBUTTON'
                uuid={uuid}
                refetch={() => refetch()}
              />
              <PopUpMoney columnId={Number(params.id)} typeField='MONEY' uuid={uuid} refetch={() => refetch()} />
              <PoPupAppointment columnId={Number(params.id)} refetch={() => refetch()} />
              <PopUpClient columnId={Number(params.id)} refetch={() => refetch()} />
              <PopUpAttachment columnId={Number(params.id)} refetch={() => refetch()} />
              <PopUpImage columnId={Number(params.id)} refetch={() => refetch()} />
              <PopUpNumber columnId={Number(params.id)} refetch={() => refetch()} />
              <PopUpLink columnId={Number(params.id)} refetch={() => refetch()} />
              <PopUpInvest columnId={Number(params.id)} refetch={() => refetch()} />
              <PopUpTel columnId={Number(params.id)} typeField='TEL' uuid={uuid} refetch={() => refetch()} />
              <PopUpDocs columnId={Number(params.id)} typeField='DOCS' uuid={uuid} refetch={() => refetch()} />
              <PopUpCep columnId={Number(params.id)} typeField='CEP' uuid={uuid} refetch={() => refetch()} />
              <PopUpEmail columnId={Number(params.id)} typeField='EMAIL' uuid={uuid} refetch={() => refetch()} />
              <PopUpState columnId={Number(params.id)} typeField='ESTADO' uuid={uuid} refetch={() => refetch()} />
              <PopUpCheckbox columnId={Number(params.id)} typeField='CHECKBOX' uuid={uuid} refetch={() => refetch()} />
              <PopUpHour columnId={Number(params.id)} typeField='HOUR' uuid={uuid} refetch={() => refetch()} />
              <PopUpProjects columnId={Number(params.id)} typeField='PROJECTS' uuid={uuid} refetch={() => refetch()} />
            </div>
          </FieldsContainer>

          <ArrowRight
            color='#7841B0'
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
          <ColumnContainer>
            <FieldsDragComponent column={column?.column} refetch={refetch} uuid={uuid} />
          </ColumnContainer>
          <ArrowRight
            color='#7841B0'
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />

          <DestinationComponent columns={columns?.column?.board?.column} columnId={Number(params.id)} />
        </RowColumn>
      </Container>
    </div>
  )
}

const FixedFieldsInNewCardComponent = ({ column }: { column?: Column }) => {
  const findFirst = column?.id === column?.board.column?.[0]?.id

  return (
    <>
      {findFirst && (
        <>
          <ItemContainer>
            <PrimitivesBoard
              typeField={"SHORTTEXT"}
              label='Título'
              description='Título referente a criação do card'
              defaultValue={"New card"}
              disabled={true}
            />
          </ItemContainer>
        </>
      )}
    </>
  )
}

const FieldsDragComponent = ({ column, refetch, uuid }: { column?: Column; refetch: Function; uuid?: string }) => {
  const [fieldColumns, setFieldColumns] = useState<FieldColumn[]>([])

  const [updateOneField] = useMutation(UPDATE_ONE_FIELD_IN_EDIT_COLUMN)
  const [deleteOneField] = useMutation(DELETE_ONE_FIELD_IN_EDIT_COLUMN, { onCompleted: () => refetch() })

  useEffect(() => {
    if (column?.fieldValue) {
      setFieldColumns(column?.fieldValue)
    }
  }, [column])

  const orderUpdateFields = useCallback(
    async (fieldColumns: FieldColumn[]) => {
      const updates = fieldColumns.map((field, index) => {
        return updateOneField({
          variables: { id: field.fieldColumn.id, args: { order: { set: index } } },
        })
      })
      await Promise.all(updates)
      refetch()
    },
    [fieldColumns],
  )

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !result.draggableId) {
      return
    }

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (sourceIndex === destinationIndex) {
      return
    }

    // const fieldId = Number(result.draggableId)

    // const currentFieldColumns = Array.from(fieldColumns)

    const items = Array.from(fieldColumns)
    const [reorderedItem] = items.splice(sourceIndex, 1)
    items.splice(destinationIndex, 0, reorderedItem)

    setFieldColumns(items)

    orderUpdateFields(items)

    // updateOneField({
    //   variables: { id: fieldId, args: { order: { set: destinationIndex } } },
    //   onCompleted: () => {
    //     refetch()
    //   },
    //   onError: (error) => {
    //     setFieldColumns(currentFieldColumns)
    //   },
    // })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='fieldColumnDroppable'>
        {(provided) => (
          <ColumnContent {...provided.droppableProps} ref={provided.innerRef}>
            <FixedFieldsInNewCardComponent column={column} />

            {fieldColumns.map((fieldColumn, index) => (
              <Draggable
                key={fieldColumn.fieldColumn.id}
                draggableId={fieldColumn.fieldColumn.id.toString()}
                index={index}
              >
                {(provided) => (
                  <ItemContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <ChoicePopUpComponent
                      typeField={fieldColumn.fieldColumn.fieldType}
                      uuid={uuid}
                      columnId={fieldColumn.columnId}
                      field={fieldColumn.fieldColumn}
                      refetch={() => refetch()}
                    />

                    <PrimitivesBoard
                      typeField={fieldColumn.fieldColumn.fieldType}
                      label={fieldColumn.fieldColumn.name}
                      description={fieldColumn.fieldColumn.description}
                      defaultValue={""}
                      options={fieldColumn.fieldColumn.content?.options}
                      disabled={true}
                    />
                    <Trash
                      onClick={() =>
                        Swal.fire({
                          title: "Você tem certeza que deseja excluir esse campo ?",
                          showCancelButton: true,
                          confirmButtonText: "Sim",
                          cancelButtonText: "Não",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteOneField({
                              variables: {
                                args: { columnId: fieldColumn.columnId, fieldColumnId: fieldColumn.fieldColumnId },
                              },
                            })
                          }
                        })
                      }
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        cursor: "pointer",
                        width: "1rem",
                        height: "1rem",
                        color: "red",
                      }}
                    />
                  </ItemContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ColumnContent>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const DestinationComponent = ({ columns, columnId }: { columns?: Column[]; columnId: number }) => {
  const [updateOneColumn] = useMutation(UPDATE_ONE_COLUMN_IN_EDIT_COLUMN)

  const handleSwitch = ({ column, defaultValue }: { column: Column; defaultValue?: boolean }) => {
    if (defaultValue) {
      updateOneColumn({ variables: { id: columnId, args: { disconnect: { id: column.id } } } })
      return
    }
    updateOneColumn({ variables: { id: columnId, args: { connect: { id: column.id } } } })
  }

  const statusColumn = ({ id, index }: { id: number; index: number }) => {
    if (id === columnId) {
      return "actual"
    } else if (columns?.length === index + 1) {
      return "last"
    }
    return "before"
  }

  return (
    <DestinationContainer
      style={{
        overflowY: "auto",
      }}
    >
      <h3>Para onde os cards podem ir ?</h3>
      {columns?.map((column, index) => (
        <div style={{ width: "100%" }} key={column.id}>
          <ColumnRow>
            {column.id !== columnId && index !== 0 && (
              <PrimitivesBoard
                typeField={"SWITCH"}
                defaultValue={!!column.linkingColumns?.find((item) => item.id === columnId)}
                onChange={() =>
                  handleSwitch({
                    column: column,
                    defaultValue: !!column.linkingColumns?.find((item) => item.id === columnId),
                  })
                }
              />
            )}
            <ColumnCard position={statusColumn({ id: column.id, index })}>
              <h4>{column.title}</h4>
            </ColumnCard>
          </ColumnRow>
        </div>
      ))}
    </DestinationContainer>
  )
}
