import { Board, Card, User, Column } from "@/types"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { GetServerSideProps } from "next"
import { ColumnContainer, ColumnContent, Container } from "./styles"
import { useContext, useEffect, useState, Dispatch } from "react"
import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"
import Skeleton from "react-loading-skeleton"
import { z } from "zod"
import { FormText } from "@/components/InputFormComponents/Text"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserContext } from "@/contexts/UserContext"
import Router, { useRouter } from "next/router"
import { DefaultButton } from "@/components/DefaultButton"
import { FieldComponent } from "./fieldComponent"
import Swal from "sweetalert2"
import FormSelect from "@/components/InputFormComponents/Select"
import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { verifyRequiredFields } from "@/myHooks/Column/column"
import { toast } from "react-toastify"

const FIND_UNIQUE_CARD_IN_NEW_CARD = gql`
  query findUniqueCardInNewCard($cardId: String!) {
    card(where: { id: $cardId }) {
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
        fieldValue(orderBy: { fieldColumn: { order: asc } }) {
          fieldColumn {
            fieldType
            id
            name
            description
            required
            content
            createdAt
            updatedAt
            createdBy
            updatedBy
            FieldsValue(where: { cardId: { equals: $cardId } }, orderBy: { createdAt: desc }, take: 1) {
              id
              content
              createdAt
              createdBy
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

const CREATE_ONE_STATUS_MOVEMENT_CARD_IN_NEW_CARD = gql`
  mutation createOneStatusMovementCardInNewCard($args: cardProps!) {
    sendStatusMovementCardCustom(data: $args)
  }
`

const FIND_UNIQUE_COLUMN_IN_NEW_CARD = gql`
  query findUniqueCardMovementInNewCard($columnId: Int!, $cardId: String!) {
    column(where: { id: $columnId }) {
      id
      title
      order
      board {
        id
        authorizedCustom {
          isAuth
        }
      }
      fieldValue(orderBy: { fieldColumn: { order: asc } }) {
        fieldColumn {
          id
          name
          description
          required
          content
          fieldType
          FieldsValue(where: { cardId: { equals: $cardId } }, orderBy: { createdAt: desc }, take: 1) {
            id
            content
            fieldType
          }
        }
      }
    }
  }
`

const FIND_UNIQUE_BOARD_IN_NEW_CARD = gql`
  query findUniqueBoarInNewCard($id: String!) {
    board(where: { id: $id }) {
      id
      title
      content
      authorizedCustom {
        isAuth
      }
      column(orderBy: { order: asc }) {
        id
        title
        fieldValue(orderBy: { fieldColumn: { order: asc } }) {
          fieldColumn {
            id
            fieldType
            name
            content
            description
            required
            FieldsValue {
              content
            }
          }
        }
      }
    }
  }
`

const CREATE_ONE_CARD_IN_NEW_CARD = gql`
  mutation createOneCardInNewCard($args: CardUncheckedCreateInput!) {
    createOneCard(data: $args) {
      id
      column {
        id
      }
    }
  }
`

const CREATE_ONE_MOVEMENT_FOR_CARD_DRAG_IN_NEW_CARD = gql`
  mutation createOneMovementForCardDragInNewCard($args: CardMovementUncheckedCreateInput!) {
    createOneCardMovement(data: $args) {
      id
    }
  }
`

const UPDATE_ONE_CARD_IN_CARD_IN_NEW_CARD = gql`
  mutation updateOneCardInCardInNewCard($args: CardUncheckedUpdateInput!, $id: String!) {
    updateOneCard(data: $args, where: { id: $id }) {
      id
    }
  }
`
const CREATE_MANY_CARD_ASSIGNMENT = gql`
  mutation createCardAssignment($args: [CardAssignmentCreateManyInput!]!) {
    createManyCardAssignment(data: $args) {
      count
    }
  }
`

interface CardData {
  card: Card
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  return {
    props: {
      params,
    },
  }
}

const DELETE_ONE_CARD_IN_NEW_CARD = gql`
  mutation deleteOneCardInNewCard($id: String!) {
    deleteOneCard(where: { id: $id }) {
      id
    }
  }
