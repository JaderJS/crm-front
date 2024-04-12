import React, { useContext, useState, useEffect } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"
import { GetServerSideProps } from "next"
import { KrCommentProject, ObjectiveUncheckedCreateInput, OkrObjectiveProject, OkrProject, Project } from "@/types"
import { PopUpKrs } from "@/components/projectPageComponents/PopUpKrs"
import { AuthContext } from "@/contexts/AuthContext"
import Image from "next/image"
import { PopUpEditKrs } from "@/components/projectPageComponents/PopUpEditKrs"
import {
  AddButton,
  Container,
  InputContainer,
  Okr,
  OkrContent,
  OkrDescription,
  OkrsContainer,
  UserInfosContainer,
  UserMessageContainer,
} from "./styles"
import { DefaultButton } from "@/components/DefaultButton"
import { AddCircle, ArrowLeft, ArrowRight, Calendar1, Flag, Trash } from "iconsax-react"
import { MagicMotion } from "react-magic-motion"
import { Utils } from "@/utils/utils"
import { CircularProgressbar, CircularProgressbarWithChildren } from "react-circular-progressbar"
import { UserContext } from "@/contexts/UserContext"
import { ButtonBackPage } from "@/components/ButtonBackPage"

import { PopUpOkr } from "@/components/projectPageComponents/PopUpOkrs"
import { PopUpEditOkr } from "@/components/projectPageComponents/PopUpEditOkrs"
import ChartKrs from "@/components/projectPageComponents/ChartKrs"

const utils = new Utils()

const FIND_UNIQUE_PROJECT_OKR_IN_OKR = gql`
  query findUniqueProjectOkrInOkr($projectId: Int!) {
    project(where: { id: $projectId }) {
      id
      okrObjectiveProject(orderBy: { finishedAt: asc }) {
        id
        title
        description
        finishedAt
        okr(orderBy: { createdAt: desc }) {
          id
          title
          createdBy
          kr(orderBy: { createdAt: desc }) {
            id
            progress
            target
            createdAt
          }
          user {
            uuid
            name
            avatarUrl
          }
          krComments {
            id
            comments
            createdBy
            createdAt
            user {
              uuid
              name
              avatarUrl
              nickName
            }
          }
        }
      }
    }
  }
`

const CREATE_ONE_COMMENT_KR_IN_OKR = gql`
  mutation createOneCommentKrInOkr($args: KrCommentProjectUncheckedCreateInput!) {
    createOneKrCommentProject(data: $args) {
      id
    }
  }
`

const DELETE_ONE_KR_IN_OKR = gql`
  mutation deleteOneOkrInOkr($id: Int!) {
    deleteOneOkrProject(where: { id: $id }) {
      id
    }
  }
`

const DELETE_ONE_COMMENT_KR_IN_OKR = gql`
  mutation deleteOneCommentKrInOkr($id: Int!) {
    deleteOneKrCommentProject(where: { id: $id }) {
      id
    }
  }
`

interface projectData {
  project: Project
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  const id = params?.id
  return {
    props: {
      id,
    },
  }
}

