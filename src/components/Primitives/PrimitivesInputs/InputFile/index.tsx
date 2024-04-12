import { InputContainer } from "./styles"
import React, { useRef, useState } from "react" // Importe o useRef do React
import { api } from "@/lib/axios"
import { useToast } from "@/contexts/ToastContext"
import { AddCircle } from "iconsax-react"

export interface InputFileProps {
  label?: string
  text?: string
  ref?: any
  fieldName: string // Change this line to ensure 'fieldName' is a non-nullable string
  pathreturn?: (path: string) => void // Passe o fieldName como argumento aqui
  sizereturn?: (size: string) => void // Passe o fieldName como argumento aqui
  mimetypereturn?: (mimeType: string) => void // Passe o fieldName como argumento aqui
  input?: {
    placeholder?: any
    required?: boolean
    onChange?: any
    onClick?: any
    onSubmit?: any
    onFocus?: any
    onBlur?: any
    maxLength?: number
    minLength?: number
    size?: number
    value?: any
    name?: string
    id?: string
    autoComplete?: string
    autoFocus?: boolean
    label?: string
    svg?: any
    style?: any
    ref?: any
    defaultValue?: any
    pattern?: string
    min?: any
    max?: any
    validate?: any
    onKeyPress?: any
    onKeyUp?: any
    [key: string]: any // Aceita outras props que não estão definidas
  }
  style?: any
  postPath: string
}

export function InputFile({ label, fieldName, ...rest }: InputFileProps) {
  // const { showSuccessToast, showErrorToast, showWarningToast } = useToast()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState("")

  const handleFileClick = () => {
    inputRef.current?.click() // Clique no input hidden
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] // Pega o primeiro arquivo selecionado

    if (file) {
      setFileName(file.name)
      try {
        const formData = new FormData()
        formData.append("file", file)
        const response = await api.post(rest.postPath, formData)
      const {  path, size, mimeType } = response.data
        rest.pathreturn && rest.pathreturn(path)
        rest.sizereturn && rest.sizereturn(size)
        rest.mimetypereturn && rest.mimetypereturn(mimeType)
        
   

        // showSuccessToast(file.name + " foi carregado com sucesso!")
      } catch (error: any) {
        console.log(error)
        // showErrorToast("erro ao fazer upload")
      }
    }
  }

  return (
    <InputContainer
      style={{
        cursor: "pointer",
        ...rest.style,
      }}
      {...rest}
    >
      {label && (
        <label
          style={{
            fontSize: "0.75rem",
          }}
        >
          {label}
        </label>
      )}
      <div onClick={handleFileClick}>
        <AddCircle variant='Outline' onClick={handleFileClick} />
        {fileName ? (
          <span
            style={{
              fontSize: "0.75rem",
              color: " #A1A1A5",
            }}
          >
            {fileName}
          </span>
        ) : (
          <span
            style={{
              fontSize: "0.75rem",
              color: "#A1A1A5",
            }}
          >
            Carregar arquivo
          </span>
        )}
      </div>

      <input type='file' {...rest} hidden ref={inputRef} onChange={handleFileChange}  />
    </InputContainer>
  )
}
