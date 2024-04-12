import {
  BodyCompanyName,
  BodyFlag,
  BodyLifeTime,
  BodyStep,
  ButtonFilter,
  CompanyName,
  Container,
  Flag1,
  GoToProject,
  LifeTime,
  Projects,
  SecondInfos,
  Step,
  TableContainer,
  TableHeader,
  Tbody,
  UserInfo,
  UserInfoContainer,
  VerticalLine,
} from "./styles"
import { gql, useMutation, useQuery } from "@apollo/client"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import {
  ArrowCircleRight,
  ArrowRight,
  ArrowSwapVertical,
  Calendar1,
  Flag,
  SearchNormal,
  Shop,
  Solana,
} from "iconsax-react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import Link from "next/link"
import { Project } from "@/types"
import { Utils } from "@/utils/utils"
import { DefaultInputs } from "@/components/DefaultInputs"
import { DefaultButton } from "@/components/DefaultButton"
import { PopUpSelectInfos } from "@/components/projectPageComponents/PopUpSelectInfos"
import { UserContext } from "@/contexts/UserContext"

const utils = new Utils()

const FIND_MANY_PROJECTS_IN_PROJECTSPAGE = gql`
  query findManyProjectsInProjectsPage {
    projects(where: { enable: { equals: true } }) {
      id
      name
      createdAt
      enable
      historyMonthlyRecurringRevenue(orderBy: { transitionAt: asc }) {
        id
        revenue
        createdAt
        transitionAt
      }
      historyStep(orderBy: { transitionAt: desc }) {
        id
        step
        createdAt
        transitionAt
      }
      HistoryFlag(orderBy: { transitionAt: desc }) {
        id
        flag
        createdAt
        transitionAt
      }
      city
      state
      cnpj
      fantasyName

      invest {
        user {
          userTeam {
            team {
              name
            }
          }
        }
      }
    }
  }
`

const FIND_ONE_PROJECT_SELECTINFOS_IN_PROJECTS_PAGE = gql`
  query findOneProjectSelectInfosInProjectsPage($id: Int!) {
    project(where: { id: $id }) {
      createdAt
      historyStep(orderBy: { transitionAt: desc }, take: 3) {
        id
        step
        createdAt
        transitionAt
      }
      HistoryFlag(orderBy: { transitionAt: desc }, take: 3) {
        id
        flag
        createdAt
        transitionAt
      }
      historyMonthlyRecurringRevenue(orderBy: { transitionAt: desc }, take: 3) {
        id
        revenue
        createdAt
        transitionAt
      }
    }
  }
`
const CREATE_ONE_HISTORY_FLAG_SELECTINFOS_IN_PROJECTS_PAGE = gql`
  mutation createOneHistoryFlagSelectInfosProjectsPage(
    $projectId: Int!
    $flag: FieldFlags!
    $transitionAt: DateTimeISO!
  ) {
    createOneHistoryFlag(data: { projectId: $projectId, flag: $flag, transitionAt: $transitionAt }) {
      id
    }
  }
`

const CREATE_ONE_HISTORY_STEP_SELECTINFOS_IN_PROJECTS_PAGE = gql`
  mutation createOneHistoryFlagStepSelectInfosInProjectsPage(
    $projectId: Int!
    $step: FieldSteps!
    $transitionAt: DateTimeISO!
  ) {
    createOneHistoryStep(data: { projectId: $projectId, step: $step, transitionAt: $transitionAt }) {
      id
    }
  }
`

const CREATE_ONE_HISTORY_MONTHLY_RECURRING_REVENUE_SELECTINFO_IN_PROJECTS_PAGE = gql`
  mutation createOneHistoryMonthlyRecurringRevenueSelectInfosInProjectsPage(
    $projectId: Int!
    $revenue: Float!
    $transitionAt: DateTimeISO!
    $createdBy: String!
  ) {
    createOneHistoryMonthlyRecurringRevenue(
      data: { projectId: $projectId, revenue: $revenue, transitionAt: $transitionAt, createdBy: $createdBy }
    ) {
      id
    }
  }
`

interface ProjectsData {
  projects: Project[]
}

