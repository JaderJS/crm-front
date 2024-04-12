import React, { forwardRef, useEffect, useMemo, useState } from "react"
import { Checkbox as CheckboxRoot, CheckboxIndicator } from "@radix-ui/react-checkbox"
import { styled, keyframes } from "@/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { InputContainer } from "../PrimitiveAppointment/styles"
import { Container, SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { Slash, CopySuccess } from "iconsax-react"


import { format } from "date-fns"
import { ptBR } from "date-fns/locale"


interface CustomCheckboxProps {
  name?: string
  checked?: boolean
  onChange?: (value: any) => void
  [key: string]: any // Aceita outras props que não estão definidas
  any?: any
  options?: [{ value: any; label: any }]
  defaultValue?: { value: any; label: any }[] | any
  disabled?: boolean
  description?: string
  label?: string
  errorBoolean?: boolean | null
  successBoolean?: boolean | null
  modified?: { name?: string; updatedAt: any; uuid: string }
  loading?: boolean
}

const PrimitivesCheckbox: React.FC<CustomCheckboxProps> = ({ name, color, checked, onChange, ...props }) => {
  const fadeIn = keyframes({
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  })

  const fadeOut = keyframes({
    "0%": { opacity: 1 },
    "100%": { opacity: 0 },
  })

  const StyledCheckboxRoot = styled(CheckboxRoot, {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "1px solid #444444",
    borderRadius: 5,
    width: "1rem",
    height: "1rem",
    position: "relative",
    transition: "all 0.2s ease",

    "&[data-state=\"checked\"]": {
      border: "1px solid #7841B0",
    },
  })

  const StyledCheckboxIndicator = styled(CheckboxIndicator, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "1rem",
    height: "100%",
    color: "#7841B0",
    animation: "none",
    transition: "all 0.2s ease",

    "&[data-state=\"checked\"]": {
      "-webkit-animation": fadeIn,
      animation: fadeIn + " 0.2s forwards",
    },

    "&[data-state=\"unchecked\"]": {
      "-webkit-animation": fadeOut,
      animation: fadeOut + " 0.2s forwards",
    },
    svg: {
      width: "0.75rem",
      height: "0.75rem",
    },
  })

  return (
    <StyledCheckboxRoot id={name} checked={checked} onCheckedChange={onChange} {...props} type='button'>
      <StyledCheckboxIndicator>
        <FontAwesomeIcon icon={faCheck} width={16} height={16} />
      </StyledCheckboxIndicator>
    </StyledCheckboxRoot>
  )
}

const PrimitivesCheckboxGroup: React.FC<CustomCheckboxProps> = ({
  name,
  color,
  checked,
  onChange,
  defaultValue,
  options,
  disabled,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState<{ value: any; label: any }[] | any>(defaultValue)

  useEffect(() => {
    setSelectedValue(defaultValue)
  }, [defaultValue])

  const handleChange = (option: { value: any; label: any }) => {
    setSelectedValue((prev: any[]) => {
      // Transforma 'prev' em um Set para operações mais eficientes
      const newSet = new Set(prev ? prev.map((item: { value: any }) => item.value) : [])

      if (newSet.has(option.value)) {
        newSet.delete(option.value)
      } else {
        newSet.add(option.value)
      }
      if (!options) return
      // Transforma o Set de volta em array de objetos
      const newValue = Array.from(newSet).map((value) => options.find((opt) => opt.value === value))

      if (onChange) {
        onChange(newValue)
      }

      return newValue
    })
  }

  if (!options) {
    return (
      <div>
        <p>Options is required</p>
      </div>
    )
  }

  return (
    <Container>
      <SuccessAndErrorSvgContainer>
        {props.errorBoolean && <Slash color='#E0465C' />}
        {props.successBoolean && <CopySuccess color='#00C48C' />}
      </SuccessAndErrorSvgContainer>
      {props.label && <label>{props.label}</label>}
      {props.description && <span>{props.description}</span>}

      {options.map((option, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "auto",
            width: "auto",
            backgroundColor: "#FFFFFF",
            padding: "0.5rem",
            gap: ".5rem",
            borderRadius: "0.9375rem",
          }}
        >
          <PrimitivesCheckbox
            id={option.value}
            name={option.value}
            onChange={() => {
              if (!disabled) {
                handleChange(option)
              }
            }}
            checked={
              !props.disabled &&
              Array.isArray(selectedValue) &&
              selectedValue?.some((item: any) => item.value === option.value)
            }
            {...props}
          />
          <label
            style={{
              fontFamily: "DM Sans",
              fontStyle: "normal",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#444",
            }}
            htmlFor={option.value}
          >
            {option.label}
          </label>
        </div>
      ))}
       {props.modified && props.modified.name && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </Container>
  )
}

export default PrimitivesCheckboxGroup