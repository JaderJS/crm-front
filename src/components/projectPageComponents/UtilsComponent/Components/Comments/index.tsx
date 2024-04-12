import { UserContext } from "@/contexts/UserContext"
import { CommentProject, Invest, Project, ViewedCommentProjectCreateManyInput } from "@/types"
import { gql, useQuery, useSubscription, useMutation, useLazyQuery } from "@apollo/client"

import Image from "next/image"
import { useContext, useState, useEffect, useRef } from "react"
import {
  ChatContainer,
  Container,
  FlagsContainer,
  GrayFlag,
  GreenFlag,
  InputContainer,
  RedFlag,
  UserInfosContainer,
  UserMessageContainer,
} from "./styles"
import { Utils } from "@/utils/utils"
import { ArrowRight, Trash } from "iconsax-react"
import { Primitives } from "@/components/Primitives"
import Swal from "sweetalert2"

const utils = new Utils()

const CREATE_ONE_COMMENT_PROJECT_UTILS = gql`
  mutation createOneCommentProjectUtils($args: CommentProjectUncheckedCreateInput!) {
    createOneCommentProject(data: $args) {
      id
    }
  }
`

const DELETE_ONE_COMMENT_PROJECT_UTILS = gql`
  mutation deleteOneCommentProjectUtils($id: Int!) {
    deleteOneCommentProject(where: { id: $id }) {
      id
    }
  }
`

const CREATE_MANY_VIEWEDCOMMENTS_UTIL = gql`
  mutation createManyViewedCommentsUtil($args: [ViewedCommentProjectCreateManyInput!]!) {
    createManyViewedCommentProject(data: $args, skipDuplicates: true) {
      count
    }
  }
`

const FIND_UNIQUE_VIEWED_COMMENTS_COMPONENT = gql`
query findUniqueViewedCommentsComponent($projectId:Int!, $uuid: String!){
  viewedCommentProject(where: {userUuid_projectId:{ projectId:$projectId, userUuid:$uuid}}) {
    userUuid
  }
}
`

const UPDATE_MANY_VIEWED_UTIL = gql`
  mutation updateManyViewedCommentsUtil($vieweds: Int!, $uuid: String!, $projectId: Int!) {
    updateOneViewedCommentProject(
      data: { vieweds: { set: $vieweds } }
      where: { userUuid_projectId: { userUuid: $uuid, projectId: $projectId } }
    ) {
      userUuid
    }
  }
`

const FIND_UNIQUE_PROJECT_UTIL_COMMENT = gql`
  query findUniqueProjectUtilComment($projectId: Int!) {
    project(where: { id: $projectId }) {
      invest {
        userUuid
        projectId
      }
      viewedCommentProject {
        vieweds
        updatedAt
      }
      _count {
        commentProject
      }
    }
  }
`

const FIND_MANY_COMMENT_PROJECT_UTIL = gql`
  query FindManyCommentProjectUtil($projectId: Int!) {
    commentProjects(where: { projectId: { equals: $projectId } }) {
      id
      flag
      comments
      updatedAt
      user {
        uuid
        avatarUrl
        nickName
      }
    }
  }
`
const SUBS_CHANGE_COMMENT_PROJECT_UTIL = gql`
  subscription subsChangeCommentProjectUtil {
    eventChangeCommentProject {
      projectId
    }
  }
`

const CHANGE_COMMENT_PROJECT_UTIL = gql`
  query changeCommentProjectUtil($projectId: ID!) {
    changeCommentCustom(data: { projectId: $projectId })
  }
`

interface CommentsProject {
  commentProjects: CommentProject[]
}

interface ProjectData {
  project: Project
}

