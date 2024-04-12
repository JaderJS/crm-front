import { InputContainer } from "./styles"

import Select from "react-select"

import { SelectInstance, Props } from "react-select"
import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { forwardRef, useEffect, useId } from "react"
import { User } from "@/types"
import { ptBR } from "date-fns/locale"
import { Locale, format } from "date-fns"

import { ApolloError, BaseMutationOptions, gql, useQuery } from "@apollo/client"
import Image from "next/image"
import { RotatingLines } from "react-loader-spinner"


const FIND_MANY_USERS_IN_CHOOSE_FIELD_COMPONENT = gql`
query findManyUsersInChooseFieldComponent{
    users(where:{typeUser:{ equals:client}}) {
        uuid
        name
    }
}
`

interface ClientsData {
    users: User[]
}

interface PrimitiveClient extends Props {
    label?: string
    description?: string
    response?: BaseMutationOptions
    errorBoolean?: boolean | null
    successBoolean?: boolean | null
    disabled?: boolean
    loading?: boolean
    modified?: { name?: string; updatedAt: any; uuid: string }

}

export const PrimitivesClients = forwardRef<SelectInstance, PrimitiveClient>(({ label, disabled = false, errorBoolean = false, successBoolean = false, loading = false, description, response, ...props }: PrimitiveClient, ref) => {

    const id = useId()
    const error = response
    const { data: clients } = useQuery<ClientsData>(FIND_MANY_USERS_IN_CHOOSE_FIELD_COMPONENT)

    const options = clients?.users.map((client) => ({ value: client.uuid, label: client.name, avatarUrl: client.avatarUrl }))

    const formatOptionLabel = ({ value, label, avatarUrl }: { value: string, label: string, avatarUrl: string }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Image
                loading='lazy'
                width={480}
                height={480}
                quality={10}
                src={avatarUrl || "https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek="}
                alt={label}
                style={{ width: "1.25rem", height: "1.25rem", marginRight: "0.2rem", borderRadius: "50%", objectFit: "cover" }}
            />
            <span style={{ fontSize: "0s.75rem", fontWeight: 400 }}>{label}</span>
        </div>
    )

    return (
        <InputContainer>
            <SuccessAndErrorSvgContainer>
                {errorBoolean && <Slash color='#E0465C' />}
                {successBoolean && <CopySuccess color='#00C48C' />}
                {loading && <RotatingLines />}
            </SuccessAndErrorSvgContainer>
            {label && <label htmlFor={id}>{label}</label>}
            {description && <span>{description}</span>}
            <Select
                id={id}
                formatOptionLabel={formatOptionLabel as any}
                isMulti
                isDisabled={disabled}
                options={options}
                {...props}
                placeholder="selecione..."
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
            {props.modified && props.modified.name && <span style={{ fontSize: ".65rem" }}>Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

        </InputContainer>
    )

})
