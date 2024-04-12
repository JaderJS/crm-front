import { ArrowRight, CloseCircle } from "iconsax-react"
import { Backdrop, ButtonsContainer, CloseButton, Container } from "./styles"
import { Primitives } from "@/components/Primitives"
import { DefaultButton } from "@/components/DefaultButton"
import { gql, useMutation, useQuery } from "@apollo/client"
import Swal from "sweetalert2"
import { api } from "@/lib/axios"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Utils } from "@/utils/utils"
import {
  Archives,
  ObjectiveUncheckedCreateInput,
  OkrProject,
  OkrProjectUncheckedCreateInput,
  Project,
  OkrObjectiveProject,
  OkrObjectiveProjectUncheckedUpdateInput,
  OkrProjectUncheckedUpdateInput,
  OkrProjectHistoryUncheckedCreateInput,
} from "@/types"
import CustomCheckbox from "@/components/CustomCheckbox"
import CustomSwitch from "@/components/CustomSwitch"

const UPDATE_ONE_KR_PROJECT_IN_EDIT_POPUP = gql`
  mutation updateOneKrProjectInEditPopUp($id: Int!, $args: OkrProjectUncheckedUpdateInput!) {
    updateOneOkrProject(data: $args, where: { id: $id }) {
      id
    }
  }
`

const FIND_UNIQUE_KR_PROJECT_IN_EDIT_POPUP = gql`
  query finUniqueKrProjectInEditPopUp($id: Int!) {
    okrProject(where: { id: $id }) {
      id
      title
      kr(orderBy: { createdAt: desc }) {
        progress
        target
      }
    }
  }
`

const CREATE_ONE_KR_PROJECT_HISTORY_IN_EDIT_POPUP = gql`
  mutation createOneKrProjectHistoryInEditPopUp($args: OkrProjectHistoryUncheckedCreateInput!) {
    createOneOkrProjectHistory(data: $args) {
      id
    }
  }
`

const SchemaFormDataCreateOkr = z.object({
  title: z.string().min(5, { message: "Adicione um titulo com no mínimo cinco caracteres" }),
  progress: z.number(),
  target: z.number(),
  finished: z.boolean(),
})

type SchemaFormDataCreateOkrProp = z.infer<typeof SchemaFormDataCreateOkr>

interface KrProject {
  okrProject: OkrProject
}

interface PopUpOkrProp {
  editKrId: number
  setEditKrId: React.Dispatch<React.SetStateAction<number | null>>
  project?: Project
  okrObjective?: OkrObjectiveProject
  refetch: Function
}

export function PopUpEditKrs({ project, editKrId, setEditKrId, okrObjective, refetch }: PopUpOkrProp) {
  if (!okrObjective) return

  const { uuid } = useContext(AuthContext)

  // const okrObjectiveProject = project?.okrObjectiveProject?.[0]?.okr.find((kr: OkrProject) => kr.id === editKrId)

  const { data: krProject } = useQuery<KrProject>(FIND_UNIQUE_KR_PROJECT_IN_EDIT_POPUP, {
    variables: { id: editKrId },
    skip: editKrId === undefined,
    fetchPolicy: "no-cache",
  })
  const [updateOneKr] = useMutation(UPDATE_ONE_KR_PROJECT_IN_EDIT_POPUP)
  const [createOneKrHistory] = useMutation(CREATE_ONE_KR_PROJECT_HISTORY_IN_EDIT_POPUP, {
    onCompleted: () => {
      setEditKrId(null)
      refetch()
    },
  })

  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SchemaFormDataCreateOkrProp>({
    resolver: zodResolver(SchemaFormDataCreateOkr),
  })

  useEffect(() => {
    reset({
      title: krProject?.okrProject.title || "",
      progress: krProject?.okrProject.kr?.[0]?.progress ?? 0,
      target: krProject?.okrProject.kr?.[0]?.target ?? 0,
      finished: false,
    })
  }, [krProject])

  const submit = async (data: SchemaFormDataCreateOkrProp) => {
    try {
      updateOneKr({
        variables: {
          id: editKrId,
          args: {
            title: { set: data.title },
            createdBy: { set: uuid },
          },
        },
      })

      createOneKrHistory({
        variables: {
          args: {
            krId: editKrId,
            target: data.target,
            progress: data.progress,
            createdBy: uuid,
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Backdrop>
      <form
        id='createOkrProject'
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Container>
          <h3>Edição do key result</h3>

          <CloseButton onClick={() => setEditKrId(null)}>
            <CloseCircle variant='Outline' />
          </CloseButton>

          <Primitives
            componentName='SmallText'
            smallTextProps={{
              input: {
                value: watch("title"),
                placeholder: "Insira seu titulo",
                onChange: (e: any) => setValue("title", e.target.value),
              },
              label: "Titulo*",
            }}
          />
          {errors.title && <span>{errors.title.message}</span>}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "1.25rem",
            }}
          >
            <Primitives
              componentName='SmallText'
              smallTextProps={{
                input: {
                  type: "number",
                  value: watch("progress"),
                  placeholder: "Insira uma porcentagem para o progresso da okr",
                  onChange: (e: any) => {
                   setValue("progress", Number(e.target.value))
                  },
                  // minLength: 0,
                  // maxLength: 100,
                },
                label: "Alvo",
              }}
            />
            <Primitives
              componentName='SmallText'
              smallTextProps={{
                input: {
                  type: "number",
                  value: watch("target"),
                  placeholder: "Insira uma porcentagem para o progresso da okr",
                  onChange: (e: any) => {
                    setValue("target", Number(e.target.value))
                  },
                  // minLength: 0,
                  // maxLength: 100,
                },
                label: "Atual",
              }}
            />
          </div>
          {errors.progress && <span>{errors.progress.message}</span>}

          {/* <CustomSwitch
            checked={watch("finished")}
            key={"finished"}
            onClick={() => setValue("finished", !watch("finished"))}
            label="Concluída"
          /> */}
          <ButtonsContainer>
            <DefaultButton onClick={() => setEditKrId(null)}>Cancelar</DefaultButton>

            <DefaultButton onClick={handleSubmit(submit)} svgSize={"small"} animationSvg={"arrowRight"} type='button'>
              Salvar Informações <ArrowRight />
            </DefaultButton>
          </ButtonsContainer>
        </Container>
      </form>
    </Backdrop>
  )
}
