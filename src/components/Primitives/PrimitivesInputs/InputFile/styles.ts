import { styled } from "@/styles";

export const InputContainer = styled("div", {
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


	"div": {
		display: "flex",
		borderRadius: "0.9375rem",
		width: "100%",
		height: "2.8125rem",
		minHeight: "2.8125rem",
		border: "none",
		outline: "none",
		fontSize: "1rem",
		color: "$blackText",
		alignItems:"center",
		padding: "0 1rem",
		backgroundColor: "$white",
		transition: "all 0.3s ease-in-out",
		gap: ".37rem",
		
		"svg": {
			width: "1rem",
            height: "1rem",
            color:"$purpleFwo"
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
