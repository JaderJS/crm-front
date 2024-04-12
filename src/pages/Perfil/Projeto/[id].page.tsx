import Router, { useRouter } from "next/router"
import { CenterContainer, Container, MenuPlusContainer } from "./styles"
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"
import Image from "next/image"
import router from "next/router"
import { ClientInfo } from "@/components/projectPageComponents/ClientInf"
import { CardProject } from "@/components/projectPageComponents/Cards"
import { Materials } from "@/components/projectPageComponents/Materials"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import { SelectOptions } from "@/components/projectPageComponents/SelectInfos"
import PopUpLinks from "@/components/projectPageComponents/PopUpLinks"
import Swal from "sweetalert2"
import { DefaultButton } from "@/components/DefaultButton"
import { Trash } from "iconsax-react"
import { PopUpSelectInfos } from "@/components/projectPageComponents/PopUpSelectInfos"
import { Invest, JobFunction, UserJobFunction, UserStep, Project, Client } from "@/types"
import { UtilsComponent } from "@/components/projectPageComponents/UtilsComponent"
import { GetServerSideProps } from "next"
import { Okrs } from "@/components/projectPageComponents/OkrsComponent"
import { ButtonBackPage } from "@/components/ButtonBackPage"
import { UserContext } from "@/contexts/UserContext"
import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"
import Head from "next/head"
import { DialogSelectedComponent } from "@/pages/Atribuicoes/AtribuicaoDeClientes/selectedClient"

const FIND_UNIQUE_PROJECT = gql`
  query projectProject($id: Int!) {
    project(where: { id: $id }) {
      id
      cnpj
      state
      city
      address
      fantasyName
      initialDateContract
      profileUrl
      pipefy {
        pipefyId
      }
      client {
        cnpj
        Qnp {
          id
        }
        cnpj
        content
        user {
          uuid
          name
        }
      }
      invest {
        id
        user {
          uuid
          name
          avatarUrl
          userTeam {
            teamId
            team {
              name
            }
          }

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
      okrObjectiveProject(orderBy: { finishedAt: asc }) {
        id
        title
        description
        okr(orderBy: { createdAt: desc }) {
          id
          title
          kr(orderBy: { createdAt: desc }) {
            id
            progress
            target
          }
        }
      }
      content
      name
    }
  }
`

const DELETE_ONE_PROJECT_IN_PROJECT = gql`
  mutation deleteOneProjectInProject($id: Int!) {
    deleteOneProject(where: { id: $id }) {
      id
    }
  }
`

const UPDATE_ONE_PROJECT_IN_PROJECT = gql`
  mutation UpdateOneProjectInProject($id: Int!, $args: ProjectUncheckedUpdateInput!) {
    updateOneProject(where: { id: $id }, data: $args) {
      id
    }
  }
`

