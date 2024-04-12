import { styled } from "@/styles";

export const InputContainer = styled("div", {
	position: "relative",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",

	width: "14.9375rem",
	height: "2.8125rem",
	// border: "1px solid #E5E5E5",
	//   borderBottom: "1px solid #E5E5E5",
	backgroundColor: "#fff",
	fontSize: "1rem",
	transition: "all 0.3s ease-in-out",
	justifyContent: "center", // alinhar os itens do container no começo e no final
	gap: ".37rem",
	borderRadius: "0.9375rem",
	svg: {
		width: "1.2rem",
		height: "1.2rem",
		color:"$purpleFwo"
	},

	"input[type='text']": {
		width: "7.8125rem",
		minWidth: "7.8125rem",
		maxWidth: "7.8125rem",
		height: "2.8125rem",
		border: "none",
		outline: "none",
		fontSize: "1rem",
		color: "$blackText",
		padding: "0 .1rem",
		backgroundColor: "$white",
		alignItems: "center",
		justifyContent: "center",
		transition: "all 0.3s ease-in-out",
		"&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
			"-webkit-text-fill-color": "#000", // ou a cor que você preferir

			transition: "background-color 50000s ease-in-out 0s",
		},
		"&::placeholder": {
			color: "#A1A1A5",
		},
	},

	"& > label": {
		fontSize: "1rem",
		color: "$blackText",
		transition: "all 0.3s ease-in-out",
	},	
  



 
//   defaultVariants: {
//     focusColor: "red",
//     hover: "red",
//   },
});
