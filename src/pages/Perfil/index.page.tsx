import Image from "next/image"
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
  UserInfo,
  UserInfoContainer,
  VerticalLine,
  Tbody2,
  ProjectsContainer,
  CardsInProfile,
  IconDiv,
  MindforgeContainer,
} from "./styles"
import { gql, useQuery } from "@apollo/client"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import { DefaultButton } from "@/components/DefaultButton"
import {
  ArrowCircleRight,
  ArrowRight,
  ArrowSwapVertical,
  Calendar1,
  Flag,
  HashtagUp,
  MoneySend,
  Shop,
  Solana,
} from "iconsax-react"
import Skeleton from "react-loading-skeleton"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { Project } from "@/types"
import { Utils } from "@/utils/utils"

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import Router from "next/router"
import { UserContext } from "@/contexts/UserContext"
import svgMindforge from "@/assets/svgMindforge.svg"
const utils = new Utils()

const USER_INFO = gql`
  query UserInfo($uuid: String!) {
    findFirstUser(where: { uuid: { equals: $uuid } }) {
      name
      email
      avatarUrl
      personalInfo
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
`

const PROJECTS_QUERY = gql`
  query project_($uuid: String!) {
    projects(where: { invest: { some: { userUuid: { equals: $uuid } } } }) {
      id
      name
      createdAt
      content
      historyStep {
        step
      }
      HistoryFlag {
        flag
      }
    }
  }
`

export default function Perfil() {
  const { uuid } = useContext(AuthContext)
  const { userAllowed } = useContext(UserContext)
  const { data, loading } = useQuery(USER_INFO, { variables: { uuid: uuid } })
  const { data: projects } = useQuery(PROJECTS_QUERY, { variables: { uuid: uuid }, skip: uuid === undefined })
  const calculateOrganizationDuration = () => {
    const birthdayOrganization = data?.findFirstUser?.personalInfo?.birthDayOrganization
    if (birthdayOrganization) {
      const entrou = new Date(birthdayOrganization)
      const dataAtual = new Date()
      const mesesNaOrganização =
        (dataAtual.getFullYear() - entrou.getFullYear()) * 12 + (dataAtual.getMonth() - entrou.getMonth())

      if (mesesNaOrganização <= 12) {
        return `${mesesNaOrganização} meses`
      } else {
        const AnosNaOrganização = Math.floor(mesesNaOrganização / 12)
        return `${AnosNaOrganização} anos`
      }
    }
    return "N/A"
  }
  return (
    <Container>
      <h2>Para você!</h2>
      {loading ? (
        <UserInfoContainer>
          <Skeleton width={100} height={100} circle />

          <UserInfo
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton
              style={{
                width: "19.5rem",
                minWidth: "100px",
              }}
              count={5}
            />
          </UserInfo>

          <VerticalLine />
          <SecondInfos>
            <Skeleton
              style={{
                width: "12.5rem",
                minWidth: "100px",
              }}
              count={4}
            />
          </SecondInfos>
        </UserInfoContainer>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: "2rem",
            }}
          >
            <UserInfoContainer>
              <Image
                src={data?.findFirstUser.avatarUrl ?? ""}
                width={720}
                height={680}
                alt='Foto do usuário'
                priority
                quality={100}
              />
              <UserInfo>
                <h3>Informações pessoais</h3>
                <p>{data?.findFirstUser?.name}</p>
                <p
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {(data?.findFirstUser?.userJobFunction[0]?.jobFunction?.name as string) ?? ""}
                </p>
                <div>
                  <p
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    Step: {data?.findFirstUser?.userSteps[0]?.step?.name ?? ""}
                  </p>
                  <p>LT: {calculateOrganizationDuration()} </p>
                </div>
                {/* <Link href={"/Perfil/Pessoal"}about="Editar perfil"> */}
                <DefaultButton svgSize={"small"} backgroundColor={"purple"} disabled>
                  Editar perfil <ArrowRight variant='Outline' />
                </DefaultButton>
                {/* </Link> */}
              </UserInfo>

              <VerticalLine />
              <SecondInfos>
                <p>{data?.findFirstUser?.email}</p>
                <p>{data?.findFirstUser?.personalInfo?.phoneNumber}</p>
                <p>{data?.findFirstUser?.personalInfo?.birthDay}</p>
              </SecondInfos>
            </UserInfoContainer>
            <CardsInProfile>
              <IconDiv>
                <MoneySend variant='Outline' />
              </IconDiv>
              Jurídico e financeiro
            </CardsInProfile>
            <CardsInProfile
              onClick={() => {
                Router.push("/Adm/CapacidadeProdutiva")
              }}
            >
              <div />
              <HashtagUp variant='Outline' />
              <h2>Capacidade produtiva</h2>
              <span>
                {userAllowed
                  ? "Acesse aqui para ver a capacidade produtiva da sua equipe"
                  : "Ver minha capacidade produtiva"}
              </span>
              <DefaultButton
                svgSize={"small"}
                backgroundColor={"purple"}
                animationSvg={"arrowRight"}
                onClick={() => {
                  userAllowed ? Router.push("/Adm/CapacidadeProdutiva") : Router.push("/Perfil/CapacidadeProdutiva")
                }}
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {userAllowed ? "Editar Informações" : "Ver mais"}
                </p>
                <ArrowRight variant='Outline' color='#F8F8F8' />
              </DefaultButton>
            </CardsInProfile>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              gap: "2.375rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "100%",
                height: "100%",
                gap: "2.3125rem",
              }}
            >
              <h2>Seus Projetos</h2>

              <ProjectsContainer>
                <TableComponent projects={projects} />
              </ProjectsContainer>
            </div>
            <MindforgeContainer>
              <Image src={svgMindforge} width={180} height={180} alt='Mindforge logo' priority quality={100} />
              <a href='https://mindforge.com.br/' target='_blank' rel='noreferrer'>
                Home
              </a>
              <a href='https://mindforge.com.br/News' target='_blank' rel='noreferrer'>
                Últimas notícias
              </a>
              <a href='https://mindforge.com.br/UserProfile' target='_blank' rel='noreferrer'>
                Perfil
              </a>
              <a href='https://mindforge.com.br/learning/trilhas' target='_blank' rel='noreferrer'>
                Learning
              </a>
              <a href='https://mindforge.com.br/learning/ranking' target='_blank' rel='noreferrer'>
                Ranking
              </a>
              <a href='https://mindforge.com.br/learning/certificacoes' target='_blank' rel='noreferrer'>
                Certificados
              </a>
              <a href='https://mindforge.com.br/planoDeCarreira' target='_blank' rel='noreferrer'>
                Plano de carreira
              </a>
              <a href='https://mindforge.com.br/learning/biblioteca' target='_blank' rel='noreferrer'>
                Biblioteca
              </a>
            </MindforgeContainer>
          </div>
        </>
      )}
    </Container>
  )
}

