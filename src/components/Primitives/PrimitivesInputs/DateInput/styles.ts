import { styled } from "@/styles";

export const InputContainer = styled("div", {
	position: "relative",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",

	width: "100%",
	height: "2.8125rem",
	// border: "1px solid #E5E5E5",
	//   borderBottom: "1px solid #E5E5E5",
	backgroundColor: "#fff",
	fontSize: ".75rem",
	transition: "all 0.3s ease-in-out",
	justifyContent: "space-between", // alinhar os itens do container no começo e no final
	gap: ".37rem",
	borderRadius: "0.9375rem",
	padding: "0 1rem",
	svg: {
		width: "1rem",
		height: "1rem",
		color:"$purpleFwo"
	},

	"input[type='text']": {
		width: "100%",
		padding: "0",
		height: "100%",
		border: "none",
		outline: "none",
		fontSize: ".75rem",
		color: "$blackText",

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
