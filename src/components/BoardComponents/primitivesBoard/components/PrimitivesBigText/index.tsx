import { UseFormRegister } from "react-hook-form"
import { InputContainer } from "./styles"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { CopySuccess, Slash } from "iconsax-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DetailedHTMLProps, ForwardedRef, InputHTMLAttributes, LegacyRef, ReactNode, TextareaHTMLAttributes, forwardRef, useState } from "react"
import { BaseMutationOptions } from "@apollo/client"
import { Field } from "@/types"
import { RotatingLines } from "react-loader-spinner"
import { debounce } from "lodash"

export interface PrimitivesBigText {
  label?: string
  text?: string
  description?: string
  ref?: any
  name?: string
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
  id?: string
  autoComplete?: string
  autoFocus?: boolean
  svg?: any
  style?: any
  defaultValue?: any
  pattern?: string
  min?: any
  max?: any
  validate?: any
  onKeyPress?: any
  onKeyUp?: any
  register?: UseFormRegister<any>
  [key: string]: any // Aceita outras props que não estão definidas
  any?: any
  errorBoolean?: boolean | null
  errorMessage?: string
  successBoolean?: boolean | null
  modified?: { name?: string; updatedAt: any; uuid: string }
}

export function PrimitivesBigText({ label, description, ...props }: PrimitivesBigText & { [key: string]: any }) {
  return (
    <InputContainer>
      <SuccessAndErrorSvgContainer>
        {props.errorBoolean && <Slash color='#E0465C' />}
        {props.successBoolean && <CopySuccess color='#00C48C' />}
      </SuccessAndErrorSvgContainer>
      {label && <label>{label}</label>}
      {description && <span>{description}</span>}
      <textarea {...props} {...props.register} onBlur={props.onBlur} />

      {props.modified && props.modified.name && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </InputContainer>
  )
}

type FieldValue = {
  value: string
}


type PrimitiveLongTextProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  description?: string
  disabled?: boolean
  response?: BaseMutationOptions
  onDebounce?: (response: FieldValue) => void
  children?: ReactNode
  field?: Field
    modified?: { name?: string; updatedAt: any; uuid: string }
  successBoolean?: boolean
  errorBoolean?: boolean
  loading?: boolean
}
export const PrimitiveLongText = forwardRef<HTMLTextAreaElement, PrimitiveLongTextProps>(({ label, description, errorBoolean = false, successBoolean = false, loading = false, modified, onDebounce, ...props }, ref) => {

  const onChange = (event: any) => {
    onDebounce?.(event.target.value)
  }
  const debouncedOnChange = debounce(onChange, 1400)

  return (
    <InputContainer>

      <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
        {loading && <RotatingLines />}
      </SuccessAndErrorSvgContainer>

      {label && <label>{label}</label>}
      {description && <span>{description}</span>}

      <textarea {...props} ref={ref} onChange={debouncedOnChange} />

      {modified && modified.name && 
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {modified?.name} {format(new Date(modified?.updatedAt), "PPp", { locale: ptBR })}
        </span>
      }
    </InputContainer>
  )
})

