import { useState, useEffect, useContext, SetStateAction } from "react"
import {
  AtribuidosContainer,
  AtribuirButton,
  Button,
  Capacidade,
  Container,
  ContentContainer,
  EquipeContainer,
  HeaderContainer,
  ImageAndInfo,
  InvesterContainer,
  Margem,
  MmrContainer,
  NameAndFunction,
  ProgressAndButtonContainer,
  Service,
  ServicesContainer,
  SquadInfo,
  SquadInfoContainer,
  SquadName,
  SquadNameAndRecommended,
} from "./styles"
import { CustomProgress } from "@/components/CustomProgress"
import Image from "next/image"
import {
  AddCircle,
  ArrowDown2,
  ArrowRight,
  AttachCircle,
  Copyright,
  PenAdd,
  PlayAdd,
  Star1,
  TickCircle,
  WalletSearch,
} from "iconsax-react"
import { gql, useMutation, useQuery } from "@apollo/client"
import { JobFunction, ReceivedClient, Team, User, UserJobFunction } from "@/types"
import { AuthContext } from "@/contexts/AuthContext"
import { CalcTeam } from "@/utils/team"
import { DefaultButton } from "@/components/DefaultButton"
import Router, { useRouter } from "next/router"
import router from "next/router"
import { SignatureProjectSchema } from "../ProjectCard"
import { formatUser, scoreUserTeam } from "@/utils/strengthWorkUser"

const FIND_MANY_JOB_FUNCTION_IN_SQUAD_CARD = gql`
  query findManyJobFunctionInSquadCard($id: Int!) {
    jobFunctions(
      where: { userJobFunction: { some: { user: { is: { userTeam: { every: { teamId: { equals: $id } } } } } } } }
    ) {
      id
      name
      deliverys
      createdAt
      updatedAt
      userJobFunction {
        weight
        user {
          invest(where: { projectId: { not: null } }) {
            project {
              _count {
                invest
              }
              id
            }
          }
          uuid
          name
          avatarUrl
          userTeam {
            teamId
            team{
              id
            }
          }
        }
      }
    }
  }
`
const FIND_UNIQUE_TEAM_IN_SQUAD_CARD = gql`
query findUniqueTeamInSquadCard($id:Int!){
team(where:{id:$id}) {
  id
  name
  thumbUrl
  updatedAt
  userTeam {
    user {
      uuid
      name
      invest {
        id
      }
      avatarUrl
      userJobFunction {
        weight
        jobFunction {
          id
          deliverys
          name
        }
      }
    }
  }
}
}
`

const FIND_UNIQUE_INVEST_IN_SQUAD_CARD = gql`
  query findInvestSquadCard($projectId: Int!, $teamId: Int!) {
    invests(
      where: {
        projectId: { equals: $projectId }
        user: { is: { userTeam: { every: { teamId: { equals: $teamId } } } } }
      }
    ) {
      id
      user {
        userTeam {
          teamId
        }
      }
    }
  }
`

interface SquadCardProps {
  id: number
  team: Team
  score: number
  receivedClient?: ReceivedClient
  selectedProject: SignatureProjectSchema
  invertors: InvestorData[]
  onInvestorsUpdate: (investors: InvestorData) => void // Adicione esta prop
  onSubmit: (data: SignatureProjectSchema) => void
}

interface InvestorData {
  uuid: string
  name: string
  thumbUrl: string
}

const calcService = new CalcTeam()

interface JobFunctionsData {
  jobFunctions: JobFunction[]
}

interface TeamData {
  team: Team
}

