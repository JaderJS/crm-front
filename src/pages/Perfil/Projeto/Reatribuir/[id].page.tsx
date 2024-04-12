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
import { GetServerSideProps } from "next"
import Router from "next/router"
import { toast } from "react-toastify"

const FIND_MANY_TEAMS_IN_REASSIGNMENT_ATTRIBUTION = gql`
  query findManyTeamsReassignmentAttribution {
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

const CREATE_ONE_MANY_INVESTS_IN_CLIENT_ATTRIBUTION = gql`
  mutation createOneManyInvestsInReassignmentAttribution($content: [InvestCreateManyInput!]!) {
    createManyInvest(data: $content, skipDuplicates:true) {
      count
    }
  }
`

const FIND_MANY_CLIENTS_IN_CLIENT_ATTRIBUTION = gql`
  query findManyClientsInReassignmentAttribution {
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



const UPDATE_ONE_PROJECT_IN_CLIENT_ATTRIBUTION = gql`
mutation updateOneProjectInReassignmentAttribution($id:Int!, $update:ProjectUncheckedUpdateInput!){
  updateOneProject(data: $update, where: {id:$id}) {
    id 
  }
}
`

const DELETE_ONE_RECEIVED_CLIENT_IN_REASSIGNMENT_ATTRIBUTION = gql`
  mutation deleteOneReceivedClientInReassignmentAttribution($id: Int!) {
    deleteOneReceivedClient(where: { id: $id }) {
      id
    }
  }
`

const DELETE_MANY_INVESTS_TO_PROJECT_IN_REASSIGNMENT_ATTRIBUTION = gql`
mutation deleteManyInvestsToProjectInReassignmentAttribution($where:InvestWhereInput!){
  deleteManyInvest(where:$where){
    count
  }
}
`

const FIND_UNIQUE_PROJECT_IN_REASSIGNMENT_ATTRIBUTION = gql`
  query findUniqueProjectInReassignmentAttribution($id: Int!) {
    project(where: {id:$id}) {
      id
      clientId
      name
      content
      enable
      city
      fantasyName
      initialDateContract
      state
      address
      profileUrl
      createdBy
      client {
        id
        user {
          uuid
          name
          avatarUrl
        }
      }
      invest {
        id
        user {
          uuid
          name
          avatarUrl
        }
      }
      updatedBy
    }
  }
`

const CENTRAL_DE_PROJETOS_BOARD_CUID = ""

interface InvestorData {
  uuid: string
  name: string
  thumbUrl: string
}

interface ClientsData {
  clients: Client[]
}

interface ProjectData {
  project: Project
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  return {
    props: {
      params,
    },
  }
}


export default function Reassignment({ params }: { params: { id: string } }) {

  const { uuid } = useContext(UserContext)

  const [selectedProject, setSelectedProject] = useState<SignatureProjectSchema | undefined>(undefined)
  const [receivedClients, setReceivedClients] = useState<ReceivedClient[]>()
  const [investors, setInvestors] = useState<InvestorData[]>([])

  const { data: project, loading } = useQuery<ProjectData>(FIND_UNIQUE_PROJECT_IN_REASSIGNMENT_ATTRIBUTION, {
    variables: { id: Number(params.id) },
    skip: params.id === undefined,
    onCompleted: (response) => {

      const { id, name, city, fantasyName, cnpj, content, address } = response.project
      setInvestors(() => response.project.invest.map((invest) => ({ uuid: invest.user.uuid, name: invest.user.name, thumbUrl: invest.user.avatarUrl })))

      setReceivedClients(() => [{
        id: id,
        name: name,
        address: address,
        city: city,
        cnpj: cnpj,
        content: {},
        fantasyName: name,
        state: address,
        copies: response.project?.content?.copies ?? 0,
        designs: response.project?.content?.designs ?? 0,
        emails: response.project?.content?.emails ?? 0,
        fee: response.project?.content?.fee ?? 0,
        bis: response.project?.content?.bis ?? 0,
        lps: response.project?.content?.lps ?? 0,
        movies: response.project?.content?.movies ?? 0,
        mrr: response.project?.content?.mrr ?? 0,
        createdAt: new Date().toISOString(),
        initialDateContract: new Date().toISOString(),
        updatedAt: response.project.updatedAt ?? new Date(),
      }])


    }
  })
  const { data: teamsQuery, refetch: refetchTeam } = useQuery(FIND_MANY_TEAMS_IN_REASSIGNMENT_ATTRIBUTION)
  const { data: clients, refetch: refetchClients } = useQuery<ClientsData>(FIND_MANY_CLIENTS_IN_CLIENT_ATTRIBUTION, { fetchPolicy: "network-only" })

  const [createManyInvests] = useMutation(CREATE_ONE_MANY_INVESTS_IN_CLIENT_ATTRIBUTION)
  const [updateOneProject] = useMutation(UPDATE_ONE_PROJECT_IN_CLIENT_ATTRIBUTION)
  const [deleteManyInvest] = useMutation(DELETE_MANY_INVESTS_TO_PROJECT_IN_REASSIGNMENT_ATTRIBUTION)
  const [deleteOneReceivedClient] = useMutation(DELETE_ONE_RECEIVED_CLIENT_IN_REASSIGNMENT_ATTRIBUTION)

  const [openCardId, setOpenCardId] = useState<number | null>(null)
  const [showSquads, setShowSquads] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmitProject = async (selectedInvestors: InvestorData[], project?: SignatureProjectSchema) => {

    if (!project) {
      toast.error("Verifique a seleção do projeto e tente novamente!")
      return
    }

    try {

      updateOneProject({
        variables: {
          id: project.id,
          update: {
            updatedBy: { set: uuid }
          }
        }
      }).then(async (response) => {

        await deleteManyInvest({
          variables: {
            where: {
              projectId: { equals: response.data.updateOneProject.id }
            }
          }
        })

        const manyInvests = selectedInvestors.map((user) => {
          return { userUuid: user.uuid, projectId: Number(response.data.updateOneProject.id) }
        })

        createManyInvests({ variables: { content: manyInvests } })
        Router.push(`/Perfil/Projeto/${project.id}`)

      })

    } catch (error) {
      toast.error("Erro ao editar projeto")
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

  if (!project?.project) {
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

          {receivedClients?.map((project) => (
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
              
            />
          ))}
        </LeftSide>

        <RightSide>

          {selectedProject && scoredTeams?.map((team) => (
            <div style={{ transition: "opacity 0.5s ease-in-out", display: showSquads ? "block" : "none", width: "100%" }} key={team.team.id}>
              <SquadCard
                id={team.team.id}
                score={team.score}
                selectedProject={selectedProject}
                team={team.team}
                onSubmit={(data) => {
                  setIsDialogOpen(true)
                  handleSubmitProject(investors, selectedProject)
                }}
                invertors={investors}
                onInvestorsUpdate={(investors) => handleInvestors(investors)}
              />
            </div>

          ))}
        </RightSide>
      </div>

      {/* {clients?.clients &&
        <DialogSelectedComponent
          clients={clients.clients}
          onSubmit={(client) => }
          show={isDialogOpen}
          setShow={setIsDialogOpen} />
      } */}

    </Container>
  )
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


