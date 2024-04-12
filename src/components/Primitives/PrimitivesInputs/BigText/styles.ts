import { styled } from "@/styles";

export const InputContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	width: "100%",
	minHeight:"6.4375rem",
	height: "auto",
	// border: "1px solid #E5E5E5",
	//   borderBottom: "1px solid #E5E5E5",
	backgroundColor: "transparent",
	fontSize: ".75rem",
	transition: "all 0.3s ease-in-out",
	justifyContent: "space-between", // alinhar os itens do container no começo e no final
	gap: ".37rem",


	"textarea": { // Target both input and textarea
		resize: "none" ,
		borderRadius: "15px",
		width: "100%",
		height: "2.8125rem",
		border: "none",
		outline: "none",
		fontSize: ".75rem",
		color: "$blackText",
		padding: ".87rem .87rem",
		backgroundColor: "$white",
		minHeight:"7.1rem",
		transition: "all 0.3s ease-in-out",
		fontFamily: "$DM_Sans",
		"&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
			"-webkit-text-fill-color": "#000", // ou a cor que você preferir

			transition: "background-color 50000s ease-in-out 0s",
		},
		"&::placeholder": {
			color: "#A1A1A5",
		},
	},

	"& > label": {
		fontSize: ".75rem",
		color: "#444",
		transition: "all 0.3s ease-in-out",
		height:"auto",
	},	


  
  



 
//   defaultVariants: {
//     focusColor: "red",
//     hover: "red",
//   },
});
