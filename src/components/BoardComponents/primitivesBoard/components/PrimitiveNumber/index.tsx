import { InputContainer } from "./styles"

import Select from "react-select"

import { SelectInstance, Props } from "react-select"
import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { InputHTMLAttributes, forwardRef, useEffect, useId } from "react"

import { BaseMutationOptions } from "@apollo/client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RotatingLines } from "react-loader-spinner"

type PrimitiveNumberProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    description?: string
    response?: BaseMutationOptions
    errorBoolean?: boolean
    successBoolean?: boolean
    loading?: boolean
  modified?: { name?: string; updatedAt: any; uuid: string }
    [key: string]: any
}

export const PrimitiveNumber = forwardRef<HTMLInputElement, PrimitiveNumberProps>(({ label, description, response, type = "number", errorBoolean = false, successBoolean = false, loading = false, ...props }: PrimitiveNumberProps, ref) => {

    const id = useId()

    return (
        <InputContainer>
            <SuccessAndErrorSvgContainer>
                {errorBoolean && <Slash color='#E0465C' />}
                {successBoolean && <CopySuccess color='#00C48C' />}
                {loading && <RotatingLines />}
            </SuccessAndErrorSvgContainer>
            {label && <label htmlFor={id}>{label}</label>}
            {description && <span>{description}</span>}
            <input id={id} type={type} ref={ref} {...props} />
                {props.modified && props.modified.name && <span style={{ fontSize: ".65rem" }}>Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

        </InputContainer>
    )

})