export function SquadCard({ onSubmit, invertors, selectedProject, onInvestorsUpdate, ...props }: SquadCardProps) {
  const id = router.query?.id
  const [showInvesters, setShowInvesters] = useState(false)

  const { data: jobFunctionForTeam } = useQuery<JobFunctionsData>(FIND_MANY_JOB_FUNCTION_IN_SQUAD_CARD, { variables: { id: props.team.id } })
  const { data: team } = useQuery<TeamData>(FIND_UNIQUE_TEAM_IN_SQUAD_CARD, { variables: { id: props.team.id } })

  const { data: invests } = useQuery(FIND_UNIQUE_INVEST_IN_SQUAD_CARD, { variables: { projectId: Number(id), teamId: Number(props.team.id) }, skip: id === undefined })

  const calc = calcService.defaultDelivers({ jobFunctions: jobFunctionForTeam?.jobFunctions })

  const handleInvestorSelection = (investorData: InvestorData) => {
    onInvestorsUpdate(investorData)
  }

  const { users } = formatUser(team?.team)

  return (
    <Container
      style={{
        height: showInvesters ? "auto" : "11.81125rem",
        minHeight: showInvesters ? "auto" : "11.81125rem",
      }}
    >
      <HeaderContainer>
        <SquadInfoContainer>
          {invests?.invests.length > 0 && (
            <div style={{ position: "absolute", left: "-2rem", top: "-2rem" }}>
              <div style={{ backgroundColor: "#7841b0", padding: "0.2rem", borderRadius: "0.5rem", color: "#fff" }}>
                {invests?.invests.length}
              </div>
            </div>
          )}

          <Image quality={100} src={props.team.thumbUrl} width={64} height={64} alt='Ícone de Squad' loading='lazy' />
          <SquadInfo>
            <SquadNameAndRecommended>
              <SquadName>
                <h3>{props.team.name.toUpperCase()}</h3>
              </SquadName>
              <p style={{ opacity: props.score > 70 ? 1 : 0.3 }}>
                Recomendado
                <Star1 variant='Outline' />
              </p>
            </SquadNameAndRecommended>

            <ServicesContainer>
              <Service>
                <AttachCircle variant='Outline' />
                <h1>Lps</h1>
                <p>{calc?.lps}</p>
              </Service>
              <Service>
                <Copyright variant='Outline' />
                <h1>Copys</h1>
                <p>{calc?.copys}</p>
              </Service>
              <Service>
                <PenAdd variant='Outline' />
                <h1>Design</h1>
                <p>{calc?.design}</p>
              </Service>
              <Service>
                <WalletSearch variant='Outline' />
                <h1>E-mails</h1>
                <p>{calc?.emails}</p>
              </Service>
              <Service>
                <PlayAdd variant='Outline' />
                <h1>Videos</h1>
                <p>{calc?.videos}</p>
              </Service>
            </ServicesContainer>
          </SquadInfo>

          <Margem>margem</Margem>
        </SquadInfoContainer>
        <ProgressAndButtonContainer>
          <CustomProgress progress={props.score} showPercentage={true} label='Capacidade total do Squad' />
          <Button
            onClick={() => {
              if (users && users?.length > 0) {
                setShowInvesters(!showInvesters)
              }
            }}
            open={showInvesters}
          >
            <ArrowDown2 variant='Outline' />
          </Button>
        </ProgressAndButtonContainer>
      </HeaderContainer>

      <ContentContainer
        style={{
          opacity: showInvesters ? 1 : 0,
          transition: showInvesters ? "opacity 0.3s ease-in" : "opacity 0.3s ease-out",
          height: showInvesters ? "100%" : "0",
        }}
      >

        {users?.map((item, index) => (
          <>
            {<InvesterComponent
              key={item.user?.uuid}
              id={index}
              user={item.user}
              maxProductiveCapacity={20}
              actualProductiveCapacity={item.jobFunction.map((job) => job.weight * job.jobFunction.deliverys)[0] ?? 0}
              function={item.jobFunction.map((job) => job.jobFunction.name).join("//")}
              maxProjects={12}
              actualProjects={item.user?.invest?.length ?? 0}
              investors={invertors}
              receivedClient={props.receivedClient}
              onInvestorSelect={handleInvestorSelection}
            />}
          </>
        ))}

        {invertors.length > 0 && <AtribuidosContainer>
          <h3>Equipe:</h3>
          <EquipeContainer>
            {invertors.map((invest, index) => (
              <div key={invest.uuid} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Image src={invest.thumbUrl} width={50} height={50} alt='img' />
                {index === invertors.length - 1 && <AddCircle variant='Outline' />}
              </div>
            ))}
          </EquipeContainer>
          <DefaultButton
            backgroundColor={"purple"}
            svgSize={"small"}
            animationSvg={"arrowRight"}
            style={{ width: "50%", height: "2.375rem", marginLeft: "1rem", fontSize: "0.75rem" }}
            onClick={() => onSubmit(selectedProject)}
          >Atribuir equipe <ArrowRight variant='Outline' />
          </DefaultButton>
        </AtribuidosContainer>}

      </ContentContainer>
    </Container >
  )
}

interface InvestorData {
  name: string
  uuid: string
  thumbUrl: string
}

interface InvesterProps {
  function: string
  user: User
  id: number
  actualProductiveCapacity: number
  maxProductiveCapacity: number
  actualProjects: number
  maxProjects: number
  receivedClient?: ReceivedClient
  assignedProject?: Boolean
  investors: InvestorData[] | []
  onClick?: (event: Event) => void
  onInvestorSelect: (investorData: InvestorData) => void
}

const InvesterComponent = ({ investors, user, onInvestorSelect, ...props }: InvesterProps) => {
  const id = router.query?.id

  const [assigned, setAssigned] = useState(false)

  useEffect(() => {
    const assigned_ = investors.some((invest) => invest.uuid === user.uuid)
    if (assigned_) {
    }
    setAssigned(assigned_)
  }, [investors])


  const handleAtribuirClick = () => {
    onInvestorSelect({
      name: user.name,
      uuid: user.uuid,
      thumbUrl: user?.avatarUrl,
    })
  }


  return (
    <InvesterContainer>
      <ImageAndInfo>
        {user.avatarUrl && <Image src={user.avatarUrl} width={50} height={50} alt='foto do investidor' loading='lazy' />}
        <NameAndFunction>
          <h3>{user.name}</h3>
          <p>{props.function}</p>
        </NameAndFunction>
      </ImageAndInfo>
      <Capacidade>
        <div>
          <p>Capacidade produtiva</p>
          <CustomProgress
            progress={props.actualProductiveCapacity}
            height='0.625rem'
            width='21.25rem'
            maxProgress={props.maxProductiveCapacity}
          />
          <p>
            {props.actualProductiveCapacity} de {props.maxProductiveCapacity}
          </p>
        </div>
        <div>
          <p>Projetos alocados</p>
          <CustomProgress
            progress={props.actualProjects}
            height='0.625rem'
            width='21.25rem'
            maxProgress={props.maxProjects}
          />
          <p>
            {props.actualProjects} de {props.maxProjects}
          </p>
        </div>
      </Capacidade>
      <AtribuirButton isAtribuido={assigned} onClick={handleAtribuirClick}>
        {assigned ? <span>Atribuído</span> : <span> Atribuir projeto</span>}
        {assigned ? <TickCircle variant='Outline' /> : <AddCircle variant='Outline' />}
      </AtribuirButton>
    </InvesterContainer>
  )
}
