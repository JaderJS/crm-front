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
  OkrProjectUncheckedCreateInput,
  Project,
  OkrProjectHistoryUncheckedCreateInput,
} from "@/types"
import CustomCheckbox from "@/components/CustomCheckbox"
import { title } from "process"
import CustomSwitch from "@/components/CustomSwitch"


const CREATE_ONE_KR_PROJECT_HISTORY_IN_POPUP = gql`
mutation createOneKrProjectHistoryInPopUp($args: OkrProjectHistoryUncheckedCreateInput!){
  createOneOkrProjectHistory(data: $args) {
    id
  }
}`

const CREATE_ONE_KR_POPUP = gql`
mutation createOnekrProjectPopUp($args: OkrProjectUncheckedCreateInput!) {
  createOneOkrProject(data: $args) {
    id
  }
}`

const SchemaFormDataCreateOkr = z.object({
  title: z.string().min(5, { message: "Adicione um titulo com no mínimo cinco caracteres" }),
  progress: z.number().nonnegative({ message: "Adicione um numero válido" }),
  target: z.number().nonnegative({ message: "Adicione um numero válido" }),
  finished: z.boolean(),
})

type SchemaFormDataCreateOkrProp = z.infer<typeof SchemaFormDataCreateOkr>

interface PopUpOkrProp {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  project?: Project
  refetch: Function
}

export function PopUpKrs({ project, setShow, refetch }: PopUpOkrProp) {
  const { uuid } = useContext(AuthContext)

  const okrObjectiveProject = project?.okrObjectiveProject?.[0]
  const [createOneKrHistory] = useMutation(CREATE_ONE_KR_PROJECT_HISTORY_IN_POPUP, { onCompleted: () => { setShow(false); refetch() } })
  const [createOneOkr] = useMutation(CREATE_ONE_KR_POPUP)

  const {
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

  useEffect(() => { console.log(errors) }, [errors])


  const submit = async (data: SchemaFormDataCreateOkrProp) => {
    console.log(project, data)
    try {
      const createOneKr = await createOneOkr({
        variables: {
          args: {
            objectiveId: okrObjectiveProject?.id,
            title: data.title,
            createdBy: uuid,
          },
        },
      })
      createOneKrHistory({
        variables: {
          args: {
            krId: createOneKr.data.createOneOkrProject.id,
            target: data.target,
            progress: data.progress,
            createdBy: uuid
          }
        }
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
              label: "Título KR",
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
                    onChange: (e: any) => {
                      const value = Number(e.target.value)
                      if (value >= 0 && value <= 1000000) {
                        setValue("progress", value)
                      } else {
                        alert("Valor inválido")
                      }
                    },
                    minLength: 0,
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
                    onChange: (e: any) => {
                      const value = Number(e.target.value)
                      if (value >= 0 && value <= 1000000) {
                        setValue("target", value)
                      } else {
                        alert("Valor inválido")
                      }
                    },
                    minLength: 0,
                    // maxLength: 100,
                  },
                  label: "Atual",
                }}
              />
            </div>
            {errors.progress && <span>{errors.progress.message}</span>}

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
