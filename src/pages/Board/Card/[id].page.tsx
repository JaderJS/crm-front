import { GetServerSideProps } from "next/types"
import {
  Container,
  ColumnContainer,
  ColumnContent,
  ColumnCard,
  ChooseColumns,
  ChatContainer,
  UserInfosContainer,
  UserMessageContainer,
  InputContainer,
} from "./styles"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/contexts/UserContext"
import { ApolloError, BaseMutationOptions, gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import {
  Card,
  Column,
  Field,
  FieldColumn,
  User,
  FieldsValueUncheckedCreateInput,
  FieldsValue,
  CardCommentUncheckedCreateInput,
} from "@/types"
import Image from "next/image"
import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { DefaultButton } from "@/components/DefaultButton"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { HistoryComponent } from "./history"
import Swal from "sweetalert2"

import { ArrowLeft, ArrowRight, DocumentDownload, Trash } from "iconsax-react"
import { Column as ColumnTypes } from "@/types"
import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"
import { keyframes, styled } from "@/styles"
import Router from "next/router"
import * as Tag from "../../../components/BoardComponents/BoardCard/tagComponent"
import { PrimitivesAppointment } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveAppointment"
import { PrimitivesClients } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveClient"
import {
  PrimitiveAttachment,
  PrimitiveAttachmentAction,
} from "@/components/BoardComponents/primitivesBoard/components/PrimitiveAttachment"
import { SearchAssets, api } from "@/lib/axios"
import { PrimitiveImage } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveImage"
import { PrimitiveImageAction } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveImage"
import { PrimitiveNumber } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveNumber"
import {
  PrimitiveLink,
  PrimitiveLinkAnchor,
} from "@/components/BoardComponents/primitivesBoard/components/PrimitiveLink"
import Head from "next/head"
import { Utils } from "@/utils/utils"
import { toast, ToastContainer } from "react-toastify"
import { verifyRequiredFields } from "@/myHooks/Column/column"
import { PrimitiveLongText } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesBigText"
import { PrimitiveRadioButton } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesRadioBoard"
import { PrimitivesInvesters } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesInvesters"

const utils = new Utils()

const CREATE_ONE_STATUS_MOVEMENT_CARD_IN_CARD = gql`
mutation createOneStatusMovementCardInCard($args:cardProps!){
  sendStatusMovementCardCustom(data: $args)
}
`


const FIND_UNIQUE_COLUMN_IN_CARD_FOCUS = gql`
  query findUniqueBoardInCardFocus($columnId: Int!, $cardId: String!) {
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

const FIND_UNIQUE_CARD_IN_CARD_FOCUS = gql`
  query findUniqueCardInCardFocus($id: String!) {
    card(where: { id: $id }) {
      id
      name
      cardAssignment {
        id
        user {
          uuid
          nickName
          avatarUrl
        }
      }
      moviment(orderBy: { createdAt: asc }, take: 25) {
        id
        user {
          uuid
          avatarUrl
          name
          
        }
        content
        createdAt
        toColumn {
          id
          title

        }
        fromColumn {
          id
          title
        }
      }
      createdByUser {
        uuid
        name
        avatarUrl
        # userJobFunction {
        #   jobFunction {
        #     name
        #   }
        # }
      }
      updatedByUser {
        uuid
        name
        avatarUrl
        # userJobFunction {
        #   jobFunction {
        #     name
        #   }
        # }
      }
      column {
        id
        title
        board {
          id
          title
        }
        board {
          id
          isPublic
        }
      }
      cardComment {
        id
        comment
        createdAt
        user {
          uuid
          nickName
          avatarUrl
        }
      }
    }
  }
`

const FIND_MANY_COLUMNS_IN_CARD_FOCUS = gql`
  query findManyColumnsInCardFocus($id: String!) {
    columns(where: { boardId: { equals: $id } }, orderBy: { order: asc }) {
      id
      title
      linkingColumns {
        id
        title
      }
      linkedColumns {
        id
        title
      }
    }
  }
`

const FIND_MANY_CARDS_WITH_BOARD_IN_CARD_FOCUS = gql`
  query findManyCardsWithBoardInCardFocus($id: String!) {
    cards(where: { column: { is: { boardId: { equals: $id } } } }) {
      id
      appointment
      name
      createdBy
      updatedBy
      order
      priority
      description
      tags
      cardTags {
        tag {
          id
          title
          color
        }
      }
      cardAssignment {
        id
        user {
          uuid
          avatarUrl
          name
          nickName
        }
      }
      column {
        id
        title
      }
    }
  }
`

const CREATE_ONE_FIELD_VALUE_IN_CARD_FOCUS = gql`
  mutation createOneFieldValueInCardFocus($args: FieldsValueUncheckedCreateInput!) {
    createOneFieldsValue(data: $args) {
      id
      content
    }
  }
`

const UPDATE_ONE_CARD_IN_CARD_FOCUS = gql`
  mutation updateOneCardInCardFocus($id: String!, $args: CardUncheckedUpdateInput!) {
    updateOneCard(data: $args, where: { id: $id }) {
      id
    }
  }
`

const CREATE_ONE_COMMENT_IN_CARD_FOCUS = gql`
  mutation createOneCommentInCardFocus($args: CardCommentUncheckedCreateInput!) {
    createOneCardComment(data: $args) {
      id
    }
  }
`

const CREATE_ONE_MOVEMENT_FOR_CARD_DRAG_IN_CARD_FOCUS = gql`
  mutation createOneMovementForCardDragInCardFocus($args: CardMovementUncheckedCreateInput!) {
    createOneCardMovement(data: $args) {
      id
    }
  }
`

const DELETE_ONE_CARD_IN_CARD = gql`
  mutation deleteOneCardInCard($id: String!) {
    deleteOneCard(where: { id: $id }) {
      id
    }
  }
`

const DELETE_ONE_COMMENT_IN_CARD = gql`
  mutation deleteOneCommentInCard($id: Int!) {
    deleteOneCommentProject(where: { id: $id }) {
      id
    }
  }
`
const FIND_UNIQUE_CARD_IN_CARD_COMPONENT_CREATE_MOVEMENT = gql`
  query findUniqueCardInBoardComponentCreateMovement($id: String!) {
    card(where: { id: $id }) {
      id
      name
      description
      tags
      priority
      column {
        title
        order
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
        order
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
            FieldsValue(where: { cardId: { equals: $id } }, orderBy: { createdAt: desc }, take: 1) {
              id
              content
            }
          }
        }
      }
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

interface ColumnsData {
  columns: Column[]
}
interface CardData {
  card: Card
}

export default function Card_({ params }: { params: { id: string } }) {
  const { uuid, userAllowed } = useContext(UserContext)

  const [choice, setChoice] = useState<"history" | "comments">("history")

  const {
    data: card,
    refetch: refetchCard,
    loading: loadingCard,
  } = useQuery<CardData>(FIND_UNIQUE_CARD_IN_CARD_FOCUS, {
    variables: { id: params.id },
    skip: params.id == undefined,
    fetchPolicy: "cache-and-network",
    refetchWritePolicy: "merge",
  })

  const { data: columns } = useQuery<ColumnsData>(FIND_MANY_COLUMNS_IN_CARD_FOCUS, {
    variables: { id: card?.card.column.board.id },
    skip: card?.card.column.board.id === undefined,
    fetchPolicy: "network-only",
    refetchWritePolicy: "merge",
  })

  const { data: column, refetch: refetchFields } = useQuery<ColumnData_>(FIND_UNIQUE_COLUMN_IN_CARD_FOCUS, {
    variables: {
      cardId: card?.card.id,
      columnId: card?.card.column.id,
    },
    skip: card?.card === undefined,
    fetchPolicy: "network-only",
    refetchWritePolicy: "merge",
  })

  const fields_ = column?.column.fieldValue.map((field) => field.fieldColumn)

  const [actualColumnName, setActualColumnName] = useState<string | undefined>(undefined)
  const [actualBoardName, setActualBoardName] = useState<string | undefined>(undefined)
  const [actualBoardId, setActualBoardId] = useState<string | undefined>(undefined)

  useEffect(() => {
    setActualColumnName(card?.card.column.title)
    setActualBoardName(card?.card.column.board.title)
    setActualBoardId(card?.card.column.board.id)
  }, [card])

  const [deleteOneCard] = useMutation(DELETE_ONE_CARD_IN_CARD, {
    onCompleted: () => {
      Router.push(`/Board/${actualBoardId}`)
    },
  })

  const [cursorIsLoading, setCursorIsLoading] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCursorIsLoading(true) // Ativa o estado de carregamento
        Router.back()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <Container
      style={{
        cursor: cursorIsLoading ? "wait" : "default",
      }}
    >
      <Head>
        <title>FWO: {card?.card.name || "Card"} </title>
        <meta name='description' content={`FWO | V4Company Colli&Co | ${card?.card.name || "Card"}`} />
        <meta property='og:title' content={`FWO: ${card?.card.name || "Card"}`} />
        <meta property='og:description' content={`FWO: ${card?.card.name || "Card"}`} />
      </Head>
      {actualBoardId && actualBoardName && actualColumnName && (
        <MenuHistoryPaths
          items={[
            { path: `/Board/${actualBoardId}`, name: `${actualBoardName}` },
            { path: `/Board/Card/${params.id}`, name: `${actualColumnName} - ${card?.card.name}` },
          ]}
          loading={loadingCard}
          closeButton={true}
          
        />
      )}

      <ColumnContainer>
        <ColumnContent
          id='comments/history'
          style={{
            paddingBottom: "10rem",
            gap: "1rem",
          }}
        >
          {loadingCard ? (
            <Skeleton
              duration={1}
              style={{
                width: "100%",
                height: "3rem",
              }}
              highlightColor='#D9D9D9'
              borderRadius={10}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                height: "2rem",
                animation: `${fadeIn} 0.5s ease-in-out`,
              }}
            >
              <DefaultButton
                onClick={() => setChoice(() => "history")}
                style={{
                  backgroundColor: choice === "history" ? "#7841B0" : "transparent",
                  color: choice === "history" ? "white" : "black",
                  borderRadius: "1.875rem",
                  height: "1.875rem",
                  width: "fit-content",
                  padding: "0.5rem 1rem",
                  transition: "all 0.2s ease-in-out",
                  border: choice === "history" ? "1px solid transparent" : "1px solid #7841B0",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
                hover={"NeonPurpleShadowEffect"}
              >
                Histórico
              </DefaultButton>
              <DefaultButton
                onClick={() => setChoice(() => "comments")}
                style={{
                  backgroundColor: choice === "comments" ? "#7841B0" : "transparent",
                  color: choice === "comments" ? "white" : "black",
                  borderRadius: "1.875rem",
                  height: "1.875rem",
                  width: "fit-content",
                  padding: "0.5rem 1rem",
                  transition: "all 0.2s ease-in-out",
                  border: choice === "comments" ? "1px solid transparent" : "1px solid #7841B0",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
                hover={"NeonPurpleShadowEffect"}
              >
                Comentários
              </DefaultButton>
            </div>
          )}
          {card && (
            <Tag.TagRoot key={card.card.id}>
              <Tag.TagContent key={card.card.id} cardId={card.card.id} hasAction={true} />
            </Tag.TagRoot>
          )}

          {loadingCard ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  duration={1}
                  style={{
                    width: "100%",
                    height: "8.5rem",
                    marginBottom: "0.625rem",
                  }}
                  highlightColor='#D9D9D9'
                  borderRadius={10}
                />
              ))}
            </>
          ) : (
            <div
              style={{
                animation: `${fadeIn} 0.5s ease-in-out`,
              }}
            >
              {choice === "comments" && (
                <CommentsComponent card={card?.card} uuid={uuid} refetch={refetchCard} userAllowed={userAllowed} />
              )}
              {choice === "history" && (
                <HistoryComponent card={card?.card} cardAssignments={card?.card.cardAssignment} />
              )}
            </div>
          )}
        </ColumnContent>

        <ColumnContent>
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
            }}
          >
            {loadingCard ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "100%",
                }}
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    duration={1}
                    style={{
                      width: "100%",
                      height: "3.4rem",
                      marginBottom: "1rem",
                    }}
                    highlightColor='#D9D9D9'
                    borderRadius={10}
                  />
                ))}
              </div>
            ) : (
              <>
                {fields_?.map((field) => (
                  <div key={field.id} style={{ animation: `${fadeIn} 0.5s ease-in-out` }}>
                    <ChooseFieldComponent field={field} card={card?.card} uuid={uuid} refetch={refetchFields} />
                  </div>
                ))}
              </>
            )}
          </div>
        </ColumnContent>

        {loadingCard && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Skeleton
              duration={1}
              style={{ width: "100%", height: "1.4rem" }}
              highlightColor='#D9D9D9'
              borderRadius={10}
            />
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  duration={1}
                  style={{ width: "100%", height: "3.4rem", marginBottom: ".6rem" }}
                  highlightColor='#D9D9D9'
                  borderRadius={10}
                />
              ))}
            </div>
          </div>
        )}
        {!loadingCard && (
          <ChooseColumnsComponent
            columns={columns?.columns}
            card={card?.card}
            refetch={refetchCard}
            refetchFields={refetchFields}
            beforeChangeCardId={card?.card}
          />
        )}
      </ColumnContainer>
      {userAllowed && (
        <button
          onClick={() => {
            Swal.fire({
              title: "Tem certeza que deseja excluir esse card?",
              text: "Você não poderá reverter essa ação",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#7841B0",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sim, excluir",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteOneCard({ variables: { id: card?.card.id } })
              }
            })
          }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            height: "2rem",
            width: "2rem",
            borderRadius: "50%",
            backgroundColor: "#7841B0",
            border: "none",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Trash
            style={{
              width: "1rem",
            }}
          />
        </button>
      )}
    </Container>
  )
}