`

const createCardSchema = z.object({
  title: z.string().min(1, { message: "Forneça um titulo para o card" }),
  priority: z.number().min(0, { message: "Forneça uma prioridade para o card" }).optional().nullable(),
  cardAssignments: z.array(z.string()).optional().nullable(),
})

type CreateCardType = z.infer<typeof createCardSchema>

interface BoardData {
  board: Board
}
interface CardData {
  card: Card
}
interface ColumnData {
  column: Column
}

interface ColumnData_ {
  column: Column
}

export default function NewCard({ params }: { params: { id: string } }) {
  const router = useRouter()

  const { uuid } = useContext(UserContext)

  const [actualColumnName, setActualColumnName] = useState<string | undefined>(undefined)
  const [actualBoardName, setActualBoardName] = useState<string | undefined>(undefined)
  const [actualBoardId, setActualBoardId] = useState<string | undefined>(undefined)

  const [card, setCard] = useState<Card | undefined>(undefined)

  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateCardType>({ mode: "onBlur", resolver: zodResolver(createCardSchema) })

  const [fetchCard] = useLazyQuery<CardData>(FIND_UNIQUE_CARD_IN_NEW_CARD, { fetchPolicy: "network-only" })
  const [createOneStatusMovement] = useMutation(CREATE_ONE_STATUS_MOVEMENT_CARD_IN_NEW_CARD)
  const [createOneCardMovement] = useMutation(CREATE_ONE_MOVEMENT_FOR_CARD_DRAG_IN_NEW_CARD, {
    fetchPolicy: "network-only",
  })
  const [deleteOneCard] = useMutation(DELETE_ONE_CARD_IN_NEW_CARD)
  const [createManyCardsAssignment] = useMutation(CREATE_MANY_CARD_ASSIGNMENT)

  const {
    data: board,
    loading: loadingBoard,
    refetch,
  } = useQuery<BoardData>(FIND_UNIQUE_BOARD_IN_NEW_CARD, {
    variables: { id: params.id },
    skip: params.id === undefined,
    onCompleted: () => {
      setActualBoardName(board?.board.title)
      setActualBoardId(board?.board.id)
      setActualColumnName(board?.board.column?.[0]?.title)
    },
    fetchPolicy: "network-only",
  })

  const {
    data: column,
    refetch: refetchFields,
    loading: loadingColumn,
  } = useQuery<ColumnData_>(FIND_UNIQUE_COLUMN_IN_NEW_CARD, {
    variables: {
      cardId: card?.id,
      columnId: card?.column.id,
    },
    skip: card === undefined,
    fetchPolicy: "network-only",
    refetchWritePolicy: "merge",
  })

  const fields = column?.column.fieldValue.map((field) => field.fieldColumn)

  const [createCard] = useMutation(CREATE_ONE_CARD_IN_NEW_CARD, { onCompleted: (res) => setCard(res.createOneCard) })
  const [enableAlert, setEnableAlert] = useState(true)

  const onSubmit = (data: CreateCardType) => {
    Swal.fire({
      title: "Você tem certeza que deseja criar um ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7841B0",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const secondColumnId = board?.board?.column?.[0]?.id
        createCard({
          variables: {
            args: {
              name: data.title,
              description: data.title,
              order: 0,
              columnId: secondColumnId,
              priority: data.priority ?? 0,
              createdBy: uuid,
              updatedBy: uuid,
            },
          },
        }).then((response) => {
          setCard(response.data.createOneCard)
          if (data.cardAssignments && data.cardAssignments.length > 0) {
            const assignmentsCards = data.cardAssignments?.map((assignment: string) => ({
              userUuid: assignment,
              CardId: response.data.createOneCard.id,
            }))
            createManyCardsAssignment({
              variables: {
                args: assignmentsCards,
              },
            })
          }
        })

        Swal.fire("Ticket criado agora você pode preencher os campos!")
      }
    })
  }

  const [updateOneCard] = useMutation(UPDATE_ONE_CARD_IN_CARD_IN_NEW_CARD)
  const [disabledButton, setDisabledButton] = useState(false)

  const movementCard = async ({ cardId, to, from }: { cardId?: string; to?: number; from?: number }) => {
    setDisabledButton(true)
    try {
      const response = await fetchCard({ variables: { cardId: cardId } })
      console.log(response)
      if (!response.data?.card) return console.error("Erro ao buscar card:", response)

      await createOneCardMovement({
        variables: {
          args: {
            cardId,
            toColumnId: to,
            fromColumnId: from,
            updateBy: uuid,
            content: response.data?.card,
          },
        },
      })
        .then(() => {
          updateOneCard({
            variables: {
              id: cardId,
              args: {
                columnId: {
                  set: to,
                },
              },
            },
          })
        })
        .catch((error) => {
          console.error("Erro ao criar movimentação:", error)
          setDisabledButton(false)
        })
    } catch (error) {
      console.error("Erro ao buscar card:", error)
      setDisabledButton(false)
    }
  }

  const handlePriority = (event: any) => {
    const { label, value } = event
    if (label === "Alta") {
      setValue("priority", 1)
    } else if (label === "Media") {
      setValue("priority", 0.5)
    } else if (label === "Baixa") {
      setValue("priority", 0)
    }
  }

  const handleBrowseAway = () => {
    if (enableAlert === false) {
      return
    }
    if (enableAlert === true) {
      if (window.confirm("Você tem certeza que deseja sair? Mudanças não salvas serão perdidas.")) {
        card && deleteOneCard({ variables: { id: card?.id } })
        router.events.emit("routeChangeComplete")
      } else {
        router.events.emit("routeChangeError")
        throw "routeChange aborted."
      }
    }
  }

  useEffect(() => {
    if (enableAlert === false) {
      return
    }
    router.events.on("routeChangeStart", handleBrowseAway)

    return () => {
      if (!enableAlert) {
        return
      }
      router.events.off("routeChangeStart", handleBrowseAway)
    }
  }, [enableAlert])

  async function verifyRequiredFieldsTest(cardId?: string, columnId?: number, column?: Column, card?: Card) {
    if (!cardId || !columnId || !column || !card) {
      return
    }
    setDisabledButton(true)
    await refetchFields()
    const verify = await verifyRequiredFields(cardId, columnId)

    if (!verify.isDraggable) {
      const fieldsEmpty = verify.fields.split("\n")
      for (let i = 0; i < fieldsEmpty.length; i++) {
        setTimeout(() => {
          toast.error(`Campo obrigatório não preenchido: ${fieldsEmpty[i]}`, {
            autoClose: 5000,
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        }, i * 550)
      }
      setDisabledButton(false)
      return
    }

    setEnableAlert(false)
    await movementCard({
      cardId: card?.id,
      to: board?.board.column?.[1]?.id,
      from: board?.board.column?.[0]?.id,
    })
      .then(() => {
        createOneStatusMovement({ variables: { args: { id: actualCardId, action: "create", from: "", to: "" } } }).then(
          () => {
            router.back()
          },
        )
      })
      .catch((error) => {
        console.error("Erro ao criar movimentação:", error)
        setDisabledButton(false)
      })
  }

  const actualCardId = card?.id
  const actualColumnId = card?.column?.id
  const actualColumn = column?.column
  const actualCard = card

  return (
    <Container>
      {actualBoardId && actualBoardName && actualColumnName && (
        <MenuHistoryPaths
          items={[
            { path: `/Board/${actualBoardId}`, name: `${actualBoardName}` },
            { path: `/Board/Card/${params.id}`, name: `${actualColumnName}` },
          ]}
          loading={loadingBoard}
        />
      )}

      <div
        id='Content'
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "1.8rem 1.8rem",
          paddingBottom: "10rem",
          gap: "2rem",
          borderRadius: "1rem",
          backgroundColor: "#F8F8F8",
          overflowY: "auto",
        }}
      >
        {/* {loadingBoard && (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "100%" }}>
              <Skeleton
                duration={1}
                highlightColor='#D9D9D9'
                circle={true}
                style={{
                  minWidth: "8rem",
                  height: "8rem",
                }}
              />
            </div>

            {Array.from({ length: 14 }).map((_, index) => (
              <Skeleton
                key={index}
                duration={1}
                style={{
                  width: "100%",
                  height: "2.4rem",
                  marginBottom: "0.625rem",
                }}
                highlightColor='#D9D9D9'
                borderRadius={10}
              />
            ))}
          </div>
        )} */}

        <FormText
          label='Titulo'
          description='Forneça um titulo para o card *'
          register={register("title")}
          error={errors.title}
        />
        <PrimitivesBoard
          typeField={"SELECT"}
          label='Prioridade'
          description='Forneça uma prioridade para o card *'
          options={[
            { value: "LOW", label: "Baixa" },
            { value: "MEDIUM", label: "Media" },
            { value: "HIGH", label: "Alta" },
          ]}
          name='priority'
          onChange={(event: any) => handlePriority(event)}
        />
        {errors.priority && <span style={{ color: "#F00" }}>{errors.priority.message}</span>}
        <div>
          <PrimitivesBoard
            typeField='INVEST'
            label='Se você deseja atribuir o ticket a um ou mais usuários'
            isMulti={true}
            description='Selecione um ou mais usuários'
            onChange={(event: any) => setValue("cardAssignments", event)}
            placeholder='Selecione a categoria'
          />
          <span style={{ color: "#F00", fontSize: ".75rem" }}>
            <b>
              ATENÇÃO,Todos os usuários que forem atribuídos ao ticket receberão um e-mail e uma notificação no WhatsApp
            </b>
          </span>
        </div>

        {!card && (
          <DefaultButton type='button' onClick={handleSubmit(onSubmit)}>
            Cria ticket e solicitar campos
          </DefaultButton>
        )}

        {card &&
          fields?.map((field) => (
            <div key={field.id}>
              <FieldComponent
                field={field}
                card={card}
                uuid={uuid}
                disabled={!card}
                loading={loadingColumn}
                refetch={refetchFields}
              />
            </div>
          ))}

        {card && (
          <DefaultButton
            type='button'
            style={{ minHeight: "2rem" }}
            onClick={async () => {
              await verifyRequiredFieldsTest(actualCardId, actualColumnId, actualColumn, actualCard)
            }}
            disabled={disabledButton}
          >
            Enviar
          </DefaultButton>
        )}
      </div>
    </Container>
  )
}