const USER_ROLE = gql`
  query userRole($uuid: String) {
    users(where: { uuid: { equals: $uuid } }) {
      role
      userJobFunction {
        jobFunction {
          name
        }
      }
    }
  }
`
const FIND_MANY_CLIENTS_IN_PROJECT = gql`
  query findManyClientsInProject {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  return {
    props: {
      params,
    },
  }
}

interface ProjectData {
  project: Project
}

interface ClientsData {
  clients: Client[]
}

export default function Projeto({ params }: { params: { id: string } }) {
  const{uuid} = useContext(UserContext)
  const {
    data: project,
    loading: loadingProject,
    refetch: refetchProject,
  } = useQuery<ProjectData>(FIND_UNIQUE_PROJECT, {
    variables: { id: Number(params.id) },
    skip: params.id === undefined,
  })
  const [fetchClient, { data: clients }] = useLazyQuery<ClientsData>(FIND_MANY_CLIENTS_IN_PROJECT, {
    fetchPolicy: "network-only",
  })

  const { userAllowed } = useContext(UserContext)

  const [updateOneProject] = useMutation(UPDATE_ONE_PROJECT_IN_PROJECT)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDataPaths = async ({ data }: { data: any }) => {
    if (!data) {
      return
    }
    try {
      const updatedContent = { ...project?.project.content, pathsUrl: { ...data } }

      await updateOneProject({ variables: { id: Number(params.id), args: { content: updatedContent } } })
      refetchProject()
      setTimeout(() => {
        setShowPopUpLinks(false)
      }, 500)
      
    } catch (error) {
      console.error(error)
    }
  }

  const [showPopUpLinks, setShowPopUpLinks] = useState(false)


  useEffect(() => {
    if (project?.project?.client?.user || !project) {
      return; 
    } else {
      fetchClient().then(() => {
        setTimeout(() => {
          setIsDialogOpen(true);
        }, 100);
      });
    }
  }, [project?.project?.client?.user, project]);
  

  if (loadingProject) {
    return <Container></Container>
  }

  if (!project || !project?.project || !params.id) {
    return <Container>Nenhum dado encontrado</Container>
  }

  return (
    <MenuPlusContainer>
      <Head>
        <title>FWO: {project?.project.name || "Projeto"} </title>
        <meta name='description' content={`FWO: ${project?.project.name || "Projeto"}`} />
        <meta property='og:image' content={project?.project.profileUrl} />
        <meta property='og:description' content={`FWO: ${project?.project.name || "Projeto"}`} />
        <meta property='og:title' content={`FWO: ${project?.project.name || "Projeto"}`} />
      </Head>

      {/* {!project?.project.client?.user && <> {InfoComponent()}</>} */}

      <MenuHistoryPaths
        items={[
          { path: "/Perfil", name: "Perfil" },
          { path: `/Perfil/${params.id}`, name: `${project.project.name || "Projeto"}` },
        ]}
        loading={loadingProject}

      />

      <Container>
        <div
          style={{
            display: "flex",
            width: "30%",
            minWidth: "24.0625rem",
          }}
        >
          {project && <ClientInfo project={project.project} showEdit={userAllowed ?? false} clientId={params.id} />}
        </div>

        <CenterContainer>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SelectOptions showEdit={userAllowed ?? false} projectId={params.id} uuid={uuid} />
            <UtilsComponent
              projectId={Number(params.id)}
              squadName={project?.project?.invest[0]?.user?.userTeam[0]?.team?.name || "Sem nome de squad"}
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardProject link={`/Perfil/Projeto/Qnp/${params.id}`} text='QNP' />
            <CardProject link={`/Perfil/Projeto/Documentos/${params.id}`} text='Financeiro e Jurídico' />
          </div>

          <Okrs OkrObjectiveProject={project.project?.okrObjectiveProject} />
        </CenterContainer>

        <Materials
          defaultData={project?.project?.content?.pathsUrl}
          clickShowPopUp={() => {
            setShowPopUpLinks(!showPopUpLinks)
          }}
        />

        {showPopUpLinks && (
          <PopUpLinks
            clientId={Number(params.id)}
            openPopUp={showPopUpLinks}
            closePopUp={() => {
              setShowPopUpLinks(false)
            }}
            handleData={(data: any) => handleDataPaths({ data })}
            defaultValues={project.project.content?.pathsUrl}
          />
        )}
        {userAllowed && (
          <DefaultButton
            onClick={() =>
              ComponentDeleteProject({
                func: () =>
                  updateOneProject({ variables: { id: Number(params.id), args: { enable: { set: false } } } }),
              })
            }
            style={{
              height: "2rem",
              width: "2rem",
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
            }}
            backgroundColor={"red"}
          >
            <Trash variant='Outline' width={16} height={16} />
          </DefaultButton>
        )}
      </Container>
      {isDialogOpen && clients?.clients && (
        <DialogSelectedComponent
          clients={clients.clients}
          onSubmit={(client) => {
            updateOneProject({
              variables: {
                id: Number(params.id),
                args: {
                  clientId: { set: client.id },
                },
              },
            })
          }}
          show={isDialogOpen}
          setShow={setIsDialogOpen}
          projectPage={true}
        />
      )}
    </MenuPlusContainer>
  )
}

const ComponentDeleteProject = ({ func }: { func: Function }) => {
  Swal.fire({
    icon: "warning",
    title: "Tem certeza que deseja desabilitar o projeto?",
    showCancelButton: true,
    confirmButtonText: "Desabilitar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await func()
      Router.push("/Perfil/Projeto")
    }
  })
}
