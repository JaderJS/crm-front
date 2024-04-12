import { styled, keyframes } from "@/styles";

const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

export const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "flex-start",
	height: "100vh",
	width: "100vw",
	backgroundColor: "$background",
	fontFamily: "$DM_Sans",
	animation: `${fadeIn} .6s ease-in-out`,
	padding: "2rem 2rem",
    gap: "2rem",

});

export const Content = styled("div", {
	display:"flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "flex-start",
  maxHeight:"50.125rem",
  width: "100%",
  overflow: "auto",
  gap: "3rem",
  backgroundColor:"$cinzaClaroPrincipal",
  padding: "0 1.5rem",
  paddingBottom:"5rem",
  paddingTop:"3rem",
  borderRadius:"30px",
});




export const InputContainers = styled("button", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	width: "100%",
	minHeight: "4rem",
	height: "4rem",
	// border: "1px solid #E5E5E5",
	//   borderBottom: "1px solid #E5E5E5",
	backgroundColor: "transparent",
	fontSize: "1rem",
	transition: "all 0.3s ease-in-out",
	justifyContent: "space-between", // alinhar os itens do container no começo e no final
	gap: ".37rem",


	"input[type='text']": {
		borderRadius: "0.9375rem",
		width: "100%",
		height: "2.8125rem",
		minHeight: "2.8125rem",
		border: "none",
		outline: "none",
		fontSize: "1rem",
		color: "$blackText",
		padding: "0 1rem",
		backgroundColor: "$white",
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
		marginLeft: ".2rem",
	},	
  



 
//   defaultVariants: {
//     focusColor: "red",
//     hover: "red",
//   },
});
