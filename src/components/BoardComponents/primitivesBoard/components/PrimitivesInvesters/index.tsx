import Select, { GroupBase } from "react-select"
import { keyframes, styled } from "@/styles"
import { Ref, RefAttributes, forwardRef, useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { InputContainer } from "./styles"
import Image from "next/image"
import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RotatingLines } from "react-loader-spinner"

const FIND_MANY_USERS_IN_PRIMITIVE_SELECT_INVESTER = gql`
  query findManyUsersInPrimitiveSelectInvester {
    users(where: { typeUser: { equals: invest } }) {
      uuid
      nickName
      avatarUrl
    }
  }
`

export interface SelectPropsWhite {
  defaultValue?: string | string[] | any
  value?: { value: any; label: any }
  isClearable?: boolean
  id?: string
  isSearchable?: boolean
  loading?: boolean
  disabled?: boolean
  onChange?: (selectedOption: any) => void
  isMulti?: boolean
  label?: string
  description?: string
  successBoolean?: boolean | null
  errorBoolean?: boolean | null
  modified?: { name?: string; updatedAt: any; uuid: string }
}

interface OptionType {
  value: any
  label: string
  avatarUrl: string
}

export function PrimitivesInvesters({
  id,
  onChange,
  defaultValue,
  value,
  label,
  description,
  loading = false,
  isMulti = false,
  disabled = false,
  successBoolean = false,
  errorBoolean = false,
  ...props
}: SelectPropsWhite) {
  console.log("defaultValue", defaultValue)
  const [selectedValue, setSelectedValue] = useState<any>(defaultValue ? defaultValue : null)


  const { data: findManyUsers,loading: fetching} = useQuery(FIND_MANY_USERS_IN_PRIMITIVE_SELECT_INVESTER, {
    fetchPolicy: "cache-and-network",

  })

  const options = findManyUsers?.users?.map((user: any) => ({
    value: user.uuid,
    label: user.nickName,
    avatarUrl: user.avatarUrl,
  }))
  const formatOptionLabel = ({ value, label, avatarUrl }: OptionType) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        loading='lazy'
        width={480}
        height={480}
        quality={100}
        src={
          avatarUrl ??
          "https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek="
        }
        alt={label ?? "Avatar"}
        style={{ width: "1.25rem", height: "1.25rem", marginRight: "0.2rem", borderRadius: "50%", objectFit: "cover" }}
      />
      <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>{label}</span>
    </div>
  )

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
    if (defaultValue && options){

      setSelectedValue(findOptions(defaultValue))
    }
  }, [defaultValue,fetching])

  const handleChange = (selectedOption: any) => {
    setSelectedValue(selectedOption)

    const values = Array.isArray(selectedOption)
      ? selectedOption.map((option: { value: any }) => option.value)
      : selectedOption
        ? [selectedOption.value]
        : []
    if (onChange) {
      onChange(values)
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
      {!fetching && (
      <Select
        menuPlacement={"auto"}
        options={options}
        id={id}
        isClearable={true}
        isSearchable={true}
        isMulti={isMulti}
        placeholder={"Escolher investidores"}
        onChange={handleChange}
        defaultValue={defaultValue}
        value={value ? value : selectedValue}
        isDisabled={disabled}
        formatOptionLabel={formatOptionLabel}
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
            width: "100%",
            height: "auto",
            border: "1px solid transparent",
            overflow: "hidden",
            backgroundColor: "#fff",
            zIndex: 100,
            fontSize: ".75rem",
            fontWeight: 400,
            transition: "all 0.2s",
            fontFamily: "DM Sans",
            marginTop: "0rem",

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
      )}
      {props.modified && props.modified.name && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </InputContainer>
  )
}


// export interface SelectPropsWhite {
//   defaultValue?: string | string[] | any
//   value?: { value: any; label: any }
//   isClearable?: boolean
//   id?: string
//   isSearchable?: boolean

//   onChange?: (selectedOption: any) => void
//   isMulti?: boolean
//   label?: string
//   description?: string
//   successBoolean?: boolean | null
//   errorBoolean?: boolean | null
//   modified?: { name?: string; updatedAt: any; uuid: string }
// }


// export type SelectProps = Ref<Select<any, any, GroupBase<any>>>

// interface FieldValue {
//   value: any
//   label: string
//   avatarUrl: string
// }

// export const PrimitiveInvester = forwardRef<>(({ ...props }, ref) => {


//   return (
//     <>
//       <InputContainer>
//         <SuccessAndErrorSvgContainer>
//           {errorBoolean && <Slash color='#E0465C' />}
//           {successBoolean && <CopySuccess color='#00C48C' />}
//         </SuccessAndErrorSvgContainer>
//         {label && <label>{label}</label>}
//         {description && <span>{description}</span>}

//         <Select
//           menuPlacement={"auto"}
//           options={options}
//           id={id}
//           isClearable={true}
//           isSearchable={true}
//           isMulti={isMulti}
//           placeholder={"Escolher investidores"}
//           onChange={handleChange}
//           defaultValue={defaultValue}
//           value={value ? value : selectedValue}
//           formatOptionLabel={formatOptionLabel}
//           ref={ }
//           styles={{
//             menuList: (provided) => ({
//               ...provided,
//               // scrollbarColor: "#7841b0 #d9d9d9",

//               width: "100%",
//               height: "100%",
//             }),
//             control: (provided, { menuIsOpen }) => ({
//               ...provided,
//               width: "100%",
//               height: "100%",
//               minHeight: "2.8125rem",
//               borderRadius: menuIsOpen ? "0.25rem 0.25rem 0 0" : "0.9375rem",
//               border: "transparent",
//               borderBottom: menuIsOpen ? "1px solid transparent" : "1px solid #d9d9d9",
//               fontFamily: "DM Sans",
//               backgroundColor: "#FFF",
//               fontSize: ".75rem",
//               fontWeight: 400,
//               transition: "all ease 0.2s",
//               svg: {
//                 color: "#7841b0",
//                 transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
//                 transition: "all ease 0.2s",
//               },
//               "&:hover": { borderBottom: "1px solid #7841b0" },
//               "&:focus": { borderBottom: "1px solid #7841b0" },
//               "&:active": { borderBottom: "1px solid #7841b0" },
//               "&:disabled": { borderBottom: "1px solid #d9d9d9" },
//               boxShadow: "none",
//               outline: "none",
//               padding: 0,
//               margin: 0,
//               cursor: "pointer",
//               zIndex: 0,
//             }),
//             menu: (provided) => ({
//               ...provided,
//               position: "absolute", // Use absolute positioning
//               width: "100%",
//               height: "auto",
//               border: "1px solid transparent",
//               overflow: "hidden",
//               backgroundColor: "#fff",
//               zIndex: 100,
//               fontSize: ".75rem",
//               fontWeight: 400,
//               transition: "all 0.2s",
//               fontFamily: "DM Sans",
//               marginTop: "0rem",

//               "&:hover": {
//                 //   border: "1px solid #7841b0",
//               },
//               "&:focus": {
//                 border: "1px solid #7841b0",
//                 boxShadow: "0 0 0 1px #7841b0",
//               },
//               "&:active": {
//                 border: "1px solid #7841b0",
//                 boxShadow: "0 0 0 1px #7841b0",
//               },
//               // "&:disabled": {
//               //   border: "1px solid #d9d9d9",
//               //   boxShadow: "0 0 0 1px #d9d9d9",
//             }),

//             option: (provided, state) => ({
//               ...provided,

//               backgroundColor: state.isSelected ? "#7841b09d" : "#fff",
//               padding: "0.5rem 1rem",
//               "&:hover": {
//                 backgroundColor: "#7841b0",
//                 color: "#fff",
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//               },
//               "&:focus": {
//                 backgroundColor: "#7841b0",
//                 color: "#fff",
//                 border: "1px solid #7841b0",
//               },

//               "&:active": {
//                 backgroundColor: "#7841b0",
//               },
//               "&:disabled": {
//                 backgroundColor: "#d9d9d9",
//                 border: "1px solid #d9d9d9",
//               },
//             }),
//             singleValue: (provided) => ({
//               ...provided,
//             }),
//             indicatorSeparator: (provided) => ({
//               ...provided,
//               display: "none", // Isso irá remover o separador
//               backgroundColor: "transparent", // Isso irá tornar o separador transparente
//             }),
//           }}
//         />
//         {props.modified && (
//           <span style={{ fontSize: ".65rem" }}>
//             Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
//           </span>
//         )}
//       </InputContainer>
//     </>
//   )
// })