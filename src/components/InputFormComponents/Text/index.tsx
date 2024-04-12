import { UseFormRegister, FieldError, FieldValues, ErrorOption, RegisterOptions } from "react-hook-form"
import { InputContainer } from "./styles"

export interface FormTextProps {
    label: string
    description?: string
    register: any
    error: any
    onChange?: (value: string) => void
    placeholder?: string
    
}

export function FormText(props: FormTextProps) {

    return (
        <InputContainer>
            {props.label && <label>{props.label}</label>}
            {props?.description && <span>{props.description}</span>}
            <input type='text' {...props.register}
             placeholder={props.placeholder}
            />
            {props.error && <span style={{ color: "red" }} >{props.error.message}</span>}
        </InputContainer>
    )
}