export default function Projetos() {
  const { uuid } = useContext(AuthContext)
  const { userRoot } = useContext(UserContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [orderByField, setOrderByField] = useState<string>("")

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")

  const orderBy = (field: string) => {
    if (orderByField === field) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc")
    } else {
      setOrderByField(field)
      setOrderDirection("asc")
    }
  }

  const {
    data: projects,
    loading,
    refetch,
  } = useQuery<ProjectsData>(FIND_MANY_PROJECTS_IN_PROJECTSPAGE, {
    variables: { uuid: uuid },
    skip: uuid === undefined,
    refetchWritePolicy: "merge",
    fetchPolicy: "cache-and-network",
    partialRefetch: true,
  })

  const filterProjects = (projects: Project[]) => {
    let filteredProjects = projects

    if (searchQuery !== "") {
      filteredProjects = projects.filter(
        (project) =>
          project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.fantasyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.cnpj?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.invest[0]?.user?.userTeam[0]?.team?.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (orderByField) {
      if (orderByField === "name") {
        filteredProjects = [...filteredProjects].sort((a, b) => a.name.localeCompare(b.name))
        if (orderDirection === "desc") {
          filteredProjects = filteredProjects.reverse()
        }
      } else if (orderByField === "lifetime") {
        filteredProjects = [...filteredProjects].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        if (orderDirection === "desc") {
          filteredProjects = filteredProjects.reverse()
        }
      } else if (orderByField === "step") {
        filteredProjects = [...filteredProjects].sort(
          (a, b) => a.historyStep[0]?.step.localeCompare(b.historyStep[0]?.step),
        )
        if (orderDirection === "desc") {
          filteredProjects = filteredProjects.reverse()
        }
      } else if (orderByField === "flag") {
        filteredProjects = [...filteredProjects].sort(
          (a, b) => a.HistoryFlag[0]?.flag.localeCompare(b.HistoryFlag[0]?.flag),
        )
        if (orderDirection === "desc") {
          filteredProjects = filteredProjects.reverse()
        }
      } else if (orderByField === "squad") {
        filteredProjects = [...filteredProjects].sort(
          (a, b) =>
            a.invest[0]?.user?.userTeam[0]?.team?.name.localeCompare(b.invest[0]?.user?.userTeam[0]?.team?.name),
        )
        if (orderDirection === "desc") {
          filteredProjects = filteredProjects.reverse()
        }
      }
    } else if (!orderByField) {
      filteredProjects = [...filteredProjects].sort((a, b) => a.name.localeCompare(b.name))
      if (orderDirection === "desc") {
        filteredProjects = filteredProjects.reverse()
      }
    }

    return filteredProjects
  }
  const [projectId, setSelectedProjectId] = useState<number>()
  const [show, setShow] = useState(false)

  const { data: project, refetch: refetchProject } = useQuery(FIND_ONE_PROJECT_SELECTINFOS_IN_PROJECTS_PAGE, {
    variables: { id: projectId },
    skip: projectId === undefined,
    onCompleted: (data) => {
      setShow(true)
    },
    refetchWritePolicy: "merge",
  })

  const [selectedVariable, setSelectedVariable] = useState<"step" | "flag" | "mrr" | undefined>()

  const [createOneFlag] = useMutation(CREATE_ONE_HISTORY_FLAG_SELECTINFOS_IN_PROJECTS_PAGE)
  const [createOneStep] = useMutation(CREATE_ONE_HISTORY_STEP_SELECTINFOS_IN_PROJECTS_PAGE)
  const [createOneMrr] = useMutation(CREATE_ONE_HISTORY_MONTHLY_RECURRING_REVENUE_SELECTINFO_IN_PROJECTS_PAGE)

  const arrayFlags = project?.project.HistoryFlag ?? []
  const arraySteps = project?.project.historyStep ?? []
  const arrayMrr = project?.project.historyMonthlyRecurringRevenue ?? []
  const createdAt = project?.project.createdAt ?? ""

  const handleCallBack = async ({ data }: { data: any }) => {
    if (!data || !projectId) {
      return
    }
    const { step, flag, mrr, flagTransitionAt, stepTransitionAt, mrrTransitionAt } = data
    try {
      if (flag) {
        createOneFlag({ variables: { projectId: +projectId, flag: flag, transitionAt: flagTransitionAt } })
      }
      if (step) {
        createOneStep({ variables: { projectId: +projectId, step: step, transitionAt: stepTransitionAt } })
      }
      if (mrr) {
        createOneMrr({
          variables: {
            projectId: +projectId,
            revenue: Number.parseFloat(mrr),
            transitionAt: mrrTransitionAt,
            createdBy: uuid,
          },
        })
      }
      setShow(false)
      setSelectedProjectId(undefined)
      setSelectedVariable(undefined)

      await refetchProject()
      // await refetch()
    } catch (error) {
      console.error(error)
      await refetchProject()
    }
  }
  //================================================================

  return (
    <Container>
      {show && projectId && arrayFlags && arraySteps && arrayMrr && (
        <PopUpSelectInfos
          Flag={selectedVariable === "flag" ? true : false}
          Mrr={selectedVariable === "mrr" ? true : false}
          Step={selectedVariable === "step" ? true : false}
          closePopUp={async () => {
            setSelectedProjectId(undefined)
            setSelectedVariable(undefined)
            setShow(false)
          }}
          callBackProjectPage={(data: any) => {
            handleCallBack({ data })
          }}
          callBack={(data: any) => {
            console.log("oi")
          }}
          historyFlags={arrayFlags}
          historySteps={arraySteps}
          historyMrr={arrayMrr}
          userRoot={userRoot}
          refetch={refetchProject}
        />
      )}
      <h2>Projetos da unidade</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
        <DefaultInputs
          focusColor={"red"}
          hover={"red"}
          svgColor={"red"}
          icon={<SearchNormal size='32' variant='Outline' />}
          style={{
            width: "19rem",
            height: "1.85rem",
            gap: "0.5rem",
            borderRadius: "15px",
            border: "1px solid #A1A1A5",
          }}
          input={{
            type: "search",
            placeholder: "Pesquisar",

            onChange: (e: { target: { value: React.SetStateAction<string> } }) => setSearchQuery(e.target.value),
          }}
        />
        <Link href={"/PowerBI"}>
          <DefaultButton>Power BI</DefaultButton>
        </Link>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          <Skeleton
            style={{
              borderRadius: "0.5rem",
              backgroundColor: "#EEE",
              margin: "0.5rem",
              width: "100%",
              height: "1.25rem",
            }}
          />
          <Skeleton
            style={{
              borderRadius: "0.5rem",
              backgroundColor: "#EEE",
              margin: "0.5rem",
              width: "100%",
              height: "1.25rem",
            }}
          />
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
      ) : (
        <TableComponent
          projects={filterProjects(projects?.projects ?? [])}
          orderBy={(order: string) => {
            orderBy(order)
          }}
          refetch={refetch}
          selectedProject={(projectId: number) => {
            setSelectedProjectId(projectId)
          }}
          selectedVariable={(variable: string) => {
            setSelectedVariable(variable as "step" | "flag" | "mrr")
          }}
        />
      )}
    </Container>
  )
}

