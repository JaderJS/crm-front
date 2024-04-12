import { InputContainer } from "./styles"

interface SmallTextProps {
  label?: string
  text?: string
  ref?: any
  input: {
    name?: string;
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

export function SmallText({ label,input, text, ...rest }: SmallTextProps) {
  return (
    <InputContainer>
    {label && <label>{label}</label>}
      <input type='text' 
        {...input}
      />
    </InputContainer>
  )
}
