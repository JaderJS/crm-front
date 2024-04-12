import { UseFormRegister } from "react-hook-form"
import { InputContainer } from "./styles"

import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { useEffect, useState } from "react"
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
  modified?: { name: string , updatedAt: any , uuid: string}

}

export function PrimitivesEmail({
  label,
  input,
  description,
  errors,
  errorBoolean,
  successBoolean,
  errorMessage,
  onChange,
  defaultValue,
  ...rest
}: primitivesSmallText & { [key: string]: any }) {
  const [email, setEmail] = useState(defaultValue ?? "")
  const [isValid, setIsValid] = useState(true)

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return re.test(email.toLowerCase())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
    setIsValid(validateEmail(value))
    if (onChange) {
      onChange(value)
    }
  }

  useEffect(() => {
    if (defaultValue) {
      setEmail(defaultValue)
    }
  }, [defaultValue])



  return (
    <InputContainer>
      <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
      </SuccessAndErrorSvgContainer>
      {label && <label>{label}</label>}
      {description && <span>{description}</span>}
      <input
        type='email'
        name="email"
        autoComplete="email"
        onChange={handleInputChange}
        onBlur={rest.onBlur}
        value={email}
        aria-errormessage={errors ?? ""}
        {...rest.register}
        {...rest}
      />
      {!!errors && <span>{errors}</span>}
      {!isValid && email.length > 0 && <span>Email inválido</span>}
      {rest.modified && <span style={{ fontSize: ".65rem" }}>Modificado por: {rest.modified.name} {format(new Date(rest.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

    </InputContainer>
  )
}
