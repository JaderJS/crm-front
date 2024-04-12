import { Board } from "@/types"
import { gql, useMutation, useQuery } from "@apollo/client"
import Link from "next/link"
import { TableHeader, Tbody2 } from "./styles"
import Swal from "sweetalert2"
import { Container } from "./styles"
import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { Utils } from "@/utils/utils"
import Router from "next/dist/client/router"
import { DefaultButton } from "@/components/DefaultButton"
import { ArrowCircleRight, Edit, Trash, Watch } from "iconsax-react"
const utils = new Utils()

const FIND_MANY_BOARDS_IN_BOARDS = gql`
  query findManyBoardsInBoards {
    boards {
      id
      title
      isPublic
      createdAt
      updatedAt
      createdByUser {
        name
        avatarUrl
      }
    }
  }
`

const DELETE_ONE_BOARD_IN_BOARDS = gql`
  mutation deleteOneBoardInBoards($id: String!) {
    deleteOneBoard(where: { id: $id }) {
      id
    }
  }
`

interface boardsData {
  boards: Board[]
}

const Boards = () => {
  const { data: boards, refetch: refetchBoards } = useQuery<boardsData>(FIND_MANY_BOARDS_IN_BOARDS)
  const [deleteOneBoard] = useMutation(DELETE_ONE_BOARD_IN_BOARDS)

  return (
    <Container>
      <MenuHistoryPaths items={[{ path: "/Boards", name: "Boards" }]}
        loading={!boards}
      />

      <Table
        style={{
          textAlign: "left",
          borderCollapse: "collapse",
          borderSpacing: 0,
          width: "100%",

          height: "80%",
          borderRadius: "1.875rem 1.875rem 0rem 0rem",
          overflow: "hidden",
        }}
      >
        <TableHeader>
          <Tr>
            <Th>#</Th>
            <Th>Nome do Kanban</Th>
            <Th>Publico?</Th>
            <Th>ultima atualização</Th>
            <Th>Criado por</Th>
            <Th>
              <DefaultButton
                onClick={() => Router.push("/Board/CreateBoard")}
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                }}
              >
                Novo Board
              </DefaultButton>
            </Th>
          </Tr>
        </TableHeader>

        <Tbody2>
          {!boards && <p>Sem Boards registrados</p>}
          {boards?.boards.map((board: Board, index: number) => (
            <Tr key={board.id}>
              <Td>{index}</Td>
              <Td>{board.title}</Td>
              <Td>{board.isPublic ? <span>Sim</span> : <span>Nao</span>}</Td>
              <Td>{utils.formatDateWithTimeZone(board.updatedAt)}</Td>
              <Td>{board.createdByUser?.name ?? <span>Desconhecido</span>}</Td>
              <Td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Link href={`/Board/Edit/${board.id}`}>
                    <DefaultButton
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                      }}
                      title='Editar'
                    >
                      <Edit
                        style={{
                          color: "#fff",
                          width: "1.25rem",
                          height: "1.25rem",
                        }}
                      />
                    </DefaultButton>
                  </Link>
                  <Link href={`/Board/${board.id}`}>
                    <DefaultButton
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                      }}
                      title='Visualizar'
                    >
                      <ArrowCircleRight
                        style={{
                          color: "#fff",
                          width: "1.25rem",
                          height: "1.25rem",
                        }}
                      />
                    </DefaultButton>
                  </Link>
                  <DefaultButton
                    onClick={() =>
                      deleteBoardPopUpConfirm({
                        deleteFunc: () => {
                          deleteOneBoard({ variables: { id: board.id } }).then(() => refetchBoards())
                        },
                      })
                    }
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: "#DC2424",
                    }}
                    title='Deletar'
                  >
                    <Trash
                      style={{
                        color: "#fff",
                        width: "1.25rem",
                        height: "1.25rem",
                      }}
                    />
                  </DefaultButton>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody2>
      </Table>
    </Container>
  )
}

const deleteBoardPopUpConfirm = async ({ deleteFunc }: { deleteFunc: Function }) => {
  Swal.fire({
    icon: "warning",
    title: "Tem certeza que deseja deletar o board",
    text: "Todos os dados relacionados serão perdidos",
    showCancelButton: true,
    confirmButtonText: "Deletar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteFunc()
    }
  })
}

export default Boards
