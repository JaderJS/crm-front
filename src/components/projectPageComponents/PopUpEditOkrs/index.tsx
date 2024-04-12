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
import { Archives, ObjectiveUncheckedCreateInput, OkrProject, OkrProjectUncheckedCreateInput, Project, OkrProjectUncheckedUpdateInput, OkrObjectiveProject, OkrObjectiveProjectUncheckedUpdateInput } from "@/types"
import CustomCheckbox from "@/components/CustomCheckbox"
import CustomSwitch from "@/components/CustomSwitch"


const OKR_OBJECTIVE_PROJECT_EDIT_POPUP = gql`
query okrObjectiveProjectEditPopUp($id: Int!){
  okrObjectiveProject(where: {id:$id}) {
    id
    title
    description
    finishedAt
    
    okr(orderBy:{createdAt:desc}, take:1) {
      id
    }
  }
}
`

const CREATE_ONE_OKR_PROJECT_EDIT_POPUP = gql`
mutation createOneOkrProjectEditPopUp($args:OkrProjectUncheckedCreateInput!){
  createOneOkrProject(data: $args) {
    id
  }
}`

const UPDATE_ONE_OKR_OBJECTIVE_EDIT_POPUP = gql`
mutation updateOneOkrProjectEditPopUp($id:Int!, $args:OkrObjectiveProjectUncheckedUpdateInput!){
  updateOneOkrObjectiveProject(data: $args, where:{id:$id} ) {
    id
  }
}`


const SchemaFormDataCreateOkr = z.object({
  title: z.string().min(5, { message: "Adicione um titulo com no mínimo cinco caracteres" }),
  description: z.string().min(10, { message: "Adicione uma descrição com no mínimo 10 caracteres" }),
  finishedAt: z.string().datetime(),
  finished: z.boolean(),
})

type SchemaFormDataCreateOkrProp = z.infer<typeof SchemaFormDataCreateOkr>

interface okrProject {
  okrObjectiveProject: OkrObjectiveProject
}


interface PopUpOkrProp {
  editOkrId: number
  setEditOkrId: React.Dispatch<React.SetStateAction<number | null>>
  project?: Project
  okrObjective?: OkrObjectiveProject
  refetch: Function
}


export function PopUpEditOkr({ project, setEditOkrId, editOkrId, refetch }: PopUpOkrProp) {
  const { uuid } = useContext(AuthContext)
  const [updateOneObjectiveOkr] = useMutation(UPDATE_ONE_OKR_OBJECTIVE_EDIT_POPUP)

  const okrObjectiveProject = project?.okrObjectiveProject?.[0]

  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SchemaFormDataCreateOkrProp>({
    resolver: zodResolver(SchemaFormDataCreateOkr)
  })

  useEffect(() => {
    reset({
      title: okrObjectiveProject?.title || "",
      description: okrObjectiveProject?.description || "",
      finishedAt: okrObjectiveProject?.finishedAt || null,
      finished: false
    });
  }, [okrObjectiveProject])

  const submit = async (data: SchemaFormDataCreateOkrProp) => {
    try {
      await updateOneObjectiveOkr({
        variables: {
          id: editOkrId,
          args: {
            title: { set: data.title },
            description: { set: data.description },
            finishedAt: { set: data.finishedAt },
            createdBy: { set: uuid },
          }
        }
      })
      refetch()
      setEditOkrId(null)
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
          <h3>Edição do Objetivo</h3>

          <CloseButton onClick={() => setEditOkrId(null)}>
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

          <Primitives
            componentName='BigText'
            bigTextProps={{
              input: {
                value: watch("description"),
                placeholder: "Insira uma descrição detalhada da okr",
                onChange: (e: any) => setValue("description", e.target.value),
              },
              label: "Descrição",
            }}
          />
          {errors.description && <span>{errors.description.message}</span>}

          <Primitives
            componentName='DateInput'
            dateInputProps={{
              defaultValue: watch("finishedAt"),
              onChange(date) {
                if (date !== null) {
                  setValue("finishedAt", date);
                }
              },
              label: "Prazo",
            }}
          />
          {errors.finishedAt && <span>{errors.finishedAt.message}</span>}

          <CustomSwitch
            checked={watch("finished")}
            key={"finished"}
            onClick={() => setValue("finished", !watch("finished"))}
            label="Concluída"
          />
          <ButtonsContainer>
            <DefaultButton onClick={() => setEditOkrId(null)}>Cancelar</DefaultButton>

            <DefaultButton onClick={handleSubmit(submit)} svgSize={"small"} animationSvg={"arrowRight"} type='button'>
              Salvar Informações <ArrowRight />
            </DefaultButton>
          </ButtonsContainer>
        </Container>
      </form>
    </Backdrop>
  )
}