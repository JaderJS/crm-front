import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps, useEffect, useState } from "react";
import { InputContainer } from "../styles";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

interface PasswordInputProps
  extends Omit<ComponentProps<typeof InputContainer>, "iconSize"> {
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
    value?: string;
    name?: string;
    id?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    label?: string;
    svg?: any;
    style?: any;
    ref?: any;
    defaultValue?: string;
    pattern?: string;
    min?: any;
    max?: any;
  };
}

export function PasswordInput({
	icon,
	iconColor,
	iconSize,
	input,
	...rest
}: PasswordInputProps) {
	const [inputType, setInputType] = useState(input.type);

	useEffect(() => {
		setInputType(input.type);
	}, [input.type]);

	const toggleInputType = () => {
		setInputType(inputType === "password" ? "text" : "password");
	};

	const updatedInput = { ...input, type: inputType };

	const lockIcon = inputType === "password" ? faLock : faLockOpen;

	return (
		<InputContainer {...rest}>
			<input {...updatedInput} />
			{icon && <FontAwesomeIcon icon={lockIcon} onClick={toggleInputType} />}
		</InputContainer>
	);
}