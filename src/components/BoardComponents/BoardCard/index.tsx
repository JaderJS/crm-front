import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useContext,
  useState,
} from "react"
import {
  Container,
  Content,
  DeleteCardButton,
  FielValue,
  FieldTittle,
  Fields,
  Header,
  TagButton,
  UserAssignment,
} from "./styles"
import {
  AddCircle,
  ArrowCircleUp,
  Building,
  Calendar,
  Call,
  Car,
  Card,
  Clock,
  CopySuccess,
  DollarSquare,
  Framer,
  Gallery,
  I3DCubeScan,
  Link1,
  Link2,
  Location,
  More,
  Paperclip,
  PictureFrame,
  Sms,
  TextBlock,
  TextalignJustifycenter,
  TickSquare,
  Trash,
} from "iconsax-react"
import { gql, useQuery, useMutation, useSubscription, useLazyQuery } from "@apollo/client"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { UserContext } from "@/contexts/UserContext"
import { Column, FieldType, FieldsValue, User } from "@/types"
import { AuthContext } from "@/contexts/AuthContext"
import { fieldNameFromStoreName } from "@apollo/client/cache"
import { PopUpTag } from "../primitivesBoard/PopUpComponents/PopUpTag"
import * as Tag from "@/components/BoardComponents/BoardCard/tagComponent"
import { Utils } from "@/utils/utils"
const utils = new Utils()

interface cardAssignment {
  user: {
    avatarUrl: string
    nickName: string
  }
}

interface BoardCardProps {
  draggableId: string
  description: string
  isOpen: boolean
  data?: any
  [key: string]: any
  onOpen: (id: string) => void
  id: string
  name: string
  tags: string[]
  priority: any
  appointment: string | null
  cardAssignment: cardAssignment[]
  disabled?: boolean
  refetch?: Function
  styles?: any
}

const UPDATE_CARD_IN_BOARD_CARD_COMPONENT = gql`
  mutation updateCard($id: String!, $args: CardUncheckedUpdateInput!) {
    updateOneCard(data: $args, where: { id: $id }) {
      id
    }
  }
`

const DELETE_ONE_CARD = gql`
  mutation deleteOneCard($id: String!) {
    deleteOneCard(where: { id: $id }) {
      id
    }
  }
`
// const FIND_MANY_USER_IN_CARDBOARD = gql`
//   query findUniqueUserInPersonal($uuid: String!) {
//     getUser(where: { uuid: $uuid }) {
//       uuid

//       nickName
//       avatarUrl
//     }
//   }
// `

interface UserData {
  getUser: User
}

