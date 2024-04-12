import { AddArquiveBtn, ContentDownload, FileInputContainer, InputContainer } from "./styles"

import { Slash, CopySuccess, DocumentDownload, Trash, AddCircle, Import } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { ChangeEvent, ElementType, InputHTMLAttributes, ReactNode, forwardRef, useEffect, useId, useState } from "react"

import { BaseMutationOptions } from "@apollo/client"
import { UploadProfile as UploadAsset, SearchAssets, api } from "@/lib/axios"
import { FieldsValue } from "@/types"
import { toast } from "react-toastify"
import { Locale, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RotatingLines } from "react-loader-spinner"

const MAX_FILE_SIZE = 1024 * 1024 * 7

type Field = FieldsValue[]

type PrimitiveAttachmentProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  description?: string
  disabled?: boolean
  response?: BaseMutationOptions
  onFetch?: (resp: UploadAsset) => void
  children?: ReactNode
  field?: Field
    modified?: { name?: string; updatedAt: any; uuid: string }
  successBoolean?: boolean | null
  errorBoolean?: boolean | null
  loading?: boolean
}

export type fieldValue = {
  pathUrl: string
  mimeType: string
  size: string
  fileName: string
  path?: string
}

export const PrimitiveAttachment = forwardRef<HTMLInputElement, PrimitiveAttachmentProps>(
  (
    {
      description,
      response,
      type = "file",
      label = "UNKNOWN",
      children,
      onFetch,
      field,
      loading = false,
      disabled = false,
      successBoolean = false,
      errorBoolean = false,
      ...props
    }: PrimitiveAttachmentProps,
    ref,
  ) => {

    const id = useId()

    const completed = response?.awaitRefetchQueries
    const error = response?.errorPolicy

    const [search, setSearch] = useState<SearchAssets | undefined>(undefined)
    const [path, setPath] = useState<string | undefined>(undefined)
    
    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }

      if (file.size >= MAX_FILE_SIZE) {
        toast.error("Arquivo não deve ultrapassar 7Mb", { icon: "💾" })
        return
      }
      const formData = new FormData()
      formData.append("file", file)
      const teste = api
        .post("upload/assets", formData)
        .then((response: UploadAsset) => {

          setTimeout(() => {
            onFetch && onFetch(response)
          }, 400)
        })
        .catch((error) => console.error(error))
      toast.promise(teste, {
        pending: "Enviando...",
        success: "Enviado com sucesso",
        error: "Erro ao enviar",
      })
    }

    const getFile = ({ path }: { path: string }) => {
      if (path) {
        api
          .post("search/asset", { path: path })
          .then((response: SearchAssets) => setSearch(response))
          .catch((error) => console.error(error))
      }
    }

    const lastFieldValue: fieldValue = field?.[field?.length - 1]?.content?.value

    useEffect(() => {
      if (
        !lastFieldValue?.path ||
        lastFieldValue?.path === "" ||
        lastFieldValue === null ||
        lastFieldValue === undefined
      ) {
        setSearch(undefined)
        return
      }
      getFile({ path: lastFieldValue?.path })
    }, [field])

    return (
      <InputContainer>
        <SuccessAndErrorSvgContainer>{completed && <CopySuccess color='#00C48C' />}</SuccessAndErrorSvgContainer>
        {label && <label htmlFor={id}>{label}</label>}
        {description && <span>{description}</span>}
        {loading && <RotatingLines />}
        <ContentDownload>
          {lastFieldValue?.path && search && (
            <PrimitiveAttachmentAction icon={Import} path={search?.data.pathUrlDownload} />
          )}
          {lastFieldValue && (
            <span>
              {lastFieldValue.fileName} - {lastFieldValue.mimeType}
            </span>
          )}

          {!search && (
            <AddArquiveBtn htmlFor={id}>
              <AddCircle />

              <span>Carregar arquivo</span>
            </AddArquiveBtn>
          )}
          {search && !disabled && children}
          <p></p>
        </ContentDownload>

        <input id={id} ref={ref} type="file" onChange={(event) => handleInputFile(event)} {...props} />

            {props.modified && props.modified.name && <span style={{ fontSize: ".65rem" }}>Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

      </InputContainer >
    )
  },
)

type PrimitiveAttachmentActionProps = InputHTMLAttributes<HTMLDivElement> & {
  path?: string
  icon: ElementType
  action?: "DOWNLOAD" | "DELETE"
}

export const PrimitiveAttachmentAction = forwardRef<HTMLDivElement, PrimitiveAttachmentActionProps>(
  ({ path, icon: Icon, type = "button", action = "DOWNLOAD", ...props }: PrimitiveAttachmentActionProps, ref) => {
    return (
      <>
        {action === "DOWNLOAD" && (
          <div ref={ref} {...props}>
            <a
              href={path}
              target='_blank'
              rel='noreferrer'
              style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.8rem", marginLeft: "1rem" }}
            >
              <button
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.8rem",
                  backgroundColor: "#FFF",
                  border: "none",
                }}
              >
                <Icon color='#7841B0' style={{ width: "1rem", height: "1rem" }} />
              </button>
            </a>
          </div>
        )}

        {action === "DELETE" && (
          <div
            ref={ref}
            {...props}
            style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.8rem", marginRight: "1rem" }}
          >
            <button
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.8rem",
                backgroundColor: "#FFF",
                border: "none",
              }}
            >
              <Icon color='#DC2424' style={{ width: "1rem", height: "1rem" }} />
            </button>
          </div>
        )}
      </>
    )
  },
)
