import { useContext, useEffect, useState } from "react"
import { ClientCard as ProjectCard, SignatureProjectSchema } from "@/components/AtribuiçãoComponents/ProjectCard"
import { Container, DialogContainer, LeftSide, RightSide } from "./styles"
import { SquadCard } from "@/components/AtribuiçãoComponents/Squad"
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { Utils } from "@/utils/utils"
import { Client, Project, ReceivedClient } from "@/types"
import { AuthContext } from "@/contexts/AuthContext"
import Swal, { SweetAlertIcon } from "sweetalert2"
import { scoreTeam } from "@/utils/strengthWorkUser"
import { UserContext } from "@/contexts/UserContext"
import { DialogSelectedComponent } from "./selectedClient"
import { createOneCardInInitialColumn } from "@/myHooks/Card/card"

const FIND_MANY_TEAMS_IN_CLIENT_ATTRIBUTION = gql`
  query findManyTeamsCLientAttribution {
    teams {
      id
      name
      thumbUrl
      userTeam {
        team {
          id
          name
        }
        user {
          uuid
          name
          invest {
            id
          }
        }
      }
      _count {
        userTeam
      }
    }
  }
`

const FIND_MANY_RECEIVED_CLIENTS_IN_CLIENT_ATTRIBUTION = gql`
  query findManyReceivedCLientsInClientAttribution($id: Int) {
    receivedClients(where: { id: { equals: $id } }) {
      id
      content
      mrr
      lps
      designs
      movies
      bis
      emails
      copies
      name
      cnpj
      fantasyName
      initialDateContract
      city
      state
      address
      fee
      createdAt
    }
  }
`

const CREATE_ONE_MANY_INVESTS_IN_CLIENT_ATTRIBUTION = gql`
  mutation createOneManyInvests($content: [InvestCreateManyInput!]!) {
    createManyInvest(data: $content) {
      count
    }
  }
`

const FIND_MANY_CLIENTS_IN_CLIENT_ATTRIBUTION = gql`
  query findManyClientsInClientAttribution {
    clients {
      id
      cnpj
      project {
        id
      }
      user {
        name
      }
    }
  }
`

const UPSERT_ONE_PROJECT_IN_CLIENT_ATTRIBUTION = gql`
  mutation createOneProjectInClientAttribution(
    $id: Int
    $create: ProjectUncheckedCreateInput!
    $update: ProjectUncheckedUpdateInput!
  ) {
    upsertOneProject(where: { id: $id }, create: $create, update: $update) {
      id
      name
      invest {
        id
        user {
          uuid
          userTeam {
            teamId
            team {
              name
              id
            }
          }
        }
      }
    }
  }
`

const FIND_MANY_USER_IN_PROJECT = gql`
  query FindManyUserInProject($id: Int!) {
    project(where: { id: $id }) {
      id
      name
      invest {
        id
        user {
          uuid
          userTeam {
            teamId
            team {
              id
              name
            }
          }
        }
      }
    }
  }
`

interface FindManyUserInProjectData {
  project: Project
}

const DELETE_ONE_RECEIVED_CLIENT = gql`
  mutation deleteOneReceivedClient($id: Int!) {
    deleteOneReceivedClient(where: { id: $id }) {
      id
    }
  }
`

const DELETE_ONE_PROJECT = gql`
mutation deleteOneProject($id: Int!) {
  deleteOneProject(where: { id: $id }) {
    id
  }}
`

const CENTRAL_DE_PROJETOS_BOARD_CUID = process.env.BOARD_CENTRAL_DE_PROJETOS

interface InvestorData {
  uuid: string
  name: string
  thumbUrl: string
}

interface ReceiveClientsData {
  receivedClients: ReceivedClient[]
}

interface ClientsData {
  clients: Client[]
}

