import { useEffect, useState } from "react"
import { InputContainer } from "./styles"
import { UseFormRegister } from "react-hook-form"

import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"

import mask from "make-mask";

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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
  modified?: { name: string , updatedAt: any , uuid: string}

}

export function PrimitivesCnpj({
  label,
  input,
  description,
  onChange,
  register,
  disabled,
  onBlur,
  errorBoolean,
  successBoolean,
  errorMessage,
  defaultValue: externalValue, // Renomeando para evitar conflito com o estado interno

  ...rest
}: IPrimitivesCashInput & { [key: string]: any }) {

  const [value, setValue] = useState(externalValue ?? "")

  useEffect(() => {
    if (externalValue !== undefined && externalValue !== null) {
      setValue(externalValue)
    }
  }, [externalValue])

  const [m, setM] = useState("00.000.000/0000-00");

  const inputFn = (current: string) => {
    const masks = ["99.999.999/9999-99"];
    const maskLength = current.replace(/\D/g, "").length;
    const checkIsValid = [maskLength <= 14];
    const isValid = checkIsValid.every(Boolean);
    const m = masks[isValid ? 0 : 0];   
  
    if (isValid) {
      const maskedValue = mask(current, m);
      setValue(maskedValue);
      setM(m);
      if (onChange) {
        onChange(maskedValue); // Notificar a mudança para o handler externo
      }
    
      if (onBlur) {
        onBlur(maskedValue); // Notificar a mudança para o hook de registro
      }
    }
  };

  return (
    <InputContainer>
     <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
      </SuccessAndErrorSvgContainer>
      {label && <label>{label}</label>}
      {description && <span>{description}</span>}
      <input
        type='tel'
        {...rest}
        onChange={(e) => inputFn(e.target.value)}
        onBlur={ (e) => inputFn(e.target.value)}
        value={mask(value, m)}
        disabled={disabled}
      />
             {rest.modified && <span style={{ fontSize: ".65rem" }}>Modificado por: {rest.modified.name} {format(new Date(rest.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

    </InputContainer>
  )
}
