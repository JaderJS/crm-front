import { UseFormRegister } from "react-hook-form"
import { InputContainer } from "./styles"

import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export interface primitivesSmallText {
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
  errors?: string
  register?: UseFormRegister<any>
  [key: string]: any // Aceita outras props que não estão definidas
  any?: any
  onBlur?: any
  errorBoolean?: boolean | null
  errorMessage?: string
  successBoolean?: boolean | null
  modified?: { name?: string; updatedAt: any; uuid: string }
}

export function PrimitivesHours({
  label,
  input,
  description,
  errors,
  errorBoolean,
  successBoolean,
  errorMessage,
  ...rest
}: primitivesSmallText & { [key: string]: any }) {
  return (
    <InputContainer>
      <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
      </SuccessAndErrorSvgContainer>
      {label && <label>{label}</label>}
      {description && <span>{description}</span>}
      <input type='time' step={60} {...rest} {...rest.register} onBlur={rest.onBlur} aria-errormessage={errors ?? ""} />
      {!!errors && <span>{errors}</span>}
      {rest.modified && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {rest.modified.name} {format(new Date(rest.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </InputContainer>
  )
}
