import { keyframes, styled } from "@/styles";
import "animate.css/animate.min.css";

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

export const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-between",
	// maxWidth: "21.5625rem",
	width: "100%",
	minWidth: "21.5625rem",
	height: "100%",
	borderRadius: "1.875rem",
	padding: "1.5rem",
	border: "1px solid #EEEEEE",
	backgroundColor: "#FFFFFF",
	boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.04)",
	transition: "all 0.3s ease-in-out",
	animation: ` ${fadeIn} 0.2s ease-in-out`,
	"&:hover": {
		border: "1px solid rgba(120, 65, 176, 1)",
		boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",
	},

	"&.Disabled": {
		border: "1px solid #EEEEEE",
		boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",

		"&:hover": {
			border: "1px solid #EEEEEE",
			boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",
		},
	},


 

  
	"@media (min-width: 768px) and (max-width: 1280px)": {
		width : "12.8rem",
		height: "12rem",
	},

});


export const Header = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	gap: ".5rem",
	svg: {
		width: "2rem",
		height: "2rem",
		color: "$purpleFwo",
	},
	h1: {
		fontFamily: "$DM_Sans",
		fontSize: "1.5rem",
		fontWeight: 600,
		color: "$blackText",
	},
});

export const SquadInf = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	fontFamily: "$DM_Sans",
    
	span: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "50%",
		gap: ".5rem",
		fontSize: "1rem",
		fontWeight: 400,
		color: "$blackText",

	},
	img : {
		width: "1.5rem",
		height: "1.5rem",
		borderRadius: "50%",
		objectFit: "cover",
	},

});


export const Button = styled("button", {
	all: "unset",
	border: "none",
	width: "11.3rem",
  
	height: "2.3rem",
	borderRadius: "10px",
	backgroundColor: "$purpleFwo",
	color: "$white",
	fontFamily: "$DM_Sans",
	fontWeight: 400,
	fontSize: "0.75rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
  
	svg: {
		width: "1rem",
		height: "1rem",
		marginLeft: "0.5rem",
		transition: "all 0.3s ease-in-out",
		color: "#ffffff7d",
	},
  
	"&:hover svg": {
		transform: "translateX(0.5rem)",
		transition: "all 0.3s ease-in-out",
		color: "#ffffff",
	},
	"@media (min-width: 768px) and (max-width: 1280px)": {
      
		width : "7.3rem",
		minHeight: "1.3rem",
	},
});
  