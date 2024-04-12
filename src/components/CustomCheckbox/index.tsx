import React from "react";
import { Checkbox as CheckboxRoot, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { styled, keyframes } from "@/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


interface CustomCheckboxProps {
  name: string;
  checked?: boolean;
  onChange?: () => void;
  [key: string]: any; // Aceita outras props que não estão definidas
  any?: any;
  color: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ name, color, checked, onChange, ...props }) => {
	const fadeIn = keyframes({
		"0%": { opacity: 0 },
		"100%": { opacity: 1 },
	});

	const fadeOut = keyframes({
		"0%": { opacity: 1 },
		"100%": { opacity: 0 },
	});

	const StyledCheckboxRoot = styled(CheckboxRoot, {
		display: "inline-flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		border: `2px solid ${color}`,
		borderRadius: 3,
		width: "1rem",
		height: "1rem",
		position: "relative",
		transition: "all 0.2s ease",
	});

	const StyledCheckboxIndicator = styled(CheckboxIndicator, {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "1rem",
		height: "100%",
		color: `${color}`,
		animation: "none",
		transition: "all 0.2s ease",

		"&[data-state=\"checked\"]": {
			"-webkit-animation": fadeIn,
			animation: fadeIn + " 0.2s forwards",
		},

		"&[data-state=\"unchecked\"]": {
			"-webkit-animation": fadeOut,
			animation: fadeOut + " 0.2s forwards",
		},
	});
	return (
		<StyledCheckboxRoot id={name} checked={checked} onCheckedChange={onChange} {...props} type="button">
			<StyledCheckboxIndicator>
				<FontAwesomeIcon icon={faCheck} width={16} height={16} />
			</StyledCheckboxIndicator>
		</StyledCheckboxRoot>
	);
};

export default CustomCheckbox;
