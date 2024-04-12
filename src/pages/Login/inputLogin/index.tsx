import { InputContainer } from "./styles";

import { ComponentProps } from "react";

interface DefaultInputsProps extends Omit<ComponentProps<typeof InputContainer>, "iconSize"> {
  icon?: any;
  iconColor?: string;
  iconSize?: number;
  ref?: any;
  input: {
    type: string;
    placeholder?: any;
    required?: boolean;
    onChange?: any;
    onClick?: any;
    onSubmit?: any;
    onFocus?: any;
    onBlur?: any;
    maxLength?: number;
    minLength?: number;
    size?: number;
    value?: any;
    name?: string;
    id?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    label?: string;
    svg?: any;
    style?: any;
    ref?: any;
    defaultValue?: any;
    pattern?: string;
    min?: any;
    max?: any;
    validate?: any;
    onKeyPress?: any;
    onKeyUp?: any;
    [key: string]: any; // Aceita outras props que não estão definidas
  };
}

export function LoginInput({ icon, iconColor, iconSize, input, ...rest }: DefaultInputsProps) {
	return (
		<InputContainer {...rest}>
			{icon}
			<input {...input} />
		</InputContainer>
	);
}
