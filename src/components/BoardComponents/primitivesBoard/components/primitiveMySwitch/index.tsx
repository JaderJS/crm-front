import { Controller, Control } from "react-hook-form";
import Select from "react-select"
import { Flex, Label, SwitchRoot, SwitchThumb } from "./styles";
import * as Switch from "@radix-ui/react-switch"

export interface MySwitchProps {
    name?: string
    control?: Control<any>
    label?: string
    description?: string
    defaultValue?: boolean
}

export default function PrimitivesMySwitch(props: MySwitchProps) {

    if (!props.control || !props.name) {
        return
    }
    console.log("DEFAULT", props.defaultValue)

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

        </Flex>

    )
}