const TableComponent = ({
  projects,
  orderBy,
  refetch,
  selectedProject,
  selectedVariable,
}: {
  projects?: Project[]
  orderBy: (order: string) => void
  refetch: Function
  selectedProject?: (projectId: number) => void
  selectedVariable?: (variable: string) => void
}) => {
  return (
    <TableContainer>
      <TableHeader>
        <CompanyName
          onClick={() => {
            orderBy("name")
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Shop variant='Outline' /> Nome Empresa
        </CompanyName>
        <LifeTime
          onClick={() => {
            orderBy("lifetime")
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Calendar1 variant='Outline' /> LT
        </LifeTime>
        <Step
          onClick={() => {
            orderBy("step")
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Solana variant='Outline' /> Step
        </Step>
        <Flag1
          onClick={() => {
            orderBy("flag")
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Flag variant='Outline' /> Flag
        </Flag1>
        <Flag1
          onClick={() => {
            orderBy("squad")
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Flag variant='Outline' /> Squad
        </Flag1>
        <Flag1
        // onClick={() => {
        //   orderBy("squad")
        // }}
        // style={{
        //   cursor: "pointer",
        // }}
        >
          MRR R$
        </Flag1>
        <ButtonFilter>
          <ArrowSwapVertical variant='Outline' />
        </ButtonFilter>
      </TableHeader>
      <Tbody>
        {projects?.map((project) => (
          <Projects key={project.id}>
            <BodyCompanyName>
              <p>{project.name.toUpperCase()}</p>
            </BodyCompanyName>
            <BodyLifeTime>
              <p contentEditable>{utils.projectLifeTimeInMonths(project.createdAt)} </p>{" "}
              <span>{utils.projectLifeTimeInMonths(project.createdAt) > 1 ? "meses" : "mês"}</span>
            </BodyLifeTime>
            <BodyStep>
              <p
                onDoubleClick={() => {
                  selectedVariable && selectedVariable("step")
                  selectedProject && selectedProject(project.id)
                  console.log(project.id)
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {project.historyStep[0]?.step ?? "N/A"}
              </p>
            </BodyStep>
            <BodyFlag>
              <p
                onDoubleClick={() => {
                  selectedVariable && selectedVariable("flag")
                  selectedProject && selectedProject(project.id)
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {project.HistoryFlag[0]?.flag ?? "N/A"}
              </p>
            </BodyFlag>
            <BodyFlag>
              <p>
                {project.invest[0]?.user?.userTeam[0]?.team?.name.charAt(0).toUpperCase() +
                  project.invest[0]?.user?.userTeam[0]?.team?.name.slice(1) ?? "N/A"}
              </p>
            </BodyFlag>
            <BodyFlag>
              <p
                onDoubleClick={() => {
                  selectedVariable && selectedVariable("mrr")
                  selectedProject && selectedProject(project.id)
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {utils.formatCurrency(
                  project.historyMonthlyRecurringRevenue[project.historyMonthlyRecurringRevenue.length - 1]?.revenue ??
                    0,
                )}
              </p>
            </BodyFlag>
            <a href={`/Perfil/Projeto/${project.id}`} target='_blank'>
              <GoToProject>
                <p>Ver Projeto</p> <ArrowCircleRight variant='Outline' />
              </GoToProject>
            </a>
          </Projects>
        ))}
      </Tbody>
    </TableContainer>
  )
}
