import { gql, useQuery, useMutation, useSubscription } from "@apollo/client"
import { Container } from "./styles"
import { BoardComponent } from "@/components/BoardComponents/Board"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useRef, useState } from "react"
import { BoardMenu } from "@/components/BoardComponents/BoardMenu"
import { Board as BoardTypes } from "@/types"
import { GetServerSideProps } from "next"
import { UserContext } from "@/contexts/UserContext"
import Swal, { SweetAlertIcon } from "sweetalert2"
import Skeleton from "react-loading-skeleton"
import Head from "next/head"
import { toast } from "react-toastify"
import { LoadingBoard } from "@/components/LoadingBoard"

const UPDATE_COLUMN_IN_BOARD = gql`
  mutation updateKanbanInBoard($InputColumn:InputColumn!) {
    updateKanban(data: $InputColumn) {
      _count
    }
  }
`

// const EVENT_USER_UPDATE_KANBAN = gql`
//   subscription eventUserUpdateKanbanInBoard {
//     eventUserUpdateKanban {
//       uuid
//       message
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

export default function Board({ params }: { params: { id: string } }) {
  const { uuid } = useContext(UserContext)
  const [data, setData] = useState<BoardTypes | null>(null)
  // const { data: subscriptionData } = useSubscription(EVENT_USER_UPDATE_KANBAN)

  const [refetch, setRefetch] = useState(false)

  // useEffect(() => {
  //   if (subscriptionData) {
  //     const subscriptionUuid = subscriptionData.eventUserUpdateKanban.uuid
  //     if (subscriptionUuid !== uuid) {
  //       showToast({ title: subscriptionData.eventUserUpdateKanban.message, icon: "warning" })
  //     }
  //   }
  // }, [subscriptionData, uuid])

  const [updateColumn] = useMutation(UPDATE_COLUMN_IN_BOARD)

  const handleCardMove = async ({ destinationColumnCopy }: any) => {
    // console.log("destinationColumnCopy", destinationColumnCopy)
    try {
      const inputColumn = {
        updatedBy: uuid,
        boardId: params.id,
        id: destinationColumnCopy.id,
        card: destinationColumnCopy.card.map(({ id, order }: any) => ({
          id: id.toString(),
          order,
        })),
      }
      updateColumn({
        variables: { InputColumn: inputColumn },
      })

      toast.success("Movido com sucesso", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } catch (error: any) {
      console.error(error)
      const errorMessage = error.message.replace("GraphQL error:", "")
      showToast({ title: errorMessage, icon: "error" })
    }
  }

  const [loading, setLoading] = useState(true)
  return (
    <div style={{ padding: "1rem 1rem" }}>
      <Head>
        <title>{data?.title ? `${data.title}` : ""}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={`Board ${data?.title}`} />
        <meta property='description' content={`Board ${data?.title}`} />
      </Head>

      <BoardMenu
        setData={setData}
        boardId={params.id}
        refetch={refetch}
        loadingFromMenu={(loading: boolean) => setLoading(loading)}
      />

      {data && (
        <Container>
          {data && (
            <BoardComponent
              data={data as any}
              onCardMove={handleCardMove}
              refetch={() => setRefetch((prev) => !prev)}
            />
          )}
        </Container>
      )}
      {loading && <LoadingBoard />}
    </div>
  )
}

const showToast = ({ title, icon }: { title: string; icon: SweetAlertIcon }) => {
  Swal.fire({
    toast: true,
    position: "bottom-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer)
      toast.addEventListener("mouseleave", Swal.resumeTimer)
    },
  })
}