const TableComponent = ({ projects }: { projects: any }) => {
  return (
    <Table
      style={{
        borderRadius: "1.875rem 1.875rem 0rem 0rem",
        overflow: "hidden",
        width: "100%",
        padding: "0",
        borderCollapse: "collapse",
        borderSpacing: "0",
        border: "none",
      }}
    >
      <TableHeader>
        <Tr>
          <Th>
            <div>
              <Shop variant='Outline' /> Nome Empresa
            </div>
          </Th>
          <Th>
            <div>
              <Calendar1 variant='Outline' />
              LT
            </div>
          </Th>
          <Th>
            <div>
              <Solana variant='Outline' />
              Step
            </div>
          </Th>
          <Th>
            <div>
              <Flag variant='Outline' />
              Flag
            </div>
          </Th>
          <Th></Th>
        </Tr>
      </TableHeader>

      <Tbody2>
        {projects?.projects?.map((project: any) => (
          <Tr key={project.id}>
            <Td>{project.name}</Td>
            <Td>
              {utils.projectLifeTimeInMonths(project.createdAt)}{" "}
              {utils.projectLifeTimeInMonths(project.createdAt) > 1 ? "meses" : "mês"}
            </Td>
            <Td>{project.historyStep[0]?.step ?? "N/A"}</Td>
            <Td>{project.HistoryFlag[0]?.flag ?? "N/A"}</Td>
            <Td>
              <Link
                href={`/Perfil/Projeto/${project.id}`}
                style={{
                  cursor: "pointer",
                  color: "#000000",
                }}
              >
                <div
                  // onClick={() => {
                  //   // window.open(`/Perfil/Projeto/${project.id}`)
                  //   Router.push(`/Perfil/Projeto/${project.id}`)
                  // }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Abrir projeto
                  <ArrowCircleRight variant='Outline' />
                </div>
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody2>
    </Table>
  )
}
