import { ComponentProps, forwardRef } from "react";
import { ButtonContainer } from "./styles";

type ButtonContainerProps = ComponentProps<typeof ButtonContainer>;

export const DefaultButton = forwardRef<HTMLButtonElement, ButtonContainerProps>(({ children, ...rest }, ref) => {
	return (
		<ButtonContainer ref={ref} {...rest}>
			{children}
		</ButtonContainer>
	);
});