export default function AtribuicaoDeClientes() {
  const { uuid } = useContext(UserContext)

  const {
    data: receivedClients,
    loading,
    refetch: refetchReceivedClient,
  } = useQuery<ReceiveClientsData>(FIND_MANY_RECEIVED_CLIENTS_IN_CLIENT_ATTRIBUTION, {
    fetchPolicy: "network-only",
  })
  const { data: teamsQuery, refetch: refetchTeam,loading: loadingTeams } = useQuery(FIND_MANY_TEAMS_IN_CLIENT_ATTRIBUTION, {
    fetchPolicy: "cache-and-network",
    
  })
  const { data: clients, refetch: refetchClients } = useQuery<ClientsData>(FIND_MANY_CLIENTS_IN_CLIENT_ATTRIBUTION, {
    fetchPolicy: "network-only",
  })

  const [fetchProject] = useLazyQuery<FindManyUserInProjectData>(FIND_MANY_USER_IN_PROJECT, {
    fetchPolicy: "cache-and-network",
  })

  const [deleteOneProject] = useMutation(DELETE_ONE_PROJECT)

  const [createManyInvests] = useMutation(CREATE_ONE_MANY_INVESTS_IN_CLIENT_ATTRIBUTION)
  const [upsertOneProject] = useMutation(UPSERT_ONE_PROJECT_IN_CLIENT_ATTRIBUTION)
  const [deleteOneReceivedClient] = useMutation(DELETE_ONE_RECEIVED_CLIENT)

  const [openCardId, setOpenCardId] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<SignatureProjectSchema | undefined>(undefined)
  const [investors, setInvestors] = useState<InvestorData[]>([])
  const [showSquads, setShowSquads] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  const handleSubmitProject = async (
    selectedInvestors: InvestorData[],
    project?: SignatureProjectSchema,
    receivedClientId?: Client,
  ) => {
    if (!CENTRAL_DE_PROJETOS_BOARD_CUID) return
    if (!project) {
      toastComponent({ title: "Verifique a seleção do projeto e tente novamente!" })
      return
    }
    if (!receivedClientId) {
      toastComponent({ title: "Verifique a seleção do cliente e tente novamente!" })
      return
    }
    try {
      upsertOneProject({
        variables: {
          id: 0,
          create: {
            address: project.city,
            name: project.title,
            fantasyName: project.title,
            initialDateContract: new Date(),
            state: project.city,
            city: project.city,
            clientId: receivedClientId.id,
            historyMonthlyRecurringRevenue: {
              create: { revenue: project.fee },
            },
            HistoryFlag: {
              create: { flag: "ONBOARDING" },
            },
            cnpj: "",
            createdBy: uuid,
            updatedBy: uuid,
            content: {
              ...project,
            },
          },
          update: {},
        },
      }).then((response) => {
        const manyInvests = selectedInvestors.map((user) => {
          return { userUuid: user.uuid, projectId: Number(response.data.upsertOneProject.id) }
        })
        createManyInvests({ variables: { content: manyInvests } })
        deleteOneReceivedClient({ variables: { id: Number(project.id) } })
        refetchTeam()
        refetchReceivedClient()
        refetchClients()

        fetchProject({ variables: { id: response.data.upsertOneProject.id } })
          .then((response) => {
            if (!response?.data?.project) return

            const teamNames = Array.from((new Set(response.data.project.invest.map((invest) => invest.user.userTeam[0].team.name))))
            createOneCardInInitialColumn({
              args: {
                order: 0,
                description: "INTEGRADOR",
                name: response.data.project.name,
                cardTags: {
                  create: teamNames.map((name) => ({
                    tag: {
                      connectOrCreate: {
                        where: { id: 0 },
                        create: { boardId: CENTRAL_DE_PROJETOS_BOARD_CUID, color: "#7841B0", title: name },
                      },
                    },
                  })),
                },
              },
              boardId: CENTRAL_DE_PROJETOS_BOARD_CUID,
            }).then(() => {
              toastComponent({ title: "Projeto atribuído com sucesso a central de projetos!", icon: "success" })
            })
          })
          .catch((error) => {
            console.error(error)
          })
      })
    } catch (error) {
      toastComponent({ title: "Erro ao atribuir projeto", icon: "error" })
      console.error(error)
    } finally {
      setShowSquads(false)
      setInvestors([])
    }
  }

  const toggleCard = (clientId: number) => {
    if (openCardId === clientId) {
      setOpenCardId(null)
    } else {
      setOpenCardId(clientId)
    }
  }

  const handleInvestors = (investors: InvestorData) => {
    setInvestors((prev) => {
      const assigned = prev.some((invest) => invest.uuid === investors.uuid)
      if (assigned) {
        return prev.filter((invest) => invest.uuid !== investors.uuid)
      }
      return prev.concat(investors)
    })
  }

  const scoredTeams = scoreTeam(teamsQuery?.teams)

  if (loading) {
    return <></>
  }

  if (receivedClients?.receivedClients.length === 0) {
    return <NotReceivedProjects />
  }

  return (
    <Container>
      <h2>Atribuição de Clientes</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <LeftSide>
          {receivedClients?.receivedClients.map((project) => (
            console.log(project),
            <ProjectCard
              project={project}
              key={project.id}
              isOpen={openCardId === project.id}
              toggleCard={() => toggleCard(project.id)}
              attribution={(data) => {
                setSelectedProject(data)
                refetchClients()
                setShowSquads(true)
              }}
              cancel={() => {
                setShowSquads(false)
                setInvestors([])
              }}
              onClientDeleteClick={async() => {
                await Swal.fire({
                  title: `Deseja deletar o projeto ${project.name}?`,
                  showCancelButton: true,
                  confirmButtonText: "Sim",
                  cancelButtonText: "Não",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteOneReceivedClient({ variables: { id: project.id } }).then(() => {
                      refetchTeam()
                      refetchReceivedClient()
                      refetchClients()
              
                      toastComponent({ title: "Projeto deletado com sucesso!", icon: "success" })
                    })
                  }
                })
              }}
            />
          ))}
        </LeftSide>

        <RightSide>
          {selectedProject && !loadingTeams &&
            scoredTeams?.map((team) => (
              <div
                style={{
                  transition: "opacity 0.5s ease-in-out",
                  display: showSquads ? "block" : "none",
                  width: "100%",
                }}
                key={team.team.id}
              >
                <SquadCard
                  id={team.team.id}
                  score={team.score}
                  selectedProject={selectedProject}
                  team={team.team}
                  onSubmit={(data) => {
                    setIsDialogOpen(true)
                  }}
                  invertors={investors}
                  onInvestorsUpdate={(investors) => handleInvestors(investors)}
                />
              </div>
            ))}
            {loadingTeams && <h1>Carregando...</h1>}
        </RightSide>
      </div>

      {clients?.clients && (
        <DialogSelectedComponent
          clients={clients.clients}
          onSubmit={(client) => handleSubmitProject(investors, selectedProject, client)}
          show={isDialogOpen}
          setShow={setIsDialogOpen}
        />
      )}
    </Container>
  )
}

const toastComponent = ({ title, icon = "success" }: { title: string; icon?: SweetAlertIcon }) => {
  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  }).fire({ icon, title: title })
}

const NotReceivedProjects = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <h1>Não existem projetos a serem atribuídos</h1>
      </div>
    </>
  )
}
