import Select from "react-select"
import { Primitive } from "zod"
import { InputContainer } from "./styles"
import { useEffect, useState } from "react"
import { UseFormRegister } from "react-hook-form"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
export interface PrimitiveSelectProps {
  label?: string
  description?: string
  isMulti?: boolean
  value?: { value: any; label: any }
  options?: {
    value: any
    label: any
  }[]
  placeholder?: string
  onChange?: (event: any) => void
  register?: UseFormRegister<any>
  defaultValue?: string | string[] | any
  isClearable?: boolean
  modified?: { name?: string; updatedAt: any; uuid: string }
}

export function PrimitivesSelect({
  label,
  description,
  isMulti = false,
  placeholder,
  onChange,
  defaultValue,
  options,
  value,
  isClearable = false,
  ...rest
}: PrimitiveSelectProps) {
  const [selectedValue, setSelectedValue] = useState<any[]>([]) // Garantir que é um array

  // Função para encontrar opções com base em defaultValue
  const findOptions = (defaultValue: any[]) => {
    // Se não há opções ou defaultValue é indefinido, retorna um array vazio
    if (!options || !defaultValue) return []

    // Se defaultValue é um array, mapeia cada valor para a opção correspondente
    if (Array.isArray(defaultValue)) {
      return defaultValue
        .map((val) => options.find((option) => option.value === val || option.label === val))
        .filter(Boolean) // Filtra opções que não foram encontradas (null ou undefined)
    } else {
      // Se defaultValue não é um array, procura a opção correspondente
      const foundOption = options.find((option) => option.value === defaultValue || option.label === defaultValue)
      return foundOption ? [foundOption] : [] // Retorna a opção encontrada ou um array vazio
    }
  }

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(findOptions(defaultValue))
    }
  }, [defaultValue, options])

  const handleChange = (selectedOption: any) => {
    setSelectedValue(selectedOption || []) // Garantir que é um array
    if (onChange) {
      onChange(selectedOption)
    }
  }
  return (
    <InputContainer>
      {label && <label>{label}</label>}
      {description && <span>{description}</span>}
      <Select
        isMulti={isMulti}
        options={options}
        onChange={handleChange}
        {...rest.register}
        placeholder={placeholder}
        isClearable={isClearable}
        defaultValue={defaultValue ? selectedValue : undefined}
        value={selectedValue}
        styles={{
          menuList: (provided) => ({
            ...provided,
            // scrollbarColor: "#7841b0 #d9d9d9",

            width: "100%",
            height: "100%",
          }),
          control: (provided, { menuIsOpen }) => ({
            ...provided,
            width: "100%",
            height: "100%",
            minHeight: "2.8125rem",
            borderRadius: menuIsOpen ? "0.25rem 0.25rem 0 0" : "0.9375rem",
            border: "transparent",
            borderBottom: menuIsOpen ? "1px solid transparent" : "1px solid #d9d9d9",
            fontFamily: "DM Sans",
            backgroundColor: "#FFF",
            fontSize: ".75rem",
            fontWeight: 400,
            transition: "all ease 0.2s",
            svg: {
              color: "#7841b0",
              transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
            },
            "&:hover": { borderBottom: "1px solid #7841b0" },
            "&:focus": { borderBottom: "1px solid #7841b0" },
            "&:active": { borderBottom: "1px solid #7841b0" },
            "&:disabled": { borderBottom: "1px solid #d9d9d9" },
            boxShadow: "none",
            outline: "none",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            zIndex: 0,
          }),
          menu: (provided) => ({
            ...provided,
            position: "absolute", // Use absolute positioning
            width: "100%",
            height: "auto",
            border: "1px solid transparent",
            backgroundColor: "#fff",
            zIndex: 100,
            fontSize: ".75rem",
            fontWeight: 400,
            transition: "all 0.2s",
            fontFamily: "DM Sans",
            marginTop: "0rem",
            // overflow:"hidden",

            "&:hover": {
              //   border: "1px solid #7841b0",
            },
            "&:focus": {
              border: "1px solid #7841b0",
              boxShadow: "0 0 0 1px #7841b0",
            },
            "&:active": {
              border: "1px solid #7841b0",
              boxShadow: "0 0 0 1px #7841b0",
            },
            // "&:disabled": {
            //   border: "1px solid #d9d9d9",
            //   boxShadow: "0 0 0 1px #d9d9d9",
          }),

          option: (provided, state) => ({
            ...provided,

            backgroundColor: state.isSelected ? "#7841b09d" : "#fff",
            padding: "0.5rem 1rem",
            "&:hover": {
              backgroundColor: "#7841b0",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.2s",
            },
            "&:focus": {
              backgroundColor: "#7841b0",
              color: "#fff",
              border: "1px solid #7841b0",
            },

            "&:active": {
              backgroundColor: "#7841b0",
            },
            "&:disabled": {
              backgroundColor: "#d9d9d9",
              border: "1px solid #d9d9d9",
            },
          }),
          singleValue: (provided) => ({
            ...provided,
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            display: "none", // Isso irá remover o separador
            backgroundColor: "transparent", // Isso irá tornar o separador transparente
          }),
        }}
      />
      {rest.modified && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {rest.modified.name} {format(new Date(rest.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </InputContainer>
  )
}
