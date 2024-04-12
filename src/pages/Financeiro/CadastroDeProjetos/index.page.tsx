import { gql, useQuery, useMutation, useSubscription } from "@apollo/client"
import { Container } from "./styles"
import { BoardComponent } from "@/components/BoardComponents/Board"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import { useToast } from "@/contexts/ToastContext"
import { BoardMenu } from "@/components/BoardComponents/BoardMenu"
import { Board as BoardTypes } from "@/types"

interface Column {
  id: number
  title: string
  order: number
  card: Card[]
}
interface Card {
  id: number
  name: string
  description: string
  order: number
}

const UPDATE_COLUMN = gql`
  mutation updateKanban($InputColumn: InputColumn!) {
    updateKanban(data: $InputColumn) {
      _count
    }
  }
`

const EVENT_USER_UPDATE_KANBAN = gql`
  subscription eventUserUpdateKanban {
    eventUserUpdateKanban {
      uuid
      message
    }
  }
`

export default function Financeiro() {
  const { showSuccessToast, showErrorToast, showWarningToast } = useToast()

  const [data, setData] = useState<BoardTypes>()

  const { uuid } = useContext(AuthContext)

  const { data: subscriptionData } = useSubscription(EVENT_USER_UPDATE_KANBAN)

  useEffect(() => {
    if (subscriptionData) {
      const subscriptionUuid = subscriptionData.eventUserUpdateKanban.uuid
      if (subscriptionUuid !== uuid) {
        showWarningToast(subscriptionData.eventUserUpdateKanban.message)
      }
    }
  }, [subscriptionData, uuid])

  const [updateColumn] = useMutation(UPDATE_COLUMN)
  const handleCardMove = async ({ destinationColumnCopy }: any) => {
    try {
      const inputColumn = {
        updatedBy: uuid,
        id: destinationColumnCopy.id,
        card: destinationColumnCopy.card.map(({ id, order }: any) => ({
          id,
          order,
        })),
      }
      const response = await updateColumn({
        variables: { InputColumn: inputColumn },
      })

      if (response.data) {
        showSuccessToast("ok")
      }
    } catch (error: any) {
      console.error("Erro na mutação:", error)
      const errorMessage = error.message.replace("GraphQL error:", "")
      showErrorToast(errorMessage)
    }
  }

  return (
    <Container>
      {/* <BoardMenu setData={setData} id={1} />
      {!data ? <p>Carregando...</p> : data && <BoardComponent data={data as any} onCardMove={handleCardMove} />} */}
    </Container>
  )
}