export function CommentsComponent({ projectId }: { projectId: number }) {
  const { uuid, userAllowed } = useContext(UserContext)
  const myUuid = uuid

  const { data: project } = useQuery<ProjectData>(FIND_UNIQUE_PROJECT_UTIL_COMMENT, {
    variables: { projectId: Number(projectId), uuid },
    skip: projectId === undefined || uuid === undefined,
    fetchPolicy: "network-only",
  })
  const { data: commentsProject, refetch: refetchCommentsProject } = useQuery<CommentsProject>(
    FIND_MANY_COMMENT_PROJECT_UTIL,
    {
      variables: { projectId: Number(projectId) },
      skip: projectId === undefined,
      fetchPolicy: "network-only",
    },
  )

  const { data: changeComment } = useSubscription(SUBS_CHANGE_COMMENT_PROJECT_UTIL, {
    fetchPolicy: "network-only",
    skip: projectId === undefined,
  })
  const { data: changeInform, refetch: refetchChangeInform } = useQuery(CHANGE_COMMENT_PROJECT_UTIL, { skip: true })

  const [fetchViewedCommentProject] = useLazyQuery(FIND_UNIQUE_VIEWED_COMMENTS_COMPONENT)

  const [createOneComment] = useMutation(CREATE_ONE_COMMENT_PROJECT_UTILS)
  const [createManyViewedComment] = useMutation(CREATE_MANY_VIEWEDCOMMENTS_UTIL)
  const [updateOneViewedCommentProject] = useMutation(UPDATE_MANY_VIEWED_UTIL)
  const [deleteOneCommentProject] = useMutation(DELETE_ONE_COMMENT_PROJECT_UTILS)

  useEffect(() => {
    refetchCommentsProject()
  }, [changeComment, deleteOneCommentProject])

  const refreshViewedComments = async (uuid: string) => {
    if (!uuid) {
      return
    }
    try {
      const allViewed = project?.project._count?.commentProject
      const manyViewedComments = project?.project.invest
        .map((invest: Invest) => ({ userUuid: invest.userUuid, projectId: invest.projectId, vieweds: allViewed }))
        .concat({ userUuid: uuid, projectId: projectId, vieweds: allViewed })
      if (!manyViewedComments) {
        return
      }
      fetchViewedCommentProject({ variables: { projectId: projectId, uuid: uuid } }).then(() => {
        updateOneViewedCommentProject({ variables: { uuid: uuid, vieweds: allViewed, projectId: projectId } })
      }).finally(() => {
        createManyViewedComment({ variables: { args: manyViewedComments } })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteComment = async ({ id }: { id: Number }) => {
    try {
      await deleteOneCommentProject({ variables: { id: id } })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    refreshViewedComments(uuid)
  }, [project, uuid])

  const [comment, setComment] = useState<string>("")
  const [isCommentEmpty, setIsCommentEmpty] = useState(true)

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setComment(value)
    setIsCommentEmpty(value.trim() === "")
  }

  const [selectFlag, setSelectFlag] = useState<"VICTORY" | "COMMENT" | "OCCURRENCE">()

  const borderFlag = (flag: "VICTORY" | "COMMENT" | "OCCURRENCE") => {
    switch (flag) {
      case "VICTORY":
        return "1px solid #26C267"
      case "COMMENT":
        return "1px solid #C4C4C4"
      case "OCCURRENCE":
        return "1px solid #DC2424"
    }
  }

  const handleSubmit = () => {
    if (!selectFlag) {
      alert("Selecione um tipo de comentário")
      return
    }
    if (comment.trim() === "") {
      alert("Digite um comentário")
      return
    }

    if (!isCommentEmpty) {
      createOneComment({
        variables: {
          args: {
            projectId: Number(projectId),
            createdBy: uuid,
            comments: { comment: comment },
            flag: selectFlag,
          },
        },
      })

      setComment("")
      setTimeout(() => {
        refetchChangeInform({ projectId })
        refetchCommentsProject()
        refetchChangeInform({ projectId })
        refetchCommentsProject()
      }, 300)
    }
  }
  const commentContainerRef = useRef<HTMLDivElement>(null)
  const lastCommentRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isCommentEmpty && selectFlag) {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [commentsProject])

  return (
    <Container>
      <ChatContainer ref={commentContainerRef}>
        {commentsProject?.commentProjects &&
          commentsProject?.commentProjects.length > 0 &&
          commentsProject?.commentProjects.map((comment: CommentProject, index) => (
            <UserMessageContainer
              key={comment.id}
              ref={index === commentsProject.commentProjects.length - 1 ? lastCommentRef : null}
            >
              {comment.user.uuid !== myUuid ? (
                <UserInfosContainer
                  style={{
                    justifyContent: comment.user.uuid === myUuid ? "flex-end" : "flex-start",
                  }}
                >
                  <Image src={comment.user.avatarUrl} alt='user picture' width={480} height={480} loading='lazy' />
                  <div>
                    <h3>{comment.user.nickName}</h3>
                    <span>{utils.formatDateWithTimeZone(comment.updatedAt)}</span>
                  </div>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Você tem certeza?",
                        text: "Você não poderá reverter isso!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#E0465C",
                        cancelButtonColor: "#7841B0",
                        confirmButtonText: "Sim, apague!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDeleteComment({ id: comment.id }).then(() => refetchCommentsProject())
                        }
                      })
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      marginLeft: ".5rem",
                      border: "none",
                    }}
                  >
                    <Trash
                      variant='Outline'
                      style={{
                        width: "1rem",
                        height: "1rem",
                        color: "#E0465C",
                      }}
                    />
                  </button>
                </UserInfosContainer>
              ) : (
                <UserInfosContainer
                  style={{
                    justifyContent: comment.user.uuid === myUuid ? "flex-end" : "flex-start",
                  }}
                >
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Você tem certeza?",
                        text: "Você não poderá reverter isso!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#E0465C",
                        cancelButtonColor: "#7841B0",
                        confirmButtonText: "Sim, apague!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDeleteComment({ id: comment.id }).then(() => refetchCommentsProject())
                        }
                      })
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    <Trash
                      variant='Outline'
                      style={{
                        width: "1rem",
                        height: "1rem",
                        color: "#E0465C",
                      }}
                    />
                  </button>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <h3>{comment.user.nickName}</h3>
                    <span>{utils.formatDateWithTimeZone(comment.updatedAt)}</span>
                  </div>
                  <Image src={comment.user.avatarUrl} alt='user picture' width={480} height={480} loading='lazy' />
                </UserInfosContainer>
              )}

              <p
                style={{
                  border: borderFlag(comment.flag as "VICTORY" | "COMMENT" | "OCCURRENCE") || "1px solid #C4C4C4",
                }}
              >
                {comment.comments.comment}
              </p>
            </UserMessageContainer>
          ))}
      </ChatContainer>

      <InputContainer>
        <Primitives
          componentName='SelectFWOWhite'
          selectPropsWhite={{
            options: [
              {
                value: "COMMENT",
                label: "Comentário",
              },
              {
                value: "VICTORY",
                label: "Vitória",
              },
              {
                value: "OCCURRENCE",
                label: "Ocorrência",
              },
            ],
            onChange: (event: any) => setSelectFlag(event.value),
            placeholder: "Tipo de cmt",
            menuPlacement: "top",
            // menuHeight: "4rem",
            menuWidth: "8rem",
            optionMaxWidth: "8rem",
            optionWidth: "8rem",
            // styles: {
            //   borderRadius: "0.9375rem",
            //   // minHeight: "auto",
            //   display: "flex",
            //   flexDirection: "column",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   width: "100%",
            //   maxWidth: "8rem",
            //   height: "4rem",
            // },
          }}
        />
        <input
          type='text'
          value={comment}
          onChange={(event) => handleComment(event)}
          placeholder='Digite aqui o seu comentário'
          style={{
            width: "100%",
            border: borderFlag(selectFlag ?? "COMMENT") || "1px solid #C4C4C4",
          }}
          onKeyDown={(event) => {
            handleKeyDown(event)
          }}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isCommentEmpty}
          style={{
            cursor: isCommentEmpty ? "not-allowed" : "pointer",
          }}
        >
          <ArrowRight variant='Outline' />
        </button>
      </InputContainer>
    </Container>
  )
}
