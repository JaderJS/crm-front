import { Card, CardMovement } from "@/types"
import Image from "next/image"
import { ChooseFieldComponent } from "./chooseField"
import { useContext, useState } from "react"
import { Container, MovedBy } from "./historyStyles"
import { Utils } from "@/utils/utils"
import { ArrowDown, ArrowDown2, ArrowSwapVertical, Edit, Edit2, Trash } from "iconsax-react"
import { gql, useMutation, useQuery } from "@apollo/client"
import { aggregateUniqueOrderMovementCard } from "@/myHooks/Card/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { UserContext } from "@/contexts/UserContext"
import Swal from "sweetalert2"

const utils = new Utils()

const FIND_UNIQUE_CARD_IN_HISTORY_COMPONENT = gql`
  query findUniqueCardInHistoryComponent($id: String!) {
    card(where: { id: $id }) {
      id
      hasHistoryModified
      moviment(orderBy: { createdAt: asc }) {
        id
        user {
          uuid
          avatarUrl
          name
        }
        content
        toColumn {
          id
          title
          order
        }
        fromColumn {
          id
          title
          order
        }
        createdAt
      }
    }
  }
`

const FIND_UNIQUE_CARD_IN_HISTORY_COMPONENT1 = gql`
  query findUniqueCardInHistoryComponent1($id: String!) {
    findUniqueCardInHistoryComponent(id: $id) {
      id
      hasHistoryModified
      moviment {
        id
        user {
          uuid
          avatarUrl
          name
        }
        content
        toColumn {
          id
          title
          order
        }
        fromColumn {
          id
          title
          order
        }
        createdAt
      }
    }
  }
`

const DELETE_ONE_HISTORY_MOVEMENT = gql`
  mutation deleteOneHistoryMovement($id: Int!) {
    deleteOneCardMovement(where: { id: $id }) {
     id 
    }
  }
`

interface CardData {
  card: Card
}
interface CardData extends Card {
  findUniqueCardInHistoryComponent: any
}

