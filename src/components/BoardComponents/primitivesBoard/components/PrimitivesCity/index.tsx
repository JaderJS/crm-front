import Select from "react-select"
import { keyframes, styled } from "@/styles"
import { SetStateAction, useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { InputContainer } from "./styles"
import Image from "next/image"
import debounce from "lodash.debounce";
import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RotatingLines } from "react-loader-spinner"


interface FieldValue {
  value: string
  label: string
}

export interface SelectPropsWhite {
  defaultValue?: string | string[] | any
  value?: { value: any; label: any }
  isClearable?: boolean
  id?: string
  isSearchable?: boolean
  onChange?: (value: FieldValue) => void
  isMulti?: boolean
  label?: string
  description?: string
  disabled?: boolean
  errorBoolean?: boolean | null
  errorMessage?: string
  successBoolean?: boolean | null
  modified?: { name?: string, updatedAt: any, uuid: string }
  loading?: boolean
}

export function PrimitivesCity({
  id,
  onChange,
  defaultValue,
  value,
  label,
  description,
  loading = false,
  disabled,
  errorBoolean,
  successBoolean,
  isMulti = false,
  ...props
}: SelectPropsWhite) {

  const transformDefaultValue = () => {
    if (Array.isArray(defaultValue)) {
      return defaultValue.map(val => {
        if (typeof val === "string") {
          return (
            { value: val, label: val }
          )
        }
        return (
          { value: val.value, label: val.label }
        )
      })
    } else if (defaultValue) {
      return [{ value: defaultValue, label: defaultValue }]
    }
    return null
  }
  const [selectedValue, setSelectedValue] = useState(transformDefaultValue());


  const [options, setOptions] = useState<any[]>([])

  async function fetchCities(searchText = "") {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios?municipio=${searchText}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      const cities = data.map((city: { nome: any }) => ({
        value: city.nome,
        label: city.nome,
      }))
      setOptions(cities)
    } catch (error) {
      console.error("Erro ao buscar cidades:", error)
    }
  }


  const debouncedFetchCities = debounce(fetchCities, 300);

  const handleInputChange = (newValue: string) => {
    const searchText = newValue.replace(/\W/g, "");

    if (searchText.length > 0) {
      debouncedFetchCities(searchText);
    } else {
      setOptions([]);
    }
  }

  useEffect(() => {
    setSelectedValue(transformDefaultValue());
  }, [defaultValue]);

  const handleChange = (value: any) => {
    setSelectedValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <InputContainer>
      <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
        {loading && <RotatingLines />}
      </SuccessAndErrorSvgContainer>
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
        placeholder={"Escolher cidade"}
        onChange={handleChange}
        defaultValue={defaultValue ? selectedValue : undefined}
        value={value ? value : selectedValue}
        onInputChange={handleInputChange}
        noOptionsMessage={() => "Nenhuma cidade encontrada"}
        loadingMessage={() => options ? "Carregando..." : "Digite o nome de uma cidade"}
        styles={{
          menuList: (provided) => ({
            ...provided,
            width: "100%",
            height: "100%",
          }),
          control: (provided, { menuIsOpen }) => ({
            ...provided,
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
            position: "absolute",

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
            display: "none",
            backgroundColor: "transparent",
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
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            height: "2rem",
            alignSelf: "center",
            width: "2rem",
            justifyContent: "center",
            color: "#fff",
            borderRadius: "0 15px 15px 0",
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
      {props.modified && props.modified.name && <span style={{ fontSize: ".65rem" }}>Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

    </InputContainer>
  )
}