const CommentsComponent = ({
  card,
  uuid,
  refetch,
  loading,
  userAllowed,
}: {
  card?: Card
  uuid: string
  refetch: Function
  loading?: boolean
  userAllowed?: boolean
}) => {
  const [comment, setComment] = useState<string | null>(null)
  const [deleteOneCommentProject] = useMutation(DELETE_ONE_COMMENT_IN_CARD)

  const [createOneComment] = useMutation(CREATE_ONE_COMMENT_IN_CARD_FOCUS, { onCompleted: () => refetch() })

  const comments = card?.cardComment

  const handleSubmit = () => {
    if (comment === null || comment === "") {
      Swal.mixin({
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).fire({
        icon: "warning",
        title: "Comentário não pode ser vazio",
      })
      return
    }
    createOneComment({ variables: { args: { userUuid: uuid, cardId: card?.id, comment: comment } } }).then(() => {
      setComment("")
    })
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  const handleDeleteComment = async ({ id }: { id: Number }) => {
    try {
      Swal.fire({
        title: "Tem certeza que deseja excluir esse comentário?",
        text: "Você não poderá reverter essa ação",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7841B0",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteOneCommentProject({ variables: { id: id } })
          refetch()
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <ChatContainer>
      {comments?.map((comment) => (
        <UserMessageContainer key={comment.id}>
          {comment.user.uuid !== uuid ? (
            <UserInfosContainer
              style={{
                justifyContent: "flex-start",
              }}
            >
              <Image
                src={comment.user.avatarUrl}
                alt='User profile'
                width={64}
                height={64}
                title={comment.user.nickName}
              />
              <div>
                <h3>{comment.user.nickName}</h3>
                <span>{utils.formatDateWithTimeZone(comment.createdAt)}</span>
              </div>
              {userAllowed && (
                <button
                  onClick={() => handleDeleteComment({ id: comment.id })}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <Trash
                    variant='Outline'
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#E0465C",
                    }}
                  />
                </button>
              )}
            </UserInfosContainer>
          ) : (
            <UserInfosContainer
              style={{
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => handleDeleteComment({ id: comment.id })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                <Trash
                  variant='Outline'
                  style={{
                    width: "1rem",
                    height: "1rem",
                    color: "#E0465C",
                  }}
                />
              </button>
              <div>
                <h3>{comment.user.nickName}</h3>
                <span>{utils.formatDateWithTimeZone(comment.createdAt)}</span>
              </div>
              <Image
                src={comment.user.avatarUrl}
                alt='User profile'
                width={64}
                height={64}
                title={comment.user.nickName}
              />
            </UserInfosContainer>
          )}
          <p>{comment.comment}</p>
        </UserMessageContainer>
      ))}
      <InputContainer>
        <input
          type='text'
          value={comment ?? ""}
          onChange={(event: any) => setComment(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>
          <ArrowRight />
        </button>
      </InputContainer>
    </ChatContainer>
  )
}

interface CardsData {
  cards: Card[]
}
interface ColumnData_ {
  column: Column
}

const ChooseFieldComponent = ({
  field,
  card,
  uuid,
  refetch,
}: {
  field: Field
  card?: Card
  uuid: string
  refetch: Function
}) => {
  const { data: cards } = useQuery<CardsData>(FIND_MANY_CARDS_WITH_BOARD_IN_CARD_FOCUS, {
    variables: { id: field?.content?.boardId?.toString() },
    skip: field?.content?.boardId === undefined,
  })

  const { userRoot } = useContext(UserContext)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [errorBoolean, setErrorBoolean] = useState<boolean | null>(null)
  const [response, setResponse] = useState<BaseMutationOptions | undefined>(undefined)

  const [createValue, { loading, error }] = useMutation(CREATE_ONE_FIELD_VALUE_IN_CARD_FOCUS, {
    onError: (error) => {
      console.error(error)
      setSuccess(false)
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    },
    onCompleted: (response, clientOptions) => {
      setResponse(() => response)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(null)
        setResponse(() => undefined)
      }, 3000)
    },
  })

  const handleSubmitValue = async ({ value }: { value: any }) => {
    if (typeof value === "object") {
      createValue({
        variables: {
          args: {
            fieldId: field.id,
            cardId: card?.id,
            fieldType: field.fieldType,
            createdBy: uuid,
            content: {
              value: value,
            },
          },
        },
      }).catch((error) => {
        console.error(error)
        toast.error("Erro ao salvar mudanças! Por favor recarregue a pagina e tente novamente")
      })
      return
    }

    createValue({
      variables: {
        args: {
          fieldId: field.id,
          cardId: card?.id,
          fieldType: field.fieldType,
          createdBy: uuid,
          content: {
            value: value,
          },
        },
      },
    })
  }

  if (field?.fieldType === "CITY" || field?.fieldType === "STATE") {
    return (
      <PrimitivesBoard
        typeField={field?.fieldType}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        onChange={(selectedOptions) => {
          const values = selectedOptions.map((item: { value: any }) => item.value)
          handleSubmitValue({ value: values })
        }}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        description={field.description}
        id={field.id}
      />
    )
  } else if (field?.fieldType === "DATE") {
    return (
      <PrimitivesBoard
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        typeField={field?.fieldType}
        onChange={(date) => handleSubmitValue({ value: date })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        description={field.description}
        id={field.id}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (field?.fieldType === "INVEST") {
    return (
      <PrimitivesInvesters
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        onChange={(values: any) => handleSubmitValue({ value: values })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        description={field.description}
        id={field.id.toString()}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (field?.fieldType === "PROJECTS") {
    return (
      <PrimitivesBoard
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        typeField={field?.fieldType}
        onChange={(value) => handleSubmitValue({ value: value })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        description={field.description}
        id={field.id}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (field?.fieldType === "CONNECTIONBOARD") {
    return (
      <PrimitivesBoard
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        cards={cards?.cards}
        typeField={field?.fieldType}
        onChange={(selectedOptions) => {
          handleSubmitValue({ value: selectedOptions })
        }}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        description={field.description}
        id={field.id}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (field?.fieldType === "RADIOBUTTON") {
    return (
      <PrimitiveRadioButton
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        options={field.content?.options}
        loading={loading}
        errorBoolean={!!errorBoolean}
        defaultValue={{ value: field.FieldsValue?.[0]?.content?.value, label: field.FieldsValue?.[0]?.content?.value }}
        successBoolean={!!success}
        onChange={(value) => handleSubmitValue({ value: value })}
      />
    )
  } else if (field?.fieldType === "MONEY") {
    return (
      <PrimitivesBoard
        id={field.id}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        typeField={field?.fieldType}
        onBlur={(value: any) => handleSubmitValue({ value: value })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        description={field.description}
        successBoolean={success === true}
        errorBoolean={errorBoolean === true}
      />
    )
  } else if (field?.fieldType === "DATEAPPOINTMENT") {
    return (
      <PrimitivesAppointment
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        onChange={(value) => handleSubmitValue({ value: value })}
        loading={loading}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (field?.fieldType === "CLIENT") {
    return (
      <PrimitivesClients
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        response={response}
        onChange={(value) => handleSubmitValue({ value: value })}
        id={field.id.toString()}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (field?.fieldType === "ATTACHMENT") {
    return (
      <PrimitiveAttachment
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        field={field.FieldsValue}
        response={response}
        onFetch={(response) => {
          handleSubmitValue({ value: response.data }).then(() => refetch?.())
        }}
        successBoolean={success === true}
        errorBoolean={success === false}
        loading={loading}
      >
        <PrimitiveAttachmentAction
          icon={Trash}
          action='DELETE'
          onClick={() => {
            handleSubmitValue({ value: "" }).then(() => refetch?.())
          }}
        />
      </PrimitiveAttachment>
    )
  } else if (field?.fieldType === "NUMBER") {
    return (
      <PrimitiveNumber
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        response={response}
        defaultValue={field.FieldsValue?.[field.FieldsValue.length - 1]?.content?.value}
        onBlur={(event: { target: { value: any } }) => handleSubmitValue({ value: event.target.value })}
        loading={loading}
        errorBoolean={!!errorBoolean}
        successBoolean={!!success}
      />
    )
  } else if (field?.fieldType === "IMAGE") {
    return (
      <PrimitiveImage
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        field={field.FieldsValue}
        response={response}
        onFetch={(response) => handleSubmitValue({ value: response.data }).then(() => refetch?.())}
        refetch={refetch}
        loading={loading}
        errorBoolean={!!errorBoolean}
        successBoolean={!!success}
      />
    )
  } else if (field?.fieldType === "TEL") {
    return (
      <PrimitivesBoard
        id={field.id}
        typeField={"TEL"}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onBlur={(value: any) => handleSubmitValue({ value: value })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (
    field?.fieldType === "CNH" ||
    field?.fieldType === "CPF" ||
    field?.fieldType === "CNPJ" ||
    field?.fieldType === "CEP"
  ) {
    return (
      <PrimitivesBoard
        id={field.id}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        typeField={field?.fieldType}
        onBlur={(value: any) => handleSubmitValue({ value: value })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (field?.fieldType === "LINK") {
    return (
      <PrimitiveLink
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onBlur={(event) => handleSubmitValue({ value: event.target.value })}
        response={response}
        loading={loading}
        errorBoolean={!!errorBoolean}
        successBoolean={!!success}
      >
        {field.FieldsValue?.[0]?.content?.value && (
          <PrimitiveLinkAnchor href={field.FieldsValue?.[0]?.content?.value} />
        )}
      </PrimitiveLink>
    )
  } else if (field?.fieldType === "CHECKBOX") {
    return (
      <PrimitivesBoard
        typeField={field?.fieldType}
        onChange={(value) => handleSubmitValue({ value: value })}
        options={field.content?.options}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        id={field.id}
        key={field.id}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  } else if (field.fieldType === "LONGTEXT") {
    return (
      <PrimitiveLongText
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        description={field.description}
        onDebounce={(value) => handleSubmitValue({ value: value })}
        loading={loading}
        errorBoolean={!!errorBoolean}
        successBoolean={!!success}
      />
    )
  }
  else {
    return (
      <PrimitivesBoard
        id={field.id}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        typeField={field?.fieldType}
        onBlur={(event: any) => handleSubmitValue({ value: event.target.value })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        successBoolean={success === true}
        errorBoolean={success === false}
      />
    )
  }
}

const ChooseColumnsComponent = ({
  columns,
  card,
  refetch,
  refetchFields,
  beforeChangeCardId,
}: {
  columns?: Column[]
  card?: Card
  refetch: Function
  refetchFields: Function
  beforeChangeCardId?: Card
}) => {
  const [updateOneCard] = useMutation(UPDATE_ONE_CARD_IN_CARD_FOCUS)
  const [fetchCard] = useLazyQuery<CardData>(FIND_UNIQUE_CARD_IN_CARD_COMPONENT_CREATE_MOVEMENT, {
    fetchPolicy: "network-only",
  })
  const [createOneCardMovement] = useMutation(CREATE_ONE_MOVEMENT_FOR_CARD_DRAG_IN_CARD_FOCUS, {
    fetchPolicy: "network-only",
  })

  const [createOneStatusMovement] = useMutation(CREATE_ONE_STATUS_MOVEMENT_CARD_IN_CARD)

  const { uuid } = useContext(UserContext)

  const [actualColumnName, setActualColumnName] = useState<string | undefined>(card?.column.title)
  console.log(actualColumnName)

  const movementCard = async ({ cardId, to, from }: { cardId?: string; to?: number; from?: number }) => {
    try {
      const response = await fetchCard({ variables: { id: cardId } })
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

      Router.reload()

    } catch (error) {
      toast.error("Erro ao mover card", {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_RIGHT,
      })

      await refetch()
      await refetchFields()
    }
  }

  const handleChangeColumnCard = async (column: Column, card?: Card) => {
    const approvedChange = column.linkingColumns.some((item) => item.id === card?.column.id)
    if (!approvedChange) {
      Swal.fire({
        toast: true,
        icon: "warning",
        title: "O Card dessa etapa não pode ser movido para essa coluna",
        width: "30rem",
      })

      return
    } else {
      movementCard({ cardId: card?.id, to: column.id, from: card?.column.id })
    }
  }

  const columnCurrentIndex = columns?.findIndex((col) => col.id === card?.column.id)

  async function verifyRequiredFieldsTest(cardId?: string, columnId?: number, column?: Column, card?: Card,DestinationColumnName?:string) {
    console.log("DestinationColumnName",DestinationColumnName)
    console.log("column original",card?.column.title)
    if (cardId && columnId && column && card) {
      // await refetch()
      // await refetchFields()
      const isEmpty = await verifyRequiredFields(cardId, columnId)
      if (!isEmpty.fields || isEmpty.fields === "") {
        handleChangeColumnCard(column, card).then(() => {
         createOneStatusMovement({         variables: { args: { id: cardId, action: "update", from: card.column.title, to: DestinationColumnName }, },
          })
        })

      } else {
        const fieldsArray = isEmpty.fields.split("\n")
        const displayToasts = async () => {
          for (let i = 0; i < fieldsArray.length; i++) {
            const field = fieldsArray[i]
            setTimeout(() => {
              toast.error(`Campo obrigatório não preenchido: ${field}`, {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT,
              })
            }, i * 250)
          }
        }

        displayToasts()
        // refetch()
        refetchFields()
      }
    }
  }
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  return (
    <ChooseColumns id='Fases'>
      <h3>Mover card para fase</h3>

      {columns?.map((column: Column, index: number) => {
        if (index === 0) {
          return
        }
        if (columnCurrentIndex === index) {
          return (
            <ColumnCard
              key={column.id}
              position={"actual"}
            // onClick={async () => {
            >
              {column.title}
            </ColumnCard>
          )
        } else if (columnCurrentIndex && index < columnCurrentIndex) {
          return (
            <ColumnCard
              key={column.id}
              position={"before"}
              onClick={async () => {
                setButtonDisabled(true)
                verifyRequiredFieldsTest(card?.id, card?.column.id, column, card,column.title).finally(() => {
                  setButtonDisabled(false)
                })
              }}
              style={{
                display: column.linkingColumns.some((item) => item.id === card?.column.id) ? "flex" : "none",
              }}
              disabled={buttonDisabled}
            >
              {column.title}
              <ArrowLeft />
            </ColumnCard>
          )
        } else if (index === columns.length - 1) {
          return (
            <ColumnCard
              key={column.id}
              position={"last"}
              onClick={async () => {
                setButtonDisabled(true)
                verifyRequiredFieldsTest(card?.id, card?.column.id, column, card,column.title).finally(() => {
                  setButtonDisabled(false)
                })
              }}
              style={{
                display: column.linkingColumns.some((item) => item.id === card?.column.id) ? "flex" : "none",
              }}
            >
              {column.title}
              <ArrowRight />
            </ColumnCard>
          )
        } else {
          return (
            <ColumnCard
              onClick={async () => {
                setButtonDisabled(true)
                verifyRequiredFieldsTest(card?.id, card?.column.id, column, card,column.title).finally(() => {
                  setButtonDisabled(false)
                })
              }}
              style={{
                display: column.linkingColumns.some((item) => item.id === card?.column.id) ? "flex" : "none",
              }}
              position={"default"}
              key={column.id}
            >
              {column.title}
              <ArrowRight />
            </ColumnCard>
          )
        }
      })}
    </ChooseColumns>
  )
}

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})
