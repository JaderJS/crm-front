import { Card, Tag } from "@/types"
import { gql, useMutation, useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { ContainerPopUp } from "../../../pages/Board/Card/styles"
import * as Dialog from "@radix-ui/react-dialog"
import { PopUpChildren } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpChildren"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormText } from "@/components/InputFormComponents/Text"
import { TagButton } from "./styles"
import { EndButtonsContainer, HeaderContainer } from "../primitivesBoard/PopUpComponents/PopUpDate/styles"
import { ArrowRight, CloseCircle, NoteRemove } from "iconsax-react"
import { DefaultButton } from "@/components/DefaultButton"
import { BlockPicker, SketchPicker } from "react-color"
import { PrimitivesBoard } from "../primitivesBoard"
import Swal from "sweetalert2"
import Router from "next/router"
import Skeleton from "react-loading-skeleton"
import { styled, keyframes } from "@/styles"
import { InView } from "react-intersection-observer";


const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

// const FIND_MANY_CARDS_IN_TAG_COMPONENT = gql`
//   query findManyCardsInTagComponent($id: String!) {
//     tags(where: { boardId: { equals: $id } }) {
//       id
//       title
//       color
//     }
//   }
// `

// const FIND_UNIQUE_CARD_IN_TAG_COMPONENT = gql`
//   query findManyCardInTagComponent($id: String!) {
//     card(where: { id: $id }) {
//       cardTags {
//         tag {
//           id
//           title
//           color
//         }
//       }
//     }
//   }
// `

const UPSERT_ONE_TAG_IN_TAG_COMPONENT = gql`
  mutation upsertOneTagInTagComponent($id: Int!, $create: TagUncheckedCreateInput!, $update: TagUncheckedUpdateInput!) {
    upsertOneTag(where: { id: $id }, create: $create, update: $update) {
      id
      boardId
    }
  }
`

const UPSERT_ONE_TAG_CARD_IN_TAG_COMPONENT = gql`
  mutation upsertOneTagCardInTagComponent(
    $where: CardTagsCardIdTagIdCompoundUniqueInput!
    $create: CardTagsUncheckedCreateInput!
    $update: CardTagsUncheckedUpdateInput!
  ) {
    upsertOneCardTags(where: { cardId_tagId: $where }, create: $create, update: $update) {
      tagId
    }
  }
`

const FIND_MANY_TAGS_ON_BOARD_IN_CARD_FOCUS = gql`
  query findManyTagsOnBoardInCardFocus($id: String!) {
    tags(where: { boardId: { equals: $id } }) {
      id
      title
      color
    }
  }
`

const DELETE_ONE_CARD_TAG_IN_TAG_COMPONENT = gql`
  mutation deleteOneCardTagInTagComponent($args: CardTagsWhereUniqueInput!) {
    deleteOneCardTags(where: $args) {
      cardId
    }
  }
`

const FIND_UNIQUE_CARD_IN_CARD_FOCUS_TAG_COMPONENT = gql`
  query findUniqueCardInCardFocusInTagComponent($id: String!) {
    card(where: { id: $id }) {
      id
      name
      cardTags {
        tag {
          id
          title
          color
        }
      }
      # moviment(orderBy: { createdAt: desc }, take: 3) {
      #   id
      #   user {
      #     uuid
      #     avatarUrl
      #     name
      #   }
      #   content
      #   createdAt
      #   toColumn {
      #     id
      #     title
      #   }
      #   fromColumn {
      #     id
      #     title
      #   }
      # }
      # createdByUser {
      #   uuid
      #   name
      #   avatarUrl
      #   userJobFunction {
      #     jobFunction {
      #       name
      #     }
      #   }
      # }
      # updatedByUser {
      #   uuid
      #   name
      #   avatarUrl
      #   userJobFunction {
      #     jobFunction {
      #       name
      #     }
      #   }
      # }
      column {
        id
        title
        board {
          id
          title
        }
      }
    }
  }
`

interface TagComponentProps {
  // card: Card
  hasAction?: Boolean
  refetchProp?: Function
  cardId?: string
}

interface TagsData {
  tags: Tag[]
}

interface CardData {
  card: Card
}

const TagRoot = ({ children }: { children: JSX.Element }) => {
  return <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>{children}</div>
}

const TagContent = ({ hasAction = false, refetchProp, cardId }: TagComponentProps) => {
  const id = cardId
  const {
    data: card,
    refetch: refetchCard,
    loading: loadingCard,
  } = useQuery<CardData>(FIND_UNIQUE_CARD_IN_CARD_FOCUS_TAG_COMPONENT, {
    variables: { id: id },
    skip: id == undefined ,
    refetchWritePolicy: "merge",
    fetchPolicy: "cache-first",
  })

  const [loading, setLoading] = useState<boolean>(true)
  if (loadingCard)
    return (
      <div
        style={{
          width: "100%",
        }}
      >
        <Skeleton
          style={{
            borderRadius: "0.5rem",
            backgroundColor: "#EEE",
            margin: "0.5rem",
            width: "100%",
            height: "1.25rem",
          }}
        />
     
      </div>
    )

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "0.65rem",
        flexWrap: "wrap",
        height: "fit-content",
        animation: `${fadeIn} 0.5s ease-in-out`,
      }}
    >
      {card?.card?.cardTags?.map((val) => (
        <TagButton key={val.tag.id} style={{ backgroundColor: val.tag.color }}>
          {hasAction && (
            <TagActions card={card.card} tag={val.tag} selfRefetch={refetchCard}>
              <p>{val.tag.title || "Sem título"}</p>
            </TagActions>
          )}
          {!hasAction && <p>{val.tag.title}</p>}
        </TagButton>
      ))}
      {hasAction && card?.card && (
        <TagActions card={card.card} selfRefetch={refetchCard}>
          <TagButton
            style={{
              width: "6rem",
              backgroundColor: "#7841B0",
            }}
          >
            <p>Criar Tag +</p>
          </TagButton>
        </TagActions>
      )}
    </div>
  )
}