export const HistoryComponent = ({ card, cardAssignments }: { card?: Card; cardAssignments?: any }) => {
  const {userRoot} = useContext(UserContext)

  // const { data: card_, refetch: refetchCard } = useQuery<CardData>(FIND_UNIQUE_CARD_IN_HISTORY_COMPONENT, {
  //   variables: { id: card?.id },
  //   skip: card === undefined,
  //   fetchPolicy: "network-only",
  //   refetchWritePolicy: "merge",

    
  // })
  const { data: card_, refetch: refetchCard } = useQuery<CardData>(FIND_UNIQUE_CARD_IN_HISTORY_COMPONENT1, {
    variables: { id: card?.id },
    skip: card === undefined,
  })
  
  const [deleteOneHistoryMovement] = useMutation(DELETE_ONE_HISTORY_MOVEMENT)

  const movements = aggregateUniqueOrderMovementCard({ card: card_?.findUniqueCardInHistoryComponent, showAll: true })

  const [reverse, setReverse] = useState<boolean>(false)


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <button
        onClick={() => setReverse(!reverse)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.5rem",
          border: "none",
          backgroundColor: "transparent",
          transition: "all 0.2s ease-in-out",
          gap: "1rem",
          padding: "0.5rem",
          width: "fit-content",
          height: "2rem",
        }}
        title='Inverter ordem de exibição'
      >
        <ArrowSwapVertical
          style={{
            transform: reverse ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.2s ease-in-out",
            color: "#7841B0",
            width: "1rem",
            height: "1rem",
          }}
        />
        <p>
          {reverse ? "Ordenando do mais antigo para o mais recente" : "Ordenando do mais recente para o mais antigo"}
        </p>
      </button>

      {reverse &&
        card_ &&
        movements
          ?.map((item) => (
            <Container key={item.id}>
              <div>
                <p>
                  De <strong>{item.fromColumn.title}</strong> Para : <strong>{item.toColumn.title} </strong>
                </p>
              </div>
              <MovedBy>
                <span>
                  Por:
                  <h4>{item.user?.name ?? ""} </h4>
                </span>
                <Image src={item.user?.avatarUrl ?? ""} alt='' width={100} height={100} />
              </MovedBy>
              <div>{utils.formatDateWithTimeZone(item.createdAt)}</div>

              <FieldComponent card={card_?.findUniqueCardInHistoryComponent} movement={item} refetch={refetchCard} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "1rem",
                  overflow: "auto",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                {cardAssignments?.map((assignment: any) => (
                  <Image
                    src={assignment.user?.avatarUrl ?? ""}
                    alt={assignment.user?.nickName ?? ""}
                    title={`O usuário ${assignment.user?.nickName ?? ""} foi atribuido a este card como responsável`}
                    width={180}
                    height={180}
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #7841B0",
                      cursor: "pointer",
                      width: "2.5rem",
                      height: "2.5rem",
                      objectFit: "cover",
                    }}
                    key={assignment.user?.nickName ?? ""}
                  />
                ))}
              </div>
            </Container>
          ))
          .reverse()}
      {!reverse &&
        card_ &&
        movements?.map((item) => (
          <Container key={item.id} style={{ marginTop: "1rem" , position: "relative"}}> 
          {userRoot && (
            <button
              style={{
                position: "absolute",
                right: "0",
                top: "0.5rem",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor: "transparent",
                transition: "all 0.2s ease-in-out",
              
              }}
            >
              <Trash
                style={{
                  color: "#7841B0",
                  width: "1rem",
                  height: "1rem",
                }}
                onClick={() => {
                    
                  Swal.fire({
                      title: "Tem certeza que deseja excluir este histórico?",
                      text: "Você não poderá reverter esta ação!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#7841B0",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Sim, excluir!",
                      cancelButtonText: "Cancelar",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          await deleteOneHistoryMovement({ variables: { id: item.id } })
                           await refetchCard()
                          Swal.fire("Excluído!", "O histórico foi excluído com sucesso.", "success")
                        } catch (error) {
                          Swal.fire("Erro!", "O histórico não foi excluído.", "error")
                        }
                      }
                    })
                }}

              />
            </button>
          )}
            <div>
              <p>
                De <strong>{item.fromColumn.title}</strong> Para : <strong>{item.toColumn.title} </strong>
              </p>
            </div>
            <MovedBy>
              <span>
                Por:
                <h4>{item.user?.name ?? ""} </h4>
              </span>
              <Image src={item.user?.avatarUrl ?? ""} alt='' width={100} height={100} />
            </MovedBy>
            <div>{utils.formatDateWithTimeZone(item.createdAt)}</div>
            {/* <div>{format(new Date(item.createdAt), "PPP", { locale: ptBR })}</div> */}

              <FieldComponent card={card_?.findUniqueCardInHistoryComponent} movement={item} refetch={refetchCard} />
                
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "1rem",
                overflow: "auto",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              {cardAssignments?.map((assignment: any) => (
                <Image
                  src={assignment.user?.avatarUrl ?? ""}
                  alt={assignment.user?.nickName ?? ""}
                  title={`O usuário ${assignment.user?.nickName ?? ""} foi atribuído a este card como responsável`}
                  width={180}
                  height={180}
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #7841B0",
                    cursor: "pointer",
                    width: "2.5rem",
                    height: "2.5rem",
                    objectFit: "cover",
                  }}
                  key={assignment.user?.nickName ?? ""}
                />
              ))}
            </div>
          </Container>
        ))}
    </div>
  )
}

const FieldComponent = ({ card, refetch, movement }: { card: Card; refetch: Function; movement: CardMovement }) => {
  const [show, setShow] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  const content: Card = movement.content
  const fields = content?.column?.fieldValue?.map((field) => field.fieldColumn)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "1rem",
        width: "100%",
        transition: "all 0.2s ease-in-out",
        position: "relative",
      }}
    >
      <button
        onClick={() => setDisabled((prev) => !prev)}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          justifyContent: "center",
          alignItems: "center",
          display: fields && fields.length > 0 ? "flex" : "none",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          border: "none",
          backgroundColor: "transparent",
          transition: "all 0.2s ease-in-out",
        }}
        title={disabled ? "Habilitar edição" : "Desabilitar edição"}
      >
        {disabled ? (
          <Edit2
            style={{
              color: "#7841B0",
              width: ".75rem",
              height: ".75rem",
            }}
          />
        ) : (
          <Edit
            style={{
              color: "#7841B0",
              width: ".75rem",
              height: ".75rem",
            }}
          />
        )}
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          gap: "1.5rem",
          transition: "all 0.2s ease-in-out",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={() => {
            if (fields && fields.length > 0) setShow(!show)
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: "transparent",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <ArrowDown2
            style={{
              transform: show ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 0.2s ease-in-out",
              color: "#7841B0",
              width: "1rem",
              height: "1rem",
            }}
          />
        </button>
      </div>
      {show &&
        fields &&
        fields.map((field) => (
            <ChooseFieldComponent
              key={field.id}
              actualCard={card}
              field={field}
              card={content}
              disabled={disabled}
              refetch={refetch}
              movement={movement}
            />
          ))}

      {show && !fields && <p>Nenhum histórico encontrado</p>}
    </div>
  )
}
