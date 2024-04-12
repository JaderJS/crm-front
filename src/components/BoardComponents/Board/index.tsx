import { useCallback, useContext, useEffect, useMemo, useState } from "react"

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
  Sensor,
  SensorAPI,
  PreDragActions,
  SnapDragActions,
  OnDragUpdateResponder,
  DragUpdate,
} from "react-beautiful-dnd"
import {
  ColumnContainer,
  DroppableContainer,
  HeaderBottom,
  HeaderContainer,
  HeaderTitle,
  Item,
  KanbanContainer,
} from "./styles"
import { AddCircle, I3DCubeScan, Profile2User } from "iconsax-react"
import { DefaultButton } from "../../DefaultButton"
import { BoardCard } from "../BoardCard"
import Router from "next/router"
import React from "react"
import { MagicMotion } from "react-magic-motion"
import { Console } from "console"
import index2 from "../../../assets/index2.svg"
import index1 from "../../../assets/index1.svg"
import Image from "next/image"
// const urlImgIndex1 = "https://storage.googleapis.com/v4-data/V4%20Colli/MindForge/files/Rectangle%2095title1.svg "
// const urlImgIndex2 = "https://storage.googleapis.com/v4-data/V4%20Colli/MindForge/files/Rectangle%2096title2.svg"
import { Column as ColumnTypes } from "@/types"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import Swal from "sweetalert2"
import { AuthContext } from "@/contexts/AuthContext"
import { verifyRequiredFields } from "@/myHooks/Column/column"
import { toast } from "react-toastify"
import { UserContext } from "@/contexts/UserContext"

const FIND_UNIQUE_COLUMN_FOR_CARD_DRAG_IN_BOARD_COMPONENT = gql`
  query findUniqueCardDragInBoardComponent($id: Int!, $cardId: String!) {
    column(where: { id: $id }) {
      id
      linkingColumns {
        id
        title
      }
      linkedColumns {
        id
        title
      }
      board {
        column {
          id
        }
        isPublic
      }
      fieldValue {
        fieldColumnId
        fieldColumn {
          id
          name
          fieldValueId
          description
          required
        }
      }
      card(where: { id: { equals: $cardId } }) {
        id
        priority
        description
        name
        tags
        cardTags {
          tag {
            id
            title
            color
          }
        }
        fieldValue(orderBy: { createdAt: desc }) {
          id
          fieldId
          fieldType
          content
          createdBy
          createdAt
          field {
            id
            name
            required
            description
            createdBy
            updatedBy
            updatedAt
            createdAt
          }
        }
      }
    }
  }
`

const CREATE_ONE_STATUS_MOVEMENT_CARD_IN_BOARD_COMPONENT = gql`
  mutation createOneStatusMovementCardIBoardComponent($args: cardProps!) {
    sendStatusMovementCardCustom(data: $args)
  }
`

const FIND_UNIQUE_CARD_IN_BOARD_COMPONENT = gql`
  query findUniqueCardInBoardComponent($id: String!) {
    card(where: { id: $id }) {
      id
      name
      description
      tags
      priority
      column {
        title
      }
      appointment
      createdByUser {
        uuid
        avatarUrl
        name
        nickName
      }
      updatedByUser {
        uuid
        avatarUrl
        name
        nickName
      }
      column {
        id
        board {
          isPublic
        }
        fieldValue {
          fieldColumn {
            fieldType
            id
            name
            description
            required
            content
            createdBy
            createdAt
            FieldsValue(orderBy: { createdAt: desc }, take: 1) {
              id
              content
              createdBy
              createdAt
              user {
                uuid
                name
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`

const CREATE_ONE_MOVEMENT_FOR_CARD_DRAG_IN_BOARD_COMPONENT = gql`
  mutation createOneMovementForCardDragInBoardComponent($args: CardMovementUncheckedCreateInput!) {
    createOneCardMovement(data: $args) {
      id
    }
  }
`
interface Board {
  id: number
  column: Column[]
}

interface Column {
  id: number
  title: string
  order: number
  card: Card[]
}

interface cardAssignment {
  user: {
    avatarUrl: string
    nickName: string
  }
}

interface Card {
  id: string
  name: string
  description: any
  order: number
  isOpen: boolean
  tags: any
  priority: number
  appointment: string
  cardAssignment: cardAssignment[]
  data?: Card
}

interface ColumnProps {
  data: Board
  onCardMove: (moveInfo: any) => void
  refetch: () => void
}