export default function Okrs({ id }: { id: Number }) {
  const [showPopUp, setShowPopUp] = useState<boolean>(false)
  const [showPopUpKr, setShowPopUpKr] = useState<boolean>(false)
  const [editOkrId, setEditOkrId] = useState<number | null>(null)
  const [editKrId, setEditKrId] = useState<number | null>(null)

  const { uuid, userAllowed } = useContext(UserContext)

  const { data: project, refetch: refetchProject } = useQuery<projectData>(FIND_UNIQUE_PROJECT_OKR_IN_OKR, {
    variables: { projectId: Number(id) },
    fetchPolicy: "no-cache",
    skip: id === undefined,
    refetchWritePolicy: "overwrite",
  })

  const [deleteOneOkr] = useMutation(DELETE_ONE_KR_IN_OKR, {
    onCompleted: () => {
      refetchProject()
    },
  })

  const okrObjective = project?.project.okrObjectiveProject

  const handleEditOkr = (okrId?: number) => {
    if (!okrId) return
    setEditOkrId(okrId)
  }

  const handleEditKr = (krId: number) => {
    setEditKrId(krId)
  }

  const allProgress = Math.round(
    okrObjective?.[0]?.okr.reduce((acc: number, kr: OkrProject) => {
      acc += utils.calcProgressOkr(kr) * (1 / okrObjective?.[0]?.okr.length)
      return acc
    }, 0) ?? 0,
  )

  if (okrObjective?.length === 0)
    return (
      <Container>
        {showPopUp && project && (
          <PopUpOkr setShow={setShowPopUp} project={project?.project} refetch={refetchProject} />
        )}

        <ButtonBackPage />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            width: "100%",
            height: "100%",
            padding: "1rem",

            color: "#A1A1A5",
            fontWeight: "bold",
            fontSize: "1.875rem",
          }}
        >
          <h3 style={{ textAlign: "center", fontWeight: "400" }}>
            Adicionar <br /> Objetivo
          </h3>

          <OkrsContainer>
            <AddButton onClick={() => setShowPopUp(true)}>
              <AddCircle />
            </AddButton>
          </OkrsContainer>
        </div>
      </Container>
    )

  return (
    <Container>
      {showPopUpKr && <PopUpKrs project={project?.project} setShow={setShowPopUpKr} refetch={refetchProject} />}

      {editKrId && (
        <PopUpEditKrs
          editKrId={editKrId}
          setEditKrId={setEditKrId}
          project={project?.project}
          okrObjective={okrObjective?.[0]}
          refetch={refetchProject}
        />
      )}
      {editOkrId && (
        <PopUpEditOkr
          editOkrId={editOkrId}
          setEditOkrId={setEditOkrId}
          project={project?.project}
          okrObjective={okrObjective?.[0]}
          refetch={refetchProject}
        />
      )}

      <ButtonBackPage />

      <OkrsContainer>
        <Okr>
          <OkrContent>
            <h3
              style={{
                wordBreak: "break-word",
                
              }}
            >{okrObjective?.[0]?.title}</h3>

            <OkrDescription>
              <h4>Descrição</h4>
              {okrObjective?.[0]?.description}
            </OkrDescription>

            <div
              style={{
                width: "100%",
                height: "auto",
                borderBottom: "1px solid #7841B0",
                paddingBottom: "2rem",
                paddingTop: "1rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ gap: "0.25rem", display: "flex", flexDirection: "column" }}>
                <h4>Prazo</h4>
                <p>
                  {utils.calcDaysToFinish(okrObjective?.[0]?.finishedAt) === 1 ? "Falta" : "Faltam"}{" "}
                  <strong>{utils.calcDaysToFinish(okrObjective?.[0]?.finishedAt)} </strong>
                  {utils.calcDaysToFinish(okrObjective?.[0]?.finishedAt) === 1 ? "dia" : "dias"}
                </p>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.875rem",
                    color: "#444",
                  }}
                >
                  <Calendar1 variant='Outline' color='#7841B0' size={16} />{" "}
                  {utils.formatToDDMMAAAA(okrObjective?.[0]?.finishedAt)}
                </span>
              </div>
              <CircularProgressbarWithChildren
                value={allProgress ?? 0}
                styles={{
                  root: {
                    width: "3.375rem",
                    maxHeight: "3.375rem",
                    display: "flex",
                  },
                  path: {
                    stroke: "#7841B0",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    transform: "rotate(1turn)",
                    transformOrigin: "center center",
                  },
                  trail: {
                    stroke: "#444444",
                    strokeLinecap: "butt",
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <p style={{ fontSize: ".75rem", color: "#202128", fontWeight: "bold" }}>{allProgress}%</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>

            {/* {okrObjective && okrObjective.length !== 0 && <CommentsOkrComponent okrObjective={okrObjective[0]} uuid={uuid} refetch={refetchProject} />} */}

            <DefaultButton
              style={{ width: "100%", height: "2.375rem", minHeight: "2rem" }}
              animationSvg={"arrowRight"}
              onClick={() => handleEditOkr(okrObjective?.[0]?.id)}
            >
              Editar Objetivo <ArrowRight variant='Outline' width={16} height={16} />
            </DefaultButton>
          </OkrContent>
        </Okr>

        <ArrowRight
          variant='Outline'
          color='#7841B0'
          style={{
            width: "2rem",
            height: "2rem",
          }}
        />

        {okrObjective?.[0]?.okr?.map((kr: OkrProject) => (
          <Okr key={kr.id} style={{ position: "relative" }}>
            {userAllowed && (
              <button
                onClick={() => {
                  window.confirm("Você tem certeza que deseja deletar esse OKR?") &&
                    deleteOneOkr({ variables: { id: kr.id } })
                }}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <Trash variant='Outline' color='#DC2424' width={10} height={10} style={{
                  width: "1rem",
                  height: "1rem",
                }}/>
              </button>
            )}

            <OkrContent>
              <h3>{kr.title}</h3>
              <ChartKrs krs={kr} />

              <div
                style={{
                  width: "100%",
                  height: "auto",
                  borderBottom: "1px solid #7841B0",
                  borderTop: "1px solid #7841B0",
                  paddingBottom: "2rem",

                  paddingTop: "2rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {utils.calcStatusOkr(kr, okrObjective?.[0]) === "completed" && (
                  <>
                    <strong style={{ color: "#26C666" }}>ALCANÇADO</strong>
                    <Flag color='#26C666' size={"3rem"} />
                  </>
                )}
                {utils.calcStatusOkr(kr, okrObjective?.[0]) === "completedOutOfDate" && (
                  <>
                    <strong style={{ color: "#ED7D3A" }}>ALCANÇADO FORA DO PRAZO</strong>
                    <Flag color='#ED7D3A' size={"3rem"} />
                  </>
                )}
                {utils.calcStatusOkr(kr, okrObjective?.[0]) === "notCompleted" && (
                  <>
                    <strong style={{ color: "#DC2424" }}>NÃO ALCANÇADO</strong>
                    <Flag color='#DC2424' size={"3rem"} />
                  </>
                )}
                {utils.calcStatusOkr(kr, okrObjective?.[0]) === "running" && (
                  <div>
                    <h4>Progresso atual:</h4>
                    {/* <p>
                      {utils.calcDaysToFinish(kr.createdAt) === 1 ? "Falta" : "Faltam"}{" "}
                      <strong>{utils.calcDaysToFinish(kr.createdAt)}</strong>{" "}
                      {utils.calcDaysToFinish(kr.createdAt) === 1 ? "dia" : "dias"}
                    </p> */}
                  </div>
                )}
                {utils.calcStatusOkr(kr, okrObjective?.[0]) === "running" && (
                  <CircularProgressbarWithChildren
                    value={utils.calcProgressOkr(kr)}
                    styles={{
                      root: {
                        width: "3.375rem",
                        maxHeight: "3.375rem",
                        display: "flex",
                      },
                      path: {
                        stroke: "#7841B0",
                        strokeLinecap: "butt",
                        transition: "stroke-dashoffset 0.5s ease 0s",
                        transform: "rotate(1turn)",
                        transformOrigin: "center center",
                      },
                      trail: {
                        stroke: "#444444",
                        strokeLinecap: "butt",
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <p style={{ fontSize: ".75rem", color: "#202128", fontWeight: "bold" }}>
                        {utils.calcProgressOkr(kr)}%
                      </p>
                    </div>
                  </CircularProgressbarWithChildren>
                )}
              </div>
              <MagicMotion
                transition={{
                  duration: 0.1,
                  velocity: 0.1,
                }}
              >
                <CommentsOkrComponent kr={kr} uuid={uuid} refetch={refetchProject} />
              </MagicMotion>
            </OkrContent>

            <DefaultButton
              style={{
                width: "100%",
                height: "2.375rem",
                minHeight: "2rem",
              }}
              onClick={() => handleEditKr(kr.id)}
              animationSvg={"arrowRight"}
            >
              Editar Key Result <ArrowRight variant='Outline' width={"1rem"} height={16} />
            </DefaultButton>
          </Okr>
        ))}

        {/* Adiciona nova KR */}
        <AddButton onClick={() => setShowPopUpKr(true)}>
          Adicionar Key Result
          <AddCircle variant='Outline' />
        </AddButton>
      </OkrsContainer>
    </Container>
  )
}

const CommentsOkrComponent = ({ uuid, kr, refetch }: { uuid?: string; kr: OkrProject; refetch: Function }) => {
  const { userAllowed } = useContext(UserContext)

  const [comment, setComment] = useState<string | null>(null)
  const [createOneComment] = useMutation(CREATE_ONE_COMMENT_KR_IN_OKR, {
    onCompleted: () => {
      refetch()
      setComment(null)
    },
  })

  const [deleteOneCommentKr] = useMutation(DELETE_ONE_COMMENT_KR_IN_OKR, {
    onCompleted: () => {
      refetch()
      setComment(null)
    },
  })

  const handleSubmitComment = () => {
    if (!comment) {
      alert("Não é possível enviar uma anotação vazia")
      return
    }
    try {
      createOneComment({
        variables: {
          args: {
            krId: kr?.id,
            comments: { comment: comment },
            createdBy: uuid,
          },
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {kr.krComments?.map((comment: KrCommentProject) => (
        <UserMessageContainer key={comment.id}>
          <UserInfosContainer>
            <Image src={comment.user.avatarUrl} width={150} height={150} alt='profile' loading='lazy' />
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <h4
                  style={{
                    fontWeight: "light",
                    fontSize: ".75rem",
                    color: "#444",
                  }}
                >
                  {comment.user.nickName}
                </h4>
                <div>{utils.formatDateWithTimeZone(comment.createdAt)}</div>
              </div>
              {comment.user.uuid === uuid || userAllowed ? (
                <Trash
                  variant='Outline'
                  width={12}
                  height={12}
                  onClick={() => {
                    window.confirm("Você tem certeza que deseja deletar esse comentário?") &&
                      deleteOneCommentKr({ variables: { id: comment.id } })
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
              ) : null}
            </span>
          </UserInfosContainer>
          <p>{comment.comments.comment}</p>
        </UserMessageContainer>
      ))}
      <InputContainer>
        <input
          type='text'
          value={comment ?? ""}
          onChange={(event) => setComment(event.target.value)}
          placeholder='Digite sua anotação aqui'
        />

        <button onClick={() => handleSubmitComment()}>
          <ArrowRight variant='Outline' color='#F8F8F8' />
        </button>
      </InputContainer>
    </div>
  )
}
