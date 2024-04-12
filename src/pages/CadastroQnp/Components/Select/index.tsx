import Select from "react-select"
import { styled } from "@/styles"
import React, { forwardRef, useEffect, useState } from "react"

export interface SelectProps {
  options?: {
    value: any
    label: any
  }[]
  isClearable?: boolean
  defaultValue?: string | string[] | any

  id?: string
  isSearchable?: boolean
  placeholder?: string
  onChange?: (selectedOption: any) => void
  isMulti?: boolean
  optionWidth?: string
  optionHeight?: string
  menuWidth?: string
  menuHeight?: string
  optionMaxWidth?: string
  optionMinWidth?: string
  menuMaxWidth?: string
  menuMinWidth?: string
  menuMaxHeight?: string
  menuMinHeight?: string
  labelText?: string
  redBorder?: boolean
}

export const SelectQNP = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    options,
    isClearable,
    id,
    isSearchable,
    placeholder,
    onChange,
    isMulti,
    optionWidth = "100%",
    optionHeight = "2.8125rem",
    menuWidth,
    menuHeight,
    optionMaxWidth,
    optionMinWidth,
    menuMaxWidth,
    menuMinWidth,
    menuMinHeight,
    menuMaxHeight,
    labelText,
    defaultValue,
    redBorder,
  } = props



  // const [defaultOptions, setDefaultOptions] = useState<any>(options) || null;

  // // Função para mapear defaultValue para objetos de opção
  // const mapDefaultValueToOptions = (defaultValue: string | string[]) => {
  //   if (Array.isArray(defaultValue)) {
  //     return defaultValue.map((value) => {
  //       const option = options?.find((option) => option.value === value);
  //       return option || null;
  //     });
  //   }
  //   const option = options?.find((option) => option.value === defaultValue);
  //   return option || null;
  // }


  // useEffect(() => {
  //   // Mapear e definir os valores padrão
  //   const mappedOptions = mapDefaultValueToOptions(defaultValue);
  //   setDefaultOptions(mappedOptions);
  // }, [defaultValue, options]);
  

 // Estado para armazenar o valor selecionado
 const [selectedValue, setSelectedValue] = useState<any>(null);

 // Função para encontrar opções com base em defaultValue
const findOptions = (defaultValue: any[]) => {
   if (Array.isArray(defaultValue) && options) {
     return defaultValue.map(val => 
       options.find(option => option.value === val || option.label === val)
     ).filter(Boolean); // Filtra elementos nulos ou indefinidos
   } else if (options) {
     return options.find(option => option.value === defaultValue || option.label === defaultValue);
   }
   return null;
 };

 // Define o estado inicial com base em defaultValue
 useEffect(() => {
   if (defaultValue && options) {
     setSelectedValue(findOptions(defaultValue));
   }
 }, [defaultValue, options]);

 // Atualiza o estado e propaga a mudança quando uma opção é selecionada
 const handleChange = (selectedOption: any) => {
   setSelectedValue(selectedOption);
   if (onChange) {
     onChange(selectedOption);
   }
 };

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: optionMinWidth,
        width: optionWidth,
        maxWidth: optionMaxWidth,
        minHeight: "4rem",
        height: "4rem",
      }}
    >
      <label
        style={{
          fontSize: "1rem",
          color: "$blackText",
          transition: "all 0.3s ease-in-out",
          marginBottom: ".37rem",
        }}
      >
        {labelText}
      </label>
      <Select
        defaultValue={defaultValue ? selectedValue : undefined} // Usa defaultValue apenas para a inicialização
        onChange={onChange}
        options={options}
        id={id}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        placeholder={placeholder}
        value={selectedValue}
        // onChange={onChange}
        styles={{
          menuList: (provided) => ({
            ...provided,
            scrollbarColor: "#7841b0 #d9d9d9",
            "&::-webkit-scrollbar": {
              width: 5,
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#7841b0",
              borderRadius: 5,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#d9d9d9",
              borderRadius: 5,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#7841b0",
            },

            width: "100%",
            height: "100%",
          }),
          control: (provided, { menuIsOpen }) => ({
            ...provided,
            // maxWidth: optionMaxWidth,
            // minWidth: optionMinWidth,
            width: optionWidth,
            height: "auto",

            borderRadius: "15px",
            border: redBorder ? "1px solid red" : "1px solid transparent",
            // borderBottom: `1px solid #d9d9d9` || (menuIsOpen && `1px solid #7841b0`),

            backgroundColor: "#FFF",
            fontSize: "1rem",
            fontWeight: 400,
            transition: "all ease 0.2s",
            svg: {
              color: redBorder ? "red" : "#7841b0",
              transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
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
            overflow: "hidden",
            width: menuWidth,
            // maxWidth: menuMaxWidth,
            // minWidth: menuMinWidth,
            height: menuHeight,
            // maxHeight: menuMaxHeight,
            // minHeight: menuMinHeight,
            // border: "1px solid #7841b0",
            backgroundColor: "#fff",
            zIndex: 1000,
            fontSize: "1rem",
            fontWeight: 400,
            transition: "all 0.2s",
            // "&:hover": {
            //   border: "1px solid #7841b0",
            // },
            // "&:focus": {
            //   border: "1px solid #7841b0",
            //   boxShadow: "0 0 0 1px #7841b0",
            // },
            "&:active": {
              border: "1px solid #7841b0",
              boxShadow: "0 0 0 1px #7841b0",
            },
            "&:disabled": {
              border: "1px solid #d9d9d9",
              boxShadow: "0 0 0 1px #d9d9d9",
            },
            marginTop: ".3rem",
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
            // ou você pode usar:
            // backgroundColor: 'transparent', // Isso irá tornar o separador transparente
          }),
        }}
      />
    </div>
  )
})

export default SelectQNP
