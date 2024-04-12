import Select from "react-select"
import { keyframes, styled } from "@/styles"
import { SetStateAction, useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { InputContainer } from "./styles"
import Image from "next/image"
import debounce from "lodash.debounce"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"


interface FieldType {
  value: any
  label: string
}

export interface SelectPropsWhite {
  defaultValue?: string | string[] | any
  value?: { value: any; label: any }
  isClearable?: boolean
  id?: string
  isSearchable?: boolean

  onChange?: (selectedOption: FieldType) => void
  isMulti?: boolean
  label?: string
  description?: string
  disabled?: boolean
  modified?: { name?: string; updatedAt: any; uuid: string }
  loading?: boolean
}


export function PrimitivesState({
  id,
  onChange,
  defaultValue,
  value,
  label,
  loading = false,
  description,
  disabled,
  isMulti = false,
  ...props
}: SelectPropsWhite) {
  const transformDefaultValue = () => {
    if (Array.isArray(defaultValue)) {
      return defaultValue.map((val) => ({ value: val, label: val }))
    } else if (defaultValue) {
      return [{ value: defaultValue, label: defaultValue }]
    }
    return null // Se defaultValue for nulo ou indefinido, retorna nulo
  }

  const [selectedValue, setSelectedValue] = useState(transformDefaultValue())

  const [options, setOptions] = useState<any[]>([])
  async function fetchCities(searchText = "") {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?nome=${searchText}`)
    const data = await response.json()
    const cities = data.map((city: { nome: any }) => ({
      value: city.nome,
      label: city.nome,
    }))
    setOptions(cities)
  }

  // Função debounced
  const debouncedFetchCities = debounce(fetchCities, 300)

  const handleInputChange = (newValue: string) => {
    const searchText = newValue.replace(/\W/g, "")

    if (searchText.length > 0) {
      debouncedFetchCities(searchText)
    } else {
      setOptions([])
    }
  }

  const findOptions = (defaultValue: any[]) => {
    if (Array.isArray(defaultValue) && options) {
      return defaultValue
        .map((val) =>
          options.find((option: { value: any; label: any }) => option.value === val || option.label === val),
        )
        .filter(Boolean)
    } else if (options) {
      return options.find(
        (option: { value: any[]; label: any[] }) => option.value === defaultValue || option.label === defaultValue,
      )
    }
    return null
  }

  useEffect(() => {
    setSelectedValue(transformDefaultValue())
  }, [defaultValue])

  const handleChange = (value: any) => {
    setSelectedValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <InputContainer>
      {label && <label>{label}</label>}
      {description && <span>{description}</span>}

      <Select
        menuPlacement={"auto"}
        options={options}
        id={id}
        isClearable={true}
        isSearchable={true}
        isMulti={true}
        isDisabled={disabled}
        placeholder={"Escolher estado"}
        loadingMessage={() => (options ? "Carregando..." : "Digite o nome de um estado")}
        onChange={handleChange}
        defaultValue={defaultValue ? selectedValue : undefined}
        value={value ? value : selectedValue}
        onInputChange={handleInputChange}
        noOptionsMessage={() => "Digite o nome de um estado"}
        styles={{
          menuList: (provided) => ({
            ...provided,
            // scrollbarColor: "#7841b0 #d9d9d9",

            width: "100%",
            height: "100%",
          }),
          control: (provided, { menuIsOpen }) => ({
            ...provided,
            // maxWidth: optionMaxWidth,
            // minWidth: optionMinWidth,
            width: "100%",

            height: "100%",
            minHeight: "2.8125rem",
            borderRadius: "15px",
            border: "transparent",
            borderBottom: "1px solid #d9d9d9" || (menuIsOpen && "1px solid #7841b0"),
            fontFamily: "DM Sans",
            backgroundColor: "#FFF",
            fontSize: ".75rem",
            fontWeight: 400,
            transition: "all ease 0.2s",
            svg: {
              color: "#7841b0",
              // transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all ease 0.2s",
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

            border: "1px solid #7841b0",
            overflow: "hidden",
            backgroundColor: "#fff",
            zIndex: 10,
            fontSize: ".75rem",
            fontWeight: 400,
            transition: "all 0.2s",
            fontFamily: "DM Sans",

            "&:hover": {
              border: "1px solid #7841b0",
            },
            "&:focus": {
              border: "1px solid #7841b0",
              boxShadow: "0 0 0 1px #7841b0",
            },
            "&:active": {
              border: "1px solid #7841b0",
              boxShadow: "0 0 0 1px #7841b0",
            },
            "&:disabled": {
              border: "1px solid #d9d9d9",
              boxShadow: "0 0 0 1px #d9d9d9",
            },
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
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "rgba(120, 65, 176, 0.62)",
            height: "fit-content",
            borderRadius: "15px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            padding: "0.05rem 0.05rem",
            //   height: "fit-content",
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            height: "2rem",
            alignSelf: "center",
            width: "2rem",
            justifyContent: "center",
            color: "#fff",
            borderRadius: "0 15px 15px 0",
            //   backgroundColor: "red",

            "&:hover": {
              backgroundColor: "#7841b0",
              cursor: "pointer",
              transition: "all 0.2s",

              "& svg": {
                color: "#fff",
              },
            },
          }),

          multiValueLabel: (provided) => ({
            ...provided,
            fontWeight: 400,
            fontSize: ".75rem",
            fontFamily: "DM Sans",
            color: "#fff",
          }),
        }}
      />
       {props.modified && props.modified.name && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </InputContainer>
  )
}
