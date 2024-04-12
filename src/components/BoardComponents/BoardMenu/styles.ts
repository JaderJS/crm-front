import { styled, keyframes } from "@/styles";

const fadeIn = keyframes({
	"0%": {
		opacity: 0,
	},
	"100%": {
		opacity: 1,
	},
});

export const Container = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	width: "97vw",
	minWidth: "50rem",
	minHeight: "3rem",
	height: "3rem",
	fontFamily: "$DM_Sans",
	
});

export const InputsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: "4rem",
	width: "100%",
	maxWidth: "80%",	
});

export const HoverInfo = styled("div", {
	animation: `${fadeIn} 0.2s ease-in-out`,
	display: "none",
	position: "relative",

	transform: "translateX(-50%)",
	padding: "8px",
	fontSize: ".7rem",
	border: "1px solid #ccc",
	backgroundColor: "#f9f9f9",
	borderRadius: "4px",
	zIndex: 2,
	color: "$grayButton",
	justifyContent: "center",
	alignItems: "center",
	p: {
		color: "$grayButton",
	},

	"& > button": {
		backgroundColor: "transparent",
		outline: "none",
		border: "1px solid #a1a1a5",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "0.5rem",
		width: "100%",
		height: "1.875rem",
		fontSize: "0.75rem",
		borderRadius: "15px",
		padding: "0 2rem",
		transition: "all 0.2s ease-in-out",
		textAlign: "center",
		color: "$redFwo",

		"& svg": {
			width: "1rem",
			height: "1rem",
			color: "#DC2424",
		},
	},
});

export const CalendarContainer = styled("div", {
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",

	"&:hover": {
   
		[`& ${HoverInfo}`]: {
    
			position: "absolute",
			display: "flex",
			flexDirection: "column",
			marginTop: "1.8rem",
			left: "50%",
    
		},
	},

	maxWidth: "10rem",

	"& > button": {
		backgroundColor: "transparent",
		outline: "none",
		border: "1px solid #a1a1a5",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: "0.5rem",
		width: "15.6rem",
		height: "1.875rem",
		fontSize: "0.75rem",
		borderRadius: "15px",
		padding: "0 2rem",
		transition: "all 0.2s ease-in-out",
		textAlign: "center",

		"& svg": {
			width: "1rem",
			height: "1rem",
			color: "#DC2424",
		},
	},
});


export const SelectItem = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",

	"& > svg": {
		width: "1rem",
		height: "1rem",
		color:"$redFwo"
	},

	fontSize: "0.75rem",
	color:"$blackText",
	gap: ".3rem",

});




export const UserName = styled("p", {
	display:"none",
	fontSize: "0.75rem",
	color:"$blackText",
	gap: ".3rem",
	alignItems: "center",
	transform: "translateY(-50%)",
	fontFamily: "$DM_Sans",
	fontWeight: "normal",
	transition: "all 0.2s ease-in-out",
});

export const UserContainer = styled("div", {
	bottom: "0",
	left: "5rem",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "fit-content",
	maxWidth: "5rem",
	height: "4rem",


	img: {
		width: "3rem",
		height: "auto",
		objectFit: "cover",
		borderRadius: "50%",
	},


	"&:hover": {
		[`& ${UserName}`]: {
			display:"flex",
			position: "absolute",
			marginTop: "4rem",
    
      
		},
	},

});