function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  if (Array.isArray(obj)) {
    const copyArray: any[] = []
    for (let i = 0; i < obj.length; i++) {
      copyArray[i] = deepCopy(obj[i])
    }
    return copyArray as T
  }

  const copyObj: any = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copyObj[key] = deepCopy(obj[key])
    }
  }
  return copyObj as T
}

interface ColumnData {
  column: ColumnTypes
}

interface CardData {
  card: Card
}

export function BoardComponent({ data, onCardMove, refetch }: ColumnProps) {
  const { uuid } = useContext(AuthContext)
  const { userRoot } = useContext(UserContext)
  const [columns, setColumns] = useState(
    deepCopy(data.column).sort((a: { order: number }, b: { order: number }) => a.order - b.order),
  )


  
  const [allowColumns, setAllowColumns] = useState<number[] | null>(data.column.map((item) => item.id))

  const [fetchColumn] = useLazyQuery<ColumnData>(FIND_UNIQUE_COLUMN_FOR_CARD_DRAG_IN_BOARD_COMPONENT, {
    fetchPolicy: "network-only",
  })
  const [fetchCard] = useLazyQuery<CardData>(FIND_UNIQUE_CARD_IN_BOARD_COMPONENT, { fetchPolicy: "network-only" })

  const [createOneCardMovement] = useMutation(CREATE_ONE_MOVEMENT_FOR_CARD_DRAG_IN_BOARD_COMPONENT, {
    fetchPolicy: "network-only",
  })

  const [createOneStatusMovement] = useMutation(CREATE_ONE_STATUS_MOVEMENT_CARD_IN_BOARD_COMPONENT)

  useEffect(() => {
    setColumns(deepCopy(data.column).sort((a: { order: number }, b: { order: number }) => a.order - b.order))
  }, [data])

  const [cardId, setCardId] = useState<string | null>(null)
  const [toColumnId, setToColumnId] = useState<number | null>(null)
  const [fromColumnId, setFromColumnId] = useState<number | null>(null)

  const [beforeChangeCardId, setBeforeChangeCardId] = useState<Card | undefined>(undefined)

  useEffect(() => {
    if (!cardId || !beforeChangeCardId || !toColumnId || !fromColumnId || !uuid || userRoot) {
      return
    }

    const fetchCardData = async () => {
      try {
        await createOneCardMovement({
          variables: {
            args: {
              cardId,
              toColumnId,
              fromColumnId,
              updateBy: uuid,
              content: beforeChangeCardId,
            },
          },
        })
      } catch (error) {
        toast.error("Erro ao salvar movimentação do card")
        console.error("Erro ao buscar card:", error)
      } finally {
        setBeforeChangeCardId(undefined)
        setCardId(null)
        setToColumnId(null)
        setFromColumnId(null)
      }
    }

    fetchCardData()
  }, [cardId, toColumnId, fromColumnId, uuid, fetchCard, createOneCardMovement])

  const [colunaAnterior, setColunaAnterior] = useState<boolean | null>(null)
  const [originalColumnIndex, setOriginalColumnIndex] = useState<number | null>(null)
  const [pularVerificaçãoDeCamposObgt, setPularVerificaçãoDeCamposObgt] = useState<boolean>(false)

  const [movingForward, setMovingForward] = useState<boolean>(false) // Movendo para uma coluna posterior
  const [movingBackward, setMovingBackward] = useState<boolean>(false) // Movendo para uma coluna anterior

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) {
        //se o card for solto fora de uma coluna ou se ele for solto na mesma posição que estava
        setColunaAnterior(null)
        setOriginalColumnIndex(null)
        setPularVerificaçãoDeCamposObgt(false)
        setMovingForward(false)
        setMovingBackward(false)
        return
      }

      const fromColumnId = Number(result.source.droppableId)
      const toColumnId = Number(result.destination.droppableId)
      const cardId = result.draggableId

      // Verifica se o card foi movido para uma coluna diferente
      if (fromColumnId !== toColumnId) {
        setCardId(cardId)
        setToColumnId(toColumnId)
        setFromColumnId(fromColumnId)
      }

      const sourceColumnIndex = columns.findIndex((col) => col.id.toString() === result.source.droppableId)
      const destColumnIndex = result.destination
        ? columns.findIndex((col) => col.id.toString() === result.destination?.droppableId)
        : -1

      const copiedColumns = deepCopy(columns)
      const sourceColumn = copiedColumns[sourceColumnIndex]

      const destColumn = copiedColumns[destColumnIndex]

      const [movedCard] = sourceColumn.card.splice(result.source.index, 1)
      destColumn.card.splice(result.destination.index, 0, movedCard)

      sourceColumn.card.forEach((card, index) => {
        card.order = index
      })

      destColumn.card.forEach((card, index) => {
        if (card) {
          card.order = index
        }
      })
      setColumns(copiedColumns)

      const moveInfo = {
        colunaDeOrigem: Number(result.source.droppableId),
        cardId: result.draggableId,
        colunaDestino: Number(result.destination.droppableId),
        order: result.destination.index,
        destinationColumnCopy: {
          id: destColumn.id,
          card: destColumn.card.map((card) => ({
            id: card.id,
            order: card.order,
          })),
        },
      }
      onCardMove(moveInfo)
      setAllowColumns(null)
      setPularVerificaçãoDeCamposObgt(false)
      setColunaAnterior(null)
      setOriginalColumnIndex(null)
      setMovingForward(false)
      setMovingBackward(false)


      const destinationColumnName =  columns.find((col) => col.id.toString() === result?.destination?.droppableId)?.title
      console.log("destinationColumnName", destinationColumnName)
      const sourceColumnName = columns.find((col) => col.id.toString() === result?.source?.droppableId)?.title
      console.log("sourceColumnName", sourceColumnName)
      createOneStatusMovement({
        variables: { args: { id: cardId, action: "update", from: sourceColumnName, to: destinationColumnName } },
      })

      // setTimeout(() => {
      //   refetch()
      // }, 200);
      // refetch()
    },
    [columns, onCardMove],
  )

  useEffect(() => {
    if (movingForward == true) {
      setPularVerificaçãoDeCamposObgt(false)
    } else if (movingBackward == true) {
      setPularVerificaçãoDeCamposObgt(true)
    }
  }, [pularVerificaçãoDeCamposObgt, movingForward, movingBackward])

  const handleDragStart = async (event: DragStart) => {
    if (userRoot) {
      setAllowColumns(data.column.map((item) => item.id))
      return
    }
    setAllowColumns(null)
    await fetchCard({ variables: { id: event.draggableId } }).then((response) => {
      verifyRequiredFields(response.data?.card.id ?? "", Number(event.source.droppableId)).then((data) => {
        if (data.isDraggable === false) {
          const displayToasts = async () => {
            const fieldsArray = data.fields.split("\n")
            for (let i = 0; i < fieldsArray.length; i++) {
              const field = fieldsArray[i]
              setTimeout(() => {
                toast.error(`Verificar: ${field}`, {
                  autoClose: 6000,
                  position: toast.POSITION.BOTTOM_RIGHT,
                })
              }, i * 250)
            }
          }
          setAllowColumns(null)
          displayToasts()
        }
      })

      setBeforeChangeCardId(response.data?.card)
    })

    const sourceColumnIndex = columns.findIndex((col) => col.id.toString() === event.source.droppableId)
    setOriginalColumnIndex(sourceColumnIndex)

    const { data: column } = await fetchColumn({
      variables: { id: Number(event.source.droppableId), cardId: event.draggableId },
      fetchPolicy: "network-only",
    })
    const allow = column?.column.linkedColumns.map((item) => item.id).concat(column.column.id) ?? null
    setAllowColumns(() => allow)

    if (pularVerificaçãoDeCamposObgt === false) {
      const staticFields = column?.column.fieldValue
      const cardFields = column?.column.card?.[0]?.fieldValue

      const notCompleted =
        staticFields?.filter((field) => {
          const flag = cardFields?.find((cardField) => {
            if (field.fieldColumn.id === cardField.fieldId) {
              return field
            }
          })
          if (
            (flag?.content.value === null ||
              flag?.content.value === "" ||
              flag?.content.value === undefined ||
              Object.keys(flag?.content || {}).length === 0) &&
            flag?.field?.required === true
          ) {
            return flag
          }
        }) ?? []

      if (notCompleted.length > 0 || cardFields?.length == 0) {
        const flag: number[] | null = Array.from({ length: 1 }).concat(column?.column.id ?? []) as number[]

        setAllowColumns(() => flag)
      }
    }
  }

  const toggleCardOpenState = (columnId: number, cardId: string) => {
    const copiedColumns = deepCopy(columns)
    const column = copiedColumns.find((col) => col.id === columnId)

    if (column) {
      const card = column.card.find((c) => c.id === cardId)
      if (card) {
        card.isOpen = !card.isOpen
      }

      setColumns(copiedColumns)
    }
  }

  const boardId = data.id

  const handleDragUpdate = (update: DragUpdate) => {
    const currentColumnIndex = columns.findIndex((col) => col.id.toString() === update.destination?.droppableId)

    if (originalColumnIndex != null && currentColumnIndex >= 0 && originalColumnIndex > currentColumnIndex) {
      console.log("Movendo para uma coluna anterior")
      setMovingBackward(true)
    }

    if (originalColumnIndex != null && currentColumnIndex >= 0 && originalColumnIndex < currentColumnIndex) {
      console.log("Movendo para uma coluna posterior")
      setMovingForward(true)
    }
  }

  return (
    <KanbanContainer>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragUpdate={handleDragUpdate}>
        {columns.map((column, index) => (
          <div key={index}>
            {(column.title != "Formulário do card" || userRoot) && (
              <ColumnContainer key={column.id}>
                <HeaderContainer style={{ position: "relative" }}>
                  <Image
                    src={index === 0 ? index1 : index2}
                    alt='title'
                    width={300}
                    height={200}
                    quality={1}
                    priority={true}
                    style={{
                      position: "absolute",
                      zIndex: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: userRoot && column.title === "Formulário do card" ? "contrast(0.15)" : "",
                    }}
                  />
                  <HeaderTitle>{column.title}</HeaderTitle>
                  <HeaderBottom>
                    <Item title='Cards com responsáveis / Total de cards'>
                      <Profile2User variant='Outline' />
                      <span>
                        {column.card?.[0]?.cardAssignment.length} / {column.card.length}
                      </span>
                    </Item>
                    <Item title='Cards com prioridade alta / Total de cards'>
                      <I3DCubeScan variant='Outline' />
                      <span>
                        {column.card.filter((item) => item.priority === 1).length} / {column.card.length}
                      </span>
                    </Item>
                    <Item
                      title={
                        "Cards com alta prioridade: " +
                        column.card
                          .filter((item) => item.priority === 1)
                          .map((item) => item.name)
                          .join(", ")
                      }
                    >
                      <I3DCubeScan variant='Outline' />
                      <span>{column.card.filter((item) => item.priority === 1).length}</span>
                    </Item>
                    {index === 1 ? (
                      <Item>
                        {/* <DefaultButton
                          style={{
                            minWidth: "5.375rem",
                            height: "1.25rem",
                            fontSize: "0.75rem",
                            padding: "0.38rem",
                            gap: "0.3rem",
                          }}
                          svgSize={"small"}
                          backgroundColor={"white"}
                          color={"black"}
                          hover={"NeonRedShadowEffect"}
                          onClick={() => {
                            Router.push(`/Board/NewCard/${boardId}`)
                          }}
                        >
                          Add Card <AddCircle color='#DC2424' variant='Outline' />
                        </DefaultButton> */}
                      </Item>
                    ) : (
                      <Item></Item>
                    )}
                  </HeaderBottom>
                </HeaderContainer>

                <Droppable
                  droppableId={column.id.toString()}
                  key={column.id}
                  isDropDisabled={!allowColumns?.includes(column.id)}
                >
                  {(provided) => (
                    <DroppableContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        backgroundColor: `${!allowColumns?.includes(column.id) ? "" : "rgba(217, 217, 217, 0.5)"}`,
                        border: userRoot && index === 0 ? "2px solid #DC2424" : "",
                      }}
                      onMouseUp={() => {
                        setAllowColumns(null)
                      }}
                    >
                      {column.card.map((item, index) => (
                        <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            >
                              <BoardCard
                                id={item.id}
                                name={item.name}
                                isOpen={item.isOpen ?? false}
                                draggableId={item.id.toString()}
                                tags={item.tags}
                                priority={item.priority}
                                appointment={item.appointment}
                                cardAssignment={item.cardAssignment}
                                description={item.description}
                                data={item as any}
                                onOpen={(id) => {
                                  console.log("id", id)
                                }}
                                refetch={refetch}
                                style={{
                                  backgroundColor: snapshot.isDragging ? "rgba(255,255,255,0.6)" : "",
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </DroppableContainer>
                  )}
                </Droppable>
              </ColumnContainer>
            )}
          </div>
        ))}
      </DragDropContext>
    </KanbanContainer>
  )
}
