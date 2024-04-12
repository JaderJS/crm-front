import { useEffect, useId, useState } from "react"
import { InputContainer } from "./styles"
import { UseFormRegister } from "react-hook-form"

import Make, { currency, currencyFn } from "make-currency"

// types and interfaces
import { CurrencyProps } from "make-currency"
import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
const BRL = Make.TYPES.BRL
Make.CONFIGURE({ money: BRL })

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RotatingLines } from "react-loader-spinner"

export interface IPrimitivesCashInput {
  label?: string
  text?: string
  description?: string
  ref?: any
  name?: string
  placeholder?: any
  required?: boolean
  onClick?: any
  onSubmit?: any
  onFocus?: any
  onBlur?: any
  maxLength?: number
  minLength?: number
  onChange?: any

  size?: number
  value?: number | string
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
  [key: string]: any // Aceita outras props que não estão definidas
  any?: any
  register?: ReturnType<UseFormRegister<any>> // Tipo ajustado para aceitar o objeto de registro
  disabled?: boolean
  errorBoolean?: boolean | null
  errorMessage?: string
  successBoolean?: boolean | null
    modified?: { name?: string; updatedAt: any; uuid: string }
  loading?: boolean

}

export function PrimitivesCashInput({
  label,
  input,
  description,
  onChange,
  register,
  disabled = false,
  loading = false,
  onBlur,
  errorBoolean,
  successBoolean,
  errorMessage,
  defaultValue: externalValue,
  ...props
}: IPrimitivesCashInput & { [key: string]: any }) {

  const [value, setValue] = useState(0)

  const id = useId()

  useEffect(() => {
    if (externalValue !== undefined && externalValue !== null) {
      setValue(externalValue)
    }
  }, [externalValue])

  const handleInputChange = (e: any) => {
    const formattedValue = currencyFn(e.target.value)
    setValue(formattedValue.floatValue)
    if (onChange) {
      onChange(formattedValue.floatValue)
    }

  }

  const handleInputBlur = (e: any) => {
    const formattedValue = currencyFn(e.target.value)
    onBlur?.(formattedValue.floatValue)
  };


  useEffect(() => {
    if (input) {
      input.onChange(value)
    }
  }, [value])

  return (
    <InputContainer>
      <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
        {loading && <RotatingLines />}
      </SuccessAndErrorSvgContainer>
      {label && <label htmlFor={id}>{label}</label>}
      {description && <span>{description}</span>}
      <input
        id={id}
        type='tel'
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={`${currency(value)}`}
        disabled={disabled}
        {...props}
      />

      {register && <input type='hidden' {...register} value={value} {...props}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
      />}
 {props.modified && props.modified.name && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </InputContainer>
  )
}
