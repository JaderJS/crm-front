import React, { InputHTMLAttributes, ReactNode, forwardRef, useEffect, useId, useRef, useState } from "react"
import { Container, LabelFromRadio, RadioContainer, SuccessAndErrorSvgContainer } from "./styles"
import { Console } from "console"
import { CopySuccess, Slash } from "iconsax-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BaseMutationOptions } from "@apollo/client"
import { Field } from "@/types"
import { RotatingLines } from "react-loader-spinner"
interface RadioProps {
  label?: string
  name?: string // Certifique-se de que o nome seja o mesmo para todos os botões de rádio em um grupo
  options?: {
    value: any
    label: any
  }[]
  onChange?: (selectedValue: any) => void
  defaultValue?: string
  description?: string
  id?: number
  errorBoolean?: boolean | null
  errorMessage?: string
  successBoolean?: boolean | null
  disabled?: boolean
  modified?: { name?: string; updatedAt: any; uuid: string }
}

export function PrimitivesRadioBoard(props: RadioProps) {
  const {
    label,
    name,
    disabled,
    options,
    onChange,
    defaultValue,
    description,
    id,
    errorBoolean,
    successBoolean,
    errorMessage,
  } = props
  const [selectedValue, setSelectedValue] = useState<any>(null)

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSelectedValue(value)
    if (onChange) {
      onChange(value)
    }
  }
  return (
    <Container>
      <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
      </SuccessAndErrorSvgContainer>

      {label && <label>{label}</label>}
      {description && <span>{description}</span>}

      {options && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.5rem",
            backgroundColor: "#FFF",
            borderRadius: "15px",
            border: "1px solid transparent",
            paddingBottom: "0.5rem",
            paddingTop: "0.5rem",
          }}
        >
          {options.map((option, index) => (
            <RadioContainer key={index}>
              <input
                type='radio'
                name={`${id}-${name}`}
                id={`radio${id}-${index + 1}`}
                value={option.value}
                onChange={handleRadioChange}
                checked={selectedValue === option.value}
                disabled={disabled}
              />
              <LabelFromRadio htmlFor={`radio${id}-${index + 1}`}>{option.label}</LabelFromRadio>
            </RadioContainer>
          ))}
        </div>
      )}
       {props.modified && props.modified.name && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </Container>
  )
}

type PrimitiveLongTextProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "defaultValue"> & {
  label?: string
  description?: string
  disabled?: boolean
  response?: BaseMutationOptions
  children?: ReactNode
  onChange?: (value: string) => void
  field?: Field
    modified?: { name?: string; updatedAt: any; uuid: string }
  successBoolean?: boolean
  errorBoolean?: boolean
  loading?: boolean
  defaultValue?: { value: string, label: string }
  options: { value: string, label: string }[]
}


export const PrimitiveRadioButton = forwardRef<HTMLInputElement, PrimitiveLongTextProps>(({ type = "radio", label, defaultValue, description, disabled = false, errorBoolean = false, successBoolean = false, loading = false, modified, onChange, options, ...props }: PrimitiveLongTextProps, ref) => {

  const id = useId()
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue?.value)

  const handleRadioButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(() => event.target.value)
    onChange?.(event.target.value)
  }

  return (
    <Container>

      <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
        {loading && <RotatingLines />}
      </SuccessAndErrorSvgContainer>

      {label && <label>{label}</label>}
      {description && <span>{description}</span>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.5rem",
          backgroundColor: "#FFF",
          borderRadius: "15px",
          border: "1px solid transparent",
          paddingBottom: "0.5rem",
          paddingTop: "0.5rem",
        }}
      >
        {options?.map((option, index) => (
          <RadioContainer key={index} disabled={disabled}>
            <input
              type={type}
              name={id}
              id={id}
              value={option.value}
              disabled={disabled}
              onChange={handleRadioButton}
              checked={selectedValue === option.value}
            />
            <LabelFromRadio >{option.label}</LabelFromRadio>
          </RadioContainer >
        ))}
      </div>


      {modified &&
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {modified.name} {format(new Date(modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      }
    </Container>
  )
})
