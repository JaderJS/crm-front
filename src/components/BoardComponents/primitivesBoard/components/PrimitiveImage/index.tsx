import { InputContainer } from "./styles"

import { Slash, CopySuccess, DocumentDownload, Trash } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { ChangeEvent, ElementType, InputHTMLAttributes, ReactNode, forwardRef, useEffect, useId, useState } from "react"

import { BaseMutationOptions } from "@apollo/client"
import { UploadProfile as UploadAsset, SearchAssets, api } from "@/lib/axios"
import Image from "next/image"

import Swal from "sweetalert2"
import { FieldsValue } from "@/types"
import { useRef } from "react"
import { DefaultButton } from "@/components/DefaultButton"
import { toast } from "react-toastify"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
const MAX_FILE_SIZE = 1024 * 1024 * 5

type Field = FieldsValue[]

type PrimitiveImageProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  description?: string
  response?: BaseMutationOptions
  onFetch?: (resp: UploadAsset) => void
  children?: ReactNode
  field?: Field
  refetch?: Function
  disabled?: boolean
  modified?: { name?: string; updatedAt: any; uuid: string }
  loading?: boolean
  errorBoolean?: boolean | null
  successBoolean?: boolean | null
}

type PrimitiveImageValue = {
  path: string
  mimeType: string
  size: string
  pathUrl: string
}

export const PrimitiveImage = forwardRef<HTMLInputElement, PrimitiveImageProps>(
  (
    {
      description,
      response,
      type = "file",
      label = "UNKNOWN",
      children,
      onFetch,
      field,
      disabled = false,
      loading = false,
      errorBoolean = false,
      successBoolean = false,
      ...props
    }: PrimitiveImageProps,
    ref,
  ) => {
    const completed = response?.awaitRefetchQueries
    const error = response?.errorPolicy

    const [resp, setResp] = useState<UploadAsset | undefined>(undefined)
    const [search, setSearch] = useState<SearchAssets | undefined>(undefined)
    const inputRef = useRef<HTMLInputElement>(null)
    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }
      if (file.size >= MAX_FILE_SIZE) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          },
        }).fire({ icon: "warning", title: "Arquivo não deve ultrapassar 5Mb" })
        return
      }
      const formData = new FormData()
      formData.append("file", file)
      const teste = api
        .post("upload/assets", formData)
        .then((response: UploadAsset) => {
          setResp(response)
          onFetch?.(response)
          props.refetch?.()
        })
        .catch((error) => setResp(error))
      toast.promise(teste, {
        pending: "Enviando",
        success: "Enviado com sucesso",
        error: "Erro ao enviar",
      })
    }
    useEffect(() => {
      const lastFieldValue: PrimitiveImageValue = field?.[field?.length - 1]?.content?.value

      // Verifique se lastFieldValue existe antes de tentar acessar suas propriedades
      if (!lastFieldValue || !lastFieldValue.path) {
        setSearch(undefined)
        return
      }

      api.post("search/asset", { path: lastFieldValue.path }).then((response: SearchAssets) => setSearch(response))
    }, [field])

    return (
      <InputContainer>
        <SuccessAndErrorSvgContainer>
          {error && <Slash color='#E0465C' />}
          {completed && <CopySuccess color='#00C48C' />}
        </SuccessAndErrorSvgContainer>
        {label && <label>{label}</label>}
        {description && <span>{description}</span>}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.8rem", width: "100%" }}>
          {search?.data.pathUrlDownload && <PrimitiveImageAction src={search?.data.pathUrlDownload} />}
          {!disabled && (
            <DefaultButton
              type='button'
              onClick={() => inputRef.current?.click()}
              backgroundColor={"white"}
              hover={"Gray"}
              style={{
                backgroundColor: "#fff",
                width: "100%",
              }}
            >
              {search?.data.pathUrlDownload ? (
                <p style={{ color: "#444444", fontSize: "0.8rem" }}>Alterar</p>
              ) : (
                <p style={{ color: "#444444", fontSize: "0.8rem" }}>Enviar</p>
              )}
            </DefaultButton>
          )}
          <input
            id='file'
            ref={inputRef}
            type={type}
            onChange={(event) => handleInputFile(event)}
            accept='.png, .jpg, .jpeg'
            hidden
            {...props}
          />
          {children}
        </div>
            {props.modified && props.modified.name && <span style={{ fontSize: ".65rem" }}>Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

      </InputContainer>
    )
  },
)

type PrimitiveImageActionProps = InputHTMLAttributes<HTMLImageElement> & {
  src: string
}

export const PrimitiveImageAction = forwardRef<HTMLImageElement, PrimitiveImageActionProps>(
  ({ src }: PrimitiveImageActionProps, ref) => {
    return (
      <>
        <Image
          src={src}
          alt='Imagem'
          ref={ref}
          width={120}
          height={120}
          quality={80}
          onClick={() => window.open(src, "_blank")}
          style={{
            borderRadius: "0.5rem",
            cursor: "pointer",
            objectFit: "contain",
            border: "1px solid #E5E5E5",
            backgroundImage: src ? `url(${src})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "multiply",
          }}
        />
      </>
    )
  },
)
