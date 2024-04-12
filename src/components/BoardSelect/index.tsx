import Select from "react-select";
import { keyframes, styled } from "@/styles";

interface SelectProps {
  options?: {
    value: any;
    label: any;
  }[];
  isClearable?: boolean;
  id?: string;
  isSearchable?: boolean;
  placeholder?: string;
  onChange?: (selectedOption: any) => void;
  isMulti?: boolean;
  optionWidth?: string;
  optionHeight?: string;
  menuWidth?: string;
  menuHeight?: string;
  optionMaxWidth?: string;
  optionMinWidth?: string;
  menuMaxWidth?: string;
  menuMinWidth?: string;
  menuMaxHeight?: string;
  menuMinHeight?: string;
}
export function BoardSelect({
	options,
	isClearable,
	id,
	isSearchable,
	placeholder,
	onChange,
	isMulti,
  
}: SelectProps) {
	return (
  
		<Select
			options={options}
			id={id}
			isSearchable={isSearchable}
			isClearable={isClearable}
			isMulti={isMulti}
			placeholder={placeholder}
			onChange={onChange}
			styles={{
				menuList: (provided) => ({
					...provided,
					scrollbarColor: "#7841b0 #d9d9d9",
					"&::-webkit-scrollbar": {
						width: 5,
						backgroundColor: "transparent",
					},
					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "#7841b0",
						borderRadius: 5,
					},
					"&::-webkit-scrollbar-track": {
						backgroundColor: "#d9d9d9",
						borderRadius: 5,
					},
					"&::-webkit-scrollbar-thumb:hover": {
						backgroundColor: "#7841b0",
					},

					width: "100%",
					height: "100%",
     
				}),
				control: (provided, { menuIsOpen }) => ({
					...provided,
					padding: "0",
					width: "7.5rem",
					height: "1rem",
					borderRadius: 0,
					border: "1px solid transparent",

					backgroundColor: "transparent",
					fontSize: ".75rem",
					fontWeight: 400,
					transition: "all ease 0.2s",
					svg: {
						color: "#DC2424",
						width: ".75rem",
						height: ".75rem",
					},
					"&:hover": { borderBottom: "1px solid #7841b0" },
					"&:focus": { borderBottom: "1px solid #7841b0" },
					"&:active": { borderBottom: "1px solid #7841b0" },
					"&:disabled": { borderBottom: "1px solid #d9d9d9" },
					boxShadow: "none",
					outline: "none",
					margin: 0,
					cursor: "pointer",
					zIndex: 0,

				}),
				menu: (provided) => ({
					...provided,
					overflow: "hidden",
					width: "100%",
					// maxWidth: menuMaxWidth,
					// minWidth: menuMinWidth,
					height: "10rem",
					// maxHeight: menuMaxHeight,
					// minHeight: menuMinHeight,
					border: "1px solid #7841b0",
					backgroundColor: "#fff",
					zIndex: 1000,
					fontSize: "1rem",
					fontWeight: 400,
					transition: "all 0.2s",
					"&:hover": {
						border: "1px solid #7841b0",
					},
					"&:focus": {
						border: "1px solid #7841b0",
						boxShadow: "0 0 0 1px #7841b0",
					},
					"&:active": {
						border: "1px solid #7841b0",
						boxShadow: "0 0 0 1px #7841b0",
					},
					"&:disabled": {
						border: "1px solid #d9d9d9",
						boxShadow: "0 0 0 1px #d9d9d9",
					},
				}),
				option: (provided, state) => ({
					...provided,

					backgroundColor: state.isSelected ? "#7841b09d" : "#fff",
					padding: "0.5rem 1rem",
					"&:hover": {
						backgroundColor: "#7841b0",
						color: "#fff",
						cursor: "pointer",
						transition: "all 0.2s",
					},
					"&:focus": {
						backgroundColor: "#7841b0",
						color: "#fff",
						border: "1px solid #7841b0",
					},

					"&:active": {
						backgroundColor: "#7841b0",
					},
					"&:disabled": {
						backgroundColor: "#d9d9d9",
						border: "1px solid #d9d9d9",
					},
				}),
				singleValue: (provided) => ({
					...provided,
				}),
				indicatorSeparator: (provided) => ({
					...provided,
					display: "none", // Isso irá remover o separador
					// ou você pode usar:
					// backgroundColor: 'transparent', // Isso irá tornar o separador transparente
				}),
			}}
		/>
  
	);
}
