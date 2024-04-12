import Image from "next/image"
import { Invest, UserJobFunction, UserStep } from "@/types"
import { gql, useQuery } from "@apollo/client"
import {
  Container,
  FunctionContainer,
  HeaderContainer,
  InvestContainer,
  NameContainer,
  StepContainer,
  ThumbnailContainer,
} from "./styles"

interface TeamProps {
  projectId: number
}

const FIND_UNIQUE_PROJECT1 = gql`
  query project($id: Int!) {
    project(where: { id: $id }) {
      id
      client {
        cnpj
        Qnp {
          id
        }
        content
      }
      invest {
        id
        user {
          uuid
          name
          avatarUrl
          userJobFunction {
            jobFunction {
              name
            }
          }
          userSteps {
            step {
              name
            }
          }
        }
      }
      content
      name
    }
  }
`

export function ProjectTeam({ projectId }: TeamProps) {
  const {
    data: project,
    loading: loadingProject,
    refetch: refetchProject,
  } = useQuery(FIND_UNIQUE_PROJECT1, { variables: { id: Number(projectId) }, skip: projectId === undefined })

  const handleGroupJobFunctions = ({ userJobFunction }: { userJobFunction: UserJobFunction[] }) => {
    return userJobFunction.reduce((jobs: string, jobFunction: any, index: number) => {
      if (index === 0) {
        return jobFunction.jobFunction.name
      } else {
        return `${jobs} / ${jobFunction.jobFunction.name}`
      }
    }, "")
  }

  const handleGroupSteps = ({ userSteps }: { userSteps: UserStep[] }) => {
    return userSteps.reduce((accSteps: string, step: any, index: number) => {
      if (index === 0) {
        return step.step.name.toUpperCase()
      } else {
        return `${accSteps} / ${step.step.name.toUpperCase()}`
      }
    }, "")
  }

  const invests = project?.project?.invest

  return (
    <Container>
      {/* <a href={`/Perfil/Projeto/Reatribuir/${projectId}`}>EDITAR</a> */}
      <HeaderContainer>
        <FunctionContainer>
          <p>Função</p>
        </FunctionContainer>
        <NameContainer>
          <p>Nome</p>
        </NameContainer>
        <ThumbnailContainer>
          <p>Foto</p>
        </ThumbnailContainer>
        <StepContainer>Step</StepContainer>
      </HeaderContainer>
      {invests && invests.length > 0 && (
      invests.map((invest: Invest) => (
        <InvestContainer key={invest.id}>
          <FunctionContainer>
            <p>{handleGroupJobFunctions({ userJobFunction: invest.user.userJobFunction })}</p>
          </FunctionContainer>
          <NameContainer>
            <p>{invest.user.name}</p>
          </NameContainer>
          <ThumbnailContainer>
            <Image src={invest.user.avatarUrl} width={50} height={50} alt='img' />
          </ThumbnailContainer>
          <StepContainer>{handleGroupSteps({ userSteps: invest.user.userSteps })}</StepContainer>
        </InvestContainer>
      ))
      )}
    </Container>
  )
}