export function BoardCard({
  draggableId,
  isOpen,
  onOpen,
  data,
  id,
  name,
  tags,
  priority,
  appointment,
  description,
  cardAssignment,
  disabled,
  refetch,
  styles,
  ...props
}: BoardCardProps) {
  const { uuid } = useContext(AuthContext)
  const Router = useRouter()

  let formattedAppointment = ""

  if (appointment) {
    formattedAppointment = dayjs(appointment).format("DD/MM/YYYY HH:mm")
  }

  const [updateOneCard, { data: updatedCard, loading, error }] = useMutation(UPDATE_CARD_IN_BOARD_CARD_COMPONENT)
  const [deleteOneCard] = useMutation(DELETE_ONE_CARD)
  const [open, setOpen] = useState(true)

  // const toggleOpen = () => {
  //   setOpen(!open)
  //   if (!draggableId) return
  //   onOpen(draggableId)
  //   updateOneCard({
  //     variables: {
  //       id: draggableId,
  //       args: {
  //         isOpen: { set: !open },
  //         updatedBy: { set: uuid },
  //       },
  //     },
  //   }).catch((error: any) => {
  //     console.error(error)
  //   })
  // }

  const showFields = data?.fieldValue?.reduce(
    (
      acc: { id: any; createdAt: any; value: any; label: any; FieldType: any }[],
      item: {
        field: { showInCard: any; id: any; name: any; fieldType: any }
        createdAt: number
        content: { value: any }
      },
    ) => {
      if (item.field?.showInCard) {
        const existingItemIndex = acc.findIndex((x) => x.id === item.field?.id)

        if (existingItemIndex !== -1) {
          if (item.createdAt > acc[existingItemIndex].createdAt) {
            acc[existingItemIndex] = {
              id: item.field.id,
              createdAt: item.createdAt,
              value: item.content?.value,
              label: item.field.name,
              FieldType: item.field.fieldType,
            }
          }
        } else {
          acc.push({
            id: item.field.id,
            createdAt: item.createdAt,
            value: item.content?.value,
            label: item.field.name,
            FieldType: item.field.fieldType,
          })
        }
      }

      return acc
    },
    [] as { id: number; createdAt: string; value: string; label: string; FieldType: FieldType }[],
  )

  function getIconByTitle(title: any) {
    switch (title) {
      case "SHORTTEXT":
        return <TextBlock />
      case "LONGTEXT":
        return <TextalignJustifycenter />
      case "DATE":
        return <Calendar />
      case "MONEY":
        return <DollarSquare />
      case "INVEST":
        return <Framer />
      case "CONNECTIONBOARD":
        return <Link1 />
      case "SELECT":
        return <ArrowCircleUp />
      case "CITY":
        return <Location />
      case "RADIOBUTTON":
        return <AddCircle />
      case "MULTISELECT":
        return <CopySuccess />
      case "NUMBER":
        return <CopySuccess />
      case "TEL":
        return <Call />
      case "STATE":
        return <Location />
      case "DATEAPPOINTMENT":
        return <Calendar />
      case "CLIENT":
        return <PictureFrame />
      case "LINK":
        return <Link2 />
      case "IMAGE":
        return <Gallery />
      case "ATTACHMENT":
        return <Paperclip />
      case "CPF":
        return <Card />
      case "CNPJ":
        return <Building />
      case "CNH":
        return <Car />
      case "EMAIL":
        return <Sms />
      case "CEP":
        return <Location />
      case "CHECKBOX":
        return <TickSquare />
      case "HOURS":
        return <Clock />
      default:
        return <TextBlock />
    }
  }
  return (
    <Container
      style={{
        height: "fit-content",
        transition: "all 0.2s ease-in-out",
        border: priority === 1 ? "1px solid #DC2424" : priority === 0.5 ? "1px solid #A1A1A5" : "1px solid transparent",
        position: "relative",
        ...styles,
      }}
      isOpened={open}
      onDoubleClick={() => {
        window.open(`/Board/Card/${id}`, "_blank")
      }}
     
      onAuxClick={(event) => {
        if (event.button === 1 && open && !disabled) { // 1 representa o botão do meio (scroll do mouse)
         window.open(`/Board/Card/${id}`, "_blank")
        }
      }}
      title={disabled ? "Clique duas vezes para abrir" : "Clique para abrir"}
    >
      <Header
        onClick={() => {
          // if (!disabled) toggleOpen()
        }}
      >
        <h2 title={name}>{name}</h2>
      </Header>

      {data && data.cardTags?.length > 0 && (
        <div
          style={{
            position: "relative",
            display: open ? "flex" : "block",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: "100%",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
          onClick={() => {
            if (open && !disabled) {
              Router.push(`/Board/Card/${id}`)
            }
          }}  
          onAuxClick={(event) => {
            if (event.button === 1 && open && !disabled) { // 1 representa o botão do meio (scroll do mouse)
             window.open(`/Board/Card/${id}`, "_blank")
            }
          }}
        >
          {data.cardTags.map((tag: any, index: number) => (
            <TagButton
              key={index}
              style={{
                backgroundColor: tag.tag.color,
              }}
            >
              {tag.tag.title}
            </TagButton>
          ))}
        </div>
      )}

      <Content
        style={{
          opacity: open ? 1 : 0,
          transition: open ? "opacity 0.2s ease-in-out" : "opacity 0.05s ease-in-out",
          cursor: open ? "pointer" : "",
          height: open ? "auto" : "0",
          minHeight: open ? "5rem" : "0",
          display: open ? "block" : "none",
          marginTop: "1rem",
        }}
        onClick={() => {
          if (open && !disabled) {
            Router.push(`/Board/Card/${id}`)
          }
        }}  
        onAuxClick={(event) => {
          if (event.button === 1 && open && !disabled) { // 1 representa o botão do meio (scroll do mouse)
           window.open(`/Board/Card/${id}`, "_blank")
          }
        }}
      
      >
        {disabled && <p>{description}</p>}
        {showFields?.map((field: { FieldType: string; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; value: string | number | boolean | any[] | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined }, index: Key | null | undefined) => (
  <Fields key={index}>
    <FieldTittle>
      {getIconByTitle(field?.FieldType)}
      <h3>{field?.label}</h3>
    </FieldTittle>
    <FielValue>
      {/* Verifica se o campo de data já foi formatado antes de renderizá-lo novamente */}
      {typeof field?.value !== "symbol" && typeof field?.value !== "object" && field.FieldType !== "DATE" && field.FieldType !== "DATEAPPOINTMENT" && (
        <p>{field?.value}</p>
      )}
      {field.FieldType === "PROJECTS" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "0.5rem",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {Array.isArray(field?.value) &&
            field?.value.map((project: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  position: "relative",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    wordBreak: "break-word",
                    wordWrap: "break-word",
                    width: "100%",
                  }}
                  title={project.label}
                >
                  {project.label}
                </p>
              </div>
            ))}
        </div>
      )}
      {/* Renderiza os campos de data apenas uma vez, evitando a duplicação */}
      {field.FieldType === "DATEAPPOINTMENT" && <p>{utils.formatToDDMMAAAA(field?.value as string)}</p>}
      {field.FieldType === "DATE" && <p>{utils.formatToDDMMAAAA(field?.value as string)}</p>}
    </FielValue>
  </Fields>
))}

        <UserAssignment
          style={{
            opacity: open ? 1 : 0,
            transition: open ? "opacity 0.2s ease-in-out" : "opacity 0.00s ease-in-out",
          }}
        >
          {cardAssignment &&
            cardAssignment.map((user, index) => (
              <Image
                width={135}
                height={135}
                key={index}
                src={user.user.avatarUrl}
                alt={user.user.nickName}
                loading='lazy'
                title={user.user.nickName}
              />
            ))}
        </UserAssignment>
      </Content>
    </Container>
  )
}
