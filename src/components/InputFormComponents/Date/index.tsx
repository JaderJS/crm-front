import { UseFormRegister, FieldError, FieldValues, ErrorOption, RegisterOptions, Controller } from "react-hook-form"
import { Container, InputContainer } from "./styles"

export interface FormDateProps {
    label: string
    description?: string
    control: any
    name: string
    error: any
}

export function FormDate(props: FormDateProps) {

    return (
        <Container>
            <InputContainer>
                {props.label && <label>{props.label}</label>}
                {props?.description && <span>{props.description}</span>}
                <Controller
                    control={props.control}
                    name={props.name}
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                        <input type="date" onChange={onChange} ref={ref} value={GetValueDateFormControl(value)} />
                    )}
                />
                {props.error && <span style={{ color: "red" }} >{props.error.message}</span>}
            </InputContainer>
        </Container>
    )
}

const GetValueDateFormControl = (value: Date) => {
    return value?.toString().substring(0, 10)
};
