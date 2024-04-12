import { useState, useContext, useEffect } from "react"
import { ProjectTeam } from "./Components/ProjectTeam"
import { ButtonsContainer, CommentsNumber, Container, EditarEquipeButton, HeaderContainer } from "./styles"
import { Setting2 } from "iconsax-react"
import Link from "next/link"
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client"

import { CommentProject, CommentProjectUncheckedCreateInput, Project } from "@/types"
import { UserContext } from "@/contexts/UserContext"
import Image from "next/image"
import { CommentsComponent } from "./Components/Comments"

const FIND_UNIQUE_PROJECT_UTIL = gql`
  query findUniqueProjectUtil($projectId: Int!, $uuid: String!) {
    project(where: { id: $projectId }) {
      invest {
        userUuid
        projectId
      }
      viewedCommentProject(where: { userUuid: { equals: $uuid } }) {
        vieweds
        userUuid
        updatedAt
      }
      _count {
        commentProject
      }
    }
  }
`
interface ProjectData {
  project: Project
}

interface UtilsComponentProps {
  projectId: number
  squadName: string
}

export function UtilsComponent({ projectId, squadName }: UtilsComponentProps) {
  const { uuid } = useContext(UserContext)

  const { data: project } = useQuery<ProjectData>(FIND_UNIQUE_PROJECT_UTIL, {
    variables: { projectId: Number(projectId), uuid },
    skip: projectId === undefined || uuid === undefined || uuid === null || uuid === "",
    fetchPolicy: "network-only",
  })


  const [selectedOption, setSelectedOption] = useState("Squad" as "Squad" | "Comentários" | "Solicitações")
  const { userAllowed } = useContext(UserContext)

  const viewed_ =
    (project?.project._count?.commentProject ?? 0) -
    (project?.project.viewedCommentProject ? project?.project.viewedCommentProject[0]?.vieweds ?? 0 : 0)

  return (
    <Container>
      <HeaderContainer>
        <h3>{squadName.toUpperCase()}</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ButtonsContainer>
            <button
              onClick={() => {
                setSelectedOption("Squad")
              }}
              className={selectedOption === "Squad" ? "selected" : ""}
            >
              Squad
            </button>
            <button
              onClick={() => {
                setSelectedOption("Comentários")
              }}
              className={selectedOption === "Comentários" ? "selected" : ""}
            >
              Comentários <CommentsNumber comments={selectedOption === "Comentários"}>
                {viewed_ > 0 ? viewed_ : "0"}

              </CommentsNumber>
            </button>
            <button
              onClick={() => {
                setSelectedOption("Solicitações")
              }}
              className={selectedOption === "Solicitações" ? "selected" : ""}
            >
              Solicitações
            </button>
          </ButtonsContainer>
          {userAllowed && selectedOption === "Squad" && (
            <Link href={`/Perfil/Projeto/Reatribuir/${projectId}`}>
              <EditarEquipeButton>
                Editar equipe <Setting2 variant='Outline' />
              </EditarEquipeButton>
            </Link>
          )}
        </div>
      </HeaderContainer>

      {selectedOption === "Squad" && <ProjectTeam projectId={projectId} />}
      {selectedOption === "Comentários" && <CommentsComponent projectId={projectId} />}
      {selectedOption === "Solicitações" && <h1>Solicitações</h1>}
    </Container>
  )
}
