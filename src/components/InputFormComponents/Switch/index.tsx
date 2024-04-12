import { Controller, Control } from "react-hook-form";
import Select from "react-select"
import { Flex, Label, SwitchRoot, SwitchThumb } from "./styles";
import { InputHTMLAttributes, forwardRef, useState } from "react";



type FormSwitchProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: any
    value?: boolean
}

export const SwitchForm = forwardRef<HTMLInputElement, FormSwitchProps>(({ label, error, value, ...props }: FormSwitchProps, ref) => {

    const [checked, setChecked] = useState<boolean>(false)

    return (
        <>
            <Flex space={!!label}>
                {label && (
                    <Label htmlFor='switch'>
                        {label}
                    </Label>
                )}

                <input
                    ref={ref}
                    type="checkbox"
                    checked={checked}
                    onChange={e => {
                        setChecked(e.target.checked);
                    }}
                />

                {error && <span>{error.message}</span>}
            </Flex>
        </>
    )
})


export interface SwitchProps {
    name: string
    control: Control<any>
    label?: string
    description?: string
    error?: any
    onChange?: (event: any) => void
}

export default function FormSwitch(props: SwitchProps) {

    if (!props.control || !props.name) {
        return
    }

    return (
        <Flex space={!!props.label}>
            {props.label && (
                <Label htmlFor='switch'>
                    {props.label}
                </Label>
            )}
            <Controller
                control={props.control}
                name={props.name}
                render={({
                    field: { onChange, value, name, ref },
                }) => {
                    return (
                        <SwitchRoot checked={value} onClick={() => onChange(!value)} ref={ref} >
                            <SwitchThumb />
                        </SwitchRoot>
                    )
                }}
            />
            {props.error && <span>{props.error.message}</span>}
        </Flex>

    )
}