import { Controller, Control } from "react-hook-form";
import Select from "react-select"
import { InputContainer } from "./styles";

export interface MySelectProps {
    options: { value: string, label: string, [key: string]: any }[]
    name: string
    control: any
    label: string
    description?: string
    error: any
}

export default function FormSelect(props: MySelectProps) {

    return (
        <InputContainer>
            {props.label && <label>{props.label}</label>}
            {props.description && <span>{props.description}</span>}
            <Controller
                control={props.control}
                name={props.name}
                render={({
                    field: { onChange, value, name, ref },
                }) => {
                    const allValues = value?.map((val: any) => val.value) ?? []
                    const values = props.options?.filter((option) => allValues.includes(option.value))
                    return (
                        <Select
                            options={props.options}
                            isMulti 
                            value={values}
                            onChange={val => onChange(val)}
                            name={name}
                            ref={ref}
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
                                multiValueRemove: (provided) => ({
                                  ...provided,
                                  height: "1rem",
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
                              }}
                        />
                    )
                }}
            />
            {props.error && <span>{props.error.message}</span>}
        </InputContainer>
    )
}