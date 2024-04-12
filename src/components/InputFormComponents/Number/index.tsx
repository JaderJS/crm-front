import { UseFormRegister, FieldError, FieldValues, ErrorOption, RegisterOptions, Controller } from "react-hook-form"
import { InputContainer } from "./styles"

export interface FormNumberProps {
    label: string
    description?: string
    register: any
    error: any
}

export function FormNumber(props: FormNumberProps) {

    return (
        <InputContainer>
            {props.label && <label>{props.label}</label>}
            {props?.description && <span>{props.description}</span>}
            <input type='number' {...props.register} />
            {props.error && <span style={{ color: "red" }} >{props.error.message}</span>}
        </InputContainer>
    )
}