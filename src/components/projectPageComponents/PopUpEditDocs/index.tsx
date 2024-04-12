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
import { error } from "console"
import { Utils } from "@/utils/utils"
import { Archives } from "@/types"

const utils = new Utils()

interface PopUpUploadDocsProps {
  closePopUp: () => void
  projectId: number
  successReturn: (success: boolean) => void
  docId: number
}

const FIND_UNIQUE_ARCHIVE_EDIT_DOCUMENT = gql`
query findUniqueArchiveEditDocument ($archivedId: Int!){
  findUniqueArchives(where: {id:$archivedId}) {
    id
    name
    description
    size
    typeFile
    mimeType
    cash
    path
    createdBy
    createdAt
    updatedAt
  }
}
`

const UPDATE_ONE_ARCHIVE_EDIT_DOCUMENT = gql`
mutation updateOneArchiveEditDocument($name:String!,$cash:Float!, $typeFile: typeFile!, $archivedId: Int!, $uuid:String! ){
  updateOneArchives(data: {name:{set:$name}, cash:{set:$cash}, typeFile:{set:$typeFile}, createdBy:{set:$uuid}}, where:{id:$archivedId} ) {
    id
  }
}`

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

interface ArchivedData {
  findUniqueArchives: Archives
}

export function PopUpEditDocs({ closePopUp, projectId, successReturn, docId }: PopUpUploadDocsProps) {
  const { uuid } = useContext(AuthContext)
  const { data: archived } = useQuery<ArchivedData>(FIND_UNIQUE_ARCHIVE_EDIT_DOCUMENT, { variables: { archivedId: Number(docId) }, skip: docId === undefined })
  const [updateOneArchived] = useMutation(UPDATE_ONE_ARCHIVE_EDIT_DOCUMENT)

  const {
    register,
    setValue,
    formState: { errors, isLoading },
    handleSubmit,
    watch,
    reset,

  } = useForm<SchemaFormDataProp>({
    resolver: zodResolver(SchemaFormData),
  })

  useEffect(() => {
    reset({
      projectId,
      createdBy: uuid,
      description: archived?.findUniqueArchives.description,
      cash: archived?.findUniqueArchives.cash,
      typeFile: archived?.findUniqueArchives.typeFile as any,
      name: archived?.findUniqueArchives.name,
      mimeType: archived?.findUniqueArchives.mimeType,
      path: archived?.findUniqueArchives.path,
      size: archived?.findUniqueArchives.size
    })
  }, [archived])


  const submit = async (data: SchemaFormDataProp) => {

    try {
      await updateOneArchived({
        variables: {
          ...data, uuid, archivedId: docId
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
      toast: true,
      title,
      text,
    })
  }

  const selectOptions = [
    { value: "CONTRATO", label: "Contrato" },
    { value: "BOLETO", label: "Boleto bancário" },
    { value: "NF", label: "Nota fiscal" },
  ]

  const initialSelectFromServer = archived?.findUniqueArchives.typeFile

  return (
    <Backdrop>
      <form
        id='editDoc'
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
                value: watch("name"),
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
                value: watch("cash"),
                placeholder: "Valor do documento*",
                onChange: (e: any) => setValue("cash", e.target.value),
              },
              label: "Valor do documento caso tenha*",
            }}
          />

          <Primitives
            componentName='SelectFWOWhite'
            selectPropsWhite={{
              options: selectOptions,
              defaultValue: initialSelectFromServer ?? null,
              optionWidth: "100%",
              placeholder: "Tipo de documento*",
              label: "Tipo de documento*",
              onChange: ({ value }) => {
                setValue("typeFile", value)
              },
              menuWidth: "100%",


            }}

          />
          <ButtonsContainer>
            <DefaultButton
              onClick={() => { closePopUp() }}
            >
              Cancelar
            </DefaultButton>
            <DefaultButton
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