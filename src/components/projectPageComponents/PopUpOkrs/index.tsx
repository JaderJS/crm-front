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
  OkrProject,
  Project,
  OkrObjectiveProjectUncheckedCreateInput,
} from "@/types"
import CustomCheckbox from "@/components/CustomCheckbox"
import { title } from "process"
import CustomSwitch from "@/components/CustomSwitch"

const CREATE_ONE_OKR_OBJECTIVE_POPUP = gql`
  mutation createOneOkrObjectivePopUp($args: OkrObjectiveProjectUncheckedCreateInput!) {
    createOneOkrObjectiveProject(data: $args) {
      id
    }
  }
`

const SchemaFormDataCreateOkr = z.object({
  title: z.string().min(5, { message: "Adicione um titulo com no mínimo cinco caracteres" }),
  description: z.string().min(10, { message: "Adicione uma descrição com no mínimo 10 caracteres" }),
  finishedAt: z.string().datetime(),
  finished: z.boolean()
})

type SchemaFormDataCreateOkrProp = z.infer<typeof SchemaFormDataCreateOkr>

interface PopUpOkrProp {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  project: Project
  refetch: Function
}

export function PopUpOkr({ project, setShow, refetch }: PopUpOkrProp) {
  const { uuid } = useContext(AuthContext)

  const [createOneObjectiveOkr] = useMutation(CREATE_ONE_OKR_OBJECTIVE_POPUP, { onCompleted: () => { setShow(false); refetch() } })

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SchemaFormDataCreateOkrProp>({
    resolver: zodResolver(SchemaFormDataCreateOkr),
    defaultValues: {
      finished: false,
    },
  })



  const submit = async (data: SchemaFormDataCreateOkrProp) => {
    console.log(project, data)
    try {
      await createOneObjectiveOkr({
        variables: {
          args: {
            projectId: project.id,
            title: data.title,
            description: data.description,
            finishedAt: data.finishedAt,
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

          <h3>Criar nova OKR</h3>

          <CloseButton onClick={() => setShow(false)}>
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
              value: watch("finishedAt"),
              onChange(date) {
                if (date !== null) {
                  setValue("finishedAt", date)
                }
              },
              label: "Prazo",
            }}
          />
          {errors.finishedAt && <span>{errors.finishedAt.message}</span>}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "1.25rem",
            }}
          >
          </div>

          <ButtonsContainer>
            <DefaultButton onClick={() => setShow(false)}>Cancelar</DefaultButton>

            <DefaultButton onClick={handleSubmit(submit)} svgSize={"small"} animationSvg={"arrowRight"} type='button'>
              Salvar Informações <ArrowRight />
            </DefaultButton>

          </ButtonsContainer>
        </Container>
      </form>
    </Backdrop>
  )
}