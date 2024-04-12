import { ArrowRight, CloseCircle } from "iconsax-react"
import { Backdrop, ButtonsContainer, CloseButton, Container } from "./styles"
import { Primitives } from "@/components/Primitives"
import { DefaultButton } from "@/components/DefaultButton"
import { gql, useMutation } from "@apollo/client"
import Swal from "sweetalert2"
import { api } from "@/lib/axios"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { error } from "console"
import { Utils } from "@/utils/utils"

const utils = new Utils()

interface PopUpUploadDocsProps {
  closePopUp: () => void

  projectId: number
  successReturn: (success: boolean) => void
}

const CREATE_ONE_ARCHIVE_DOCUMENT = gql`
  mutation createOneArchiveDocument($args: ArchivesUncheckedCreateInput!) {
    createOneArchives(data: $args) {
      id
    }
  }
`

const MAX_UPLOAD_MBYTES = 12 * 1024

interface FormData {
  projectId: number
  name: string
  path: any
  size: any
  createdBy: string
  typeFile: any
  description: string
  mimeType: any
  cash: GLfloat
}

const SchemaFormData = z.object({
  projectId: z.number(),
  name: z.string().min(5, { message: "Nome muito curto" }),
  path: z.string().min(5, { message: "Erro no upload" }),
  size: z.string(),
  createdBy: z.string().nullable(),
  typeFile: z.enum(["NF", "BOLETO", "CONTRATO"]),
  description: z.string(),
  mimeType: z.string(),
  cash: z.coerce.number().nonnegative(),
})

type SchemaFormDataProp = z.infer<typeof SchemaFormData>

export function PopUpUploadDocs({ closePopUp, projectId, successReturn }: PopUpUploadDocsProps) {
  const { uuid } = useContext(AuthContext)
  const [createOneArchive] = useMutation(CREATE_ONE_ARCHIVE_DOCUMENT)
  const userUuid = uuid
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SchemaFormDataProp>({
    resolver: zodResolver(SchemaFormData),
    defaultValues: {
      projectId,
      createdBy: userUuid,
      description: "",
    },
  })



  // useEffect(() => {
  //   setValue("createdBy", uuid ?? null)
  // }, [uuid])

  const submit = async (data: SchemaFormDataProp) => {
 
    try {
      await createOneArchive({
        variables: {
          args: {
            ...data,
          },
        },
      })
      successReturn(true)
    } catch (error: any) {
      console.error(error.message)
      ComponentAlert({
        title: "Erro ao salvar",
        text: error.message,
      })
    }
  }

  const ComponentAlert = ({ title, text }: { title: string; text: string }) => {
    Swal.fire({
      icon: "warning",
      title,
      text,
    })
  }

  // Função para formatar valor monetário
  // const formatCurrency = (value: string): number => {
  //   const numericValue = value.replace(/[^0-9,]/g, '');
  //   const dotValue = numericValue.replace(',', '.');
  //   const numberValue = parseFloat(dotValue);

  //   if (!isNaN(numberValue)) {
  //     return numberValue;
  //   }

  //   // Se o número não for válido, você pode retornar NaN ou outro valor padrão,
  //   // dependendo do comportamento desejado.
  //   return NaN;
  // };

  // const formatNumberAsCurrency = (value: number): string => {
  //   const formattedValue = new Intl.NumberFormat('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL',
  //   }).format(value);

  //   return formattedValue;
  // };

  return (
    <Backdrop>
      <form
        id='uploadDoc'
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
          <CloseButton onClick={closePopUp}>
            <CloseCircle variant='Outline' />
          </CloseButton>
          <Primitives
            componentName='SmallText'
            smallTextProps={{
              input: {
                placeholder: "Nome do documento*",
                onChange: (e: any) => setValue("name", e.target.value),
              },
              label: "Nome do documento*",
            }}
          />

          <Primitives
            componentName='SmallText'
            smallTextProps={{
              input: {
                type: "number",
                placeholder: "Valor do documento*",
                onChange: (e: any) => setValue("cash", e.target.value),
              },
              label: "Valor do documento caso tenha*",
            }}
          />
          <Primitives
            componentName='InputFile'
            inputFileProps={{
              fieldName: "document",
              // input: {
              //   onChange: (e: any) => console.log("change", e.target.value),
              // },
              mimetypereturn: (mimeType: string) => setValue("mimeType", mimeType),
              pathreturn: (path: string) => setValue("path", path),
              sizereturn: (size: string) => setValue("size", size),
              label: "Arquivo* (PDF, JPG, DOC OU PNG)*",
              postPath: "/upload/assets",
            }}
          />
          <Primitives
            componentName='SelectFWOWhite'
            selectPropsWhite={{
              options: [
                { value: "CONTRATO", label: "Contrato" },
                { value: "BOLETO", label: "Boleto bancário" },
                { value: "NF", label: "Nota fiscal" },
              ],
              menuWidth: "100%",
              placeholder: "Tipo de documento*",
              label: "Tipo de documento*",
              onChange: ({ value }) => {
                setValue("typeFile", value)
              },
             optionWidth: "100%",
            }}
          />
          <ButtonsContainer>
            <DefaultButton
              onClick={() => {
                closePopUp()
              }}
            >
              Cancelar
            </DefaultButton>
            <DefaultButton
              // onClick={() => {
              //   if (formData.name && formData.path && formData.size && formData.typeFile && formData.mimeType) {
              //     handleSubmitFile()
              //     closePopUp()
              //   } else {
              //     ComponentAlert({
              //       title: "Campos obrigatórios",
              //       text: "Preencha todos os campos obrigatórios",
              //     })
              //   }
              // }}
              onClick={handleSubmit(submit)}
              svgSize={"small"}
              animationSvg={"arrowRight"}
              type='button'
            >
              Salvar Informações <ArrowRight />
            </DefaultButton>
          </ButtonsContainer>
        </Container>
      </form>
    </Backdrop>
  )
}