const tagSchema = z.object({
  boardId: z.string(),
  cardId: z.string(),
  tagId: z.number().default(0),
  color: z.string(),
  title: z.string(),
})
type TagSchema = z.infer<typeof tagSchema>

interface TagFormProps {
  children: React.JSX.Element
  card: Card
  tag?: Tag
  refetchProp?: Function
  selfRefetch?: Function
}

const TagActions = ({ children, card, tag, refetchProp, selfRefetch }: TagFormProps) => {
  const [show, setShow] = useState(false)
  const [upsertOneTag] = useMutation(UPSERT_ONE_TAG_IN_TAG_COMPONENT)
  const [upsertOneTagCard] = useMutation(UPSERT_ONE_TAG_CARD_IN_TAG_COMPONENT)
  const { data: tags, refetch } = useQuery<TagsData>(FIND_MANY_TAGS_ON_BOARD_IN_CARD_FOCUS, {
    variables: { id: card.column.board.id },
    fetchPolicy: "network-only",
  })
  const [deleteOneCardTag] = useMutation(DELETE_ONE_CARD_TAG_IN_TAG_COMPONENT)

  useEffect(() => {
    selfRefetch && selfRefetch()
  }, [show])

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TagSchema>({
    defaultValues: {
      boardId: card.column.board.id,
      cardId: card.id,
      color: tag?.color,
      title: tag?.title,
      tagId: tag?.id,
    },
    resolver: zodResolver(tagSchema),
  })

  const submit = (data: TagSchema) => {
    upsertOneTag({
      variables: {
        id: data.tagId,
        create: { boardId: data.boardId, color: data.color, title: data.title },
        update: { color: { set: data.color }, title: { set: data.title } },
      },
    })
      .then((res) => {
        const { id: tagId, boardId } = res.data.upsertOneTag

        upsertOneTagCard({
          variables: {
            where: {
              tagId: tagId,
              cardId: data.cardId,
            },
            create: {
              tagId: tagId,
              cardId: data.cardId,
            },
            update: {
              tagId: { set: tagId },
              cardId: { set: data.cardId },
            },
          },
        })
      })
      .then((res) => {
        setTimeout(() => {
          selfRefetch && selfRefetch()
        }, 350)
        setShow(false)
      })
  }

  const disconnectTag = ({ tagId, cardId }: { tagId: number; cardId: string }) => {
    deleteOneCardTag({
      variables: {
        args: {
          cardId_tagId: {
            cardId: cardId,
            tagId: tagId,
          },
        },
      },
    })
      .then((response) => {
        refetchProp && refetchProp()
        selfRefetch && selfRefetch()
        setShow(false)
      })
      .catch((error) => {
        console.error(error)
      })
    // cardTags: { disconnect: { cardId_tagId: { cardId: "asd", tagId: 1 } } }
  }

  async function disconnectPopUp(tagId: number, cardId: string) {
    const result = await Swal.fire({
      title: "Deseja desconectar a tag?",
      text: "A tag será desconectada do card.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7841B0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desconectar!",
    })

    if (result.isConfirmed) {
      disconnectTag({ tagId, cardId })
      Swal.fire("Desconectado!", "A tag foi desconectada.", "success")
    }
  }

  const [temporaryColor, setTemporaryColor] = useState<string>(tag?.color || "")

  const [newTag, setNewTag] = useState<boolean>(false)

  const HandleSetColors = (color: string) => {
    setValue("color", color)
  }

  return (
    <Dialog.Root open={show}>
      <div
        style={{
          display: "flex",
          width: "fit-content",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setShow(true)}
      >
        {children}
      </div>
      <Dialog.Portal>
        <Dialog.DialogOverlay />
        <PopUpChildren>
          <HeaderContainer>
            <p>Tag</p>
            {tag && (
              <button onClick={() => disconnectPopUp(tag.id, card.id)}>
                <NoteRemove />{" "}
              </button>
            )}
            <button onClick={() => setShow(false)}>
              <CloseCircle variant='Outline' />
            </button>
          </HeaderContainer>
          {newTag ? (
            <form
              onSubmit={handleSubmit(submit)}
              style={{
                width: "100%",
                margin: "0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ContainerPopUp>
                <FormText
                  label='Nome da tag*'
                  placeholder='Nome da tag'
                  register={register("title")}
                  error={errors.title}
                />

                <BlockPicker
                  width='100%'
                  colors={[
                    "#D32F2F",
                    "#FF223C",
                    "#C2185B",
                    "#9C27B0",
                    "#7B1FA2",
                    "#E64A19",
                    "#F57C00",
                    "#E65100",
                    "#BF360C",
                    "#3E2723",
                    "#5D4037",
                    "#455A64",
                    "#263238",
                  ]}
                  color={temporaryColor}
                  onChange={(colorResult: any) => HandleSetColors(colorResult.hex)}
                  onChangeComplete={(colorResult: any) => setTemporaryColor(colorResult.hex)}
                  triangle='hide'
                />
                {/* <input type="color" onChange={(event) => setValue('color', event.target.value)} defaultValue={getValues('color')} /> */}
                <EndButtonsContainer>
                  <DefaultButton
                    onClick={() => {
                      setNewTag(false)
                      setShow(false)
                    }}
                    backgroundColor={"gray"}
                    hover={"Gray"}
                    style={{
                      color: "#A1A1A5",
                      backgroundColor: "#EEE",
                    }}
                  >
                    Cancelar
                  </DefaultButton>
                  <DefaultButton
                    onClick={() => setNewTag(false)}
                    backgroundColor={"gray"}
                    hover={"Gray"}
                    style={{
                      color: "#A1A1A5",
                      backgroundColor: "#EEE",
                    }}
                  >
                    Usar tag existente
                  </DefaultButton>

                  <DefaultButton animationSvg={"arrowRight"} type='submit'>
                    Salvar alterações
                    <ArrowRight
                      variant='Outline'
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                    />
                  </DefaultButton>
                </EndButtonsContainer>
              </ContainerPopUp>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(submit)}
              style={{
                width: "100%",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <PrimitivesBoard
                typeField='SELECT'
                label='Tags existentes'
                options={(() => {
                  const seenColors = new Set()
                  return (
                    tags?.tags
                      ?.filter((tag) => {
                        if (!seenColors.has(tag.color)) {
                          seenColors.add(tag.color)
                          return true
                        }
                        return false
                      })
                      .map((tag) => ({ value: tag.color, label: tag.title })) || []
                  )
                })()}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setValue("color", selectedOption.value)
                    setValue("title", selectedOption.label)
                  }
                }}
                defaultValue={getValues("color")}
              />
              <EndButtonsContainer>
                <DefaultButton
                  onClick={() => {
                    setNewTag(false)
                    setShow(false)
                  }}
                  backgroundColor={"gray"}
                  hover={"Gray"}
                  style={{
                    color: "#A1A1A5",
                    backgroundColor: "#EEE",
                  }}
                >
                  Cancelar
                </DefaultButton>
                <DefaultButton
                  onClick={() => setNewTag(true)}
                  backgroundColor={"gray"}
                  hover={"Gray"}
                  style={{
                    color: "#A1A1A5",
                    backgroundColor: "#EEE",
                    border: "1px solid #A1A1A5",
                  }}
                >
                  {tag ? "Editar tag" : "Criar tag"}
                </DefaultButton>

                <DefaultButton animationSvg={"arrowRight"} type='submit' onClick={() => handleSubmit(submit)}>
                  Salvar alterações
                  <ArrowRight
                    variant='Outline'
                    style={{
                      width: "1rem",
                      height: "1rem",
                    }}
                  />
                </DefaultButton>
              </EndButtonsContainer>
            </form>
          )}
        </PopUpChildren>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { TagRoot, TagContent }
