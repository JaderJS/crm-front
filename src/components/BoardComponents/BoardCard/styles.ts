import { styled, keyframes } from "@/styles";

const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

export const DeleteCardButton = styled("button", {
	all:"unset",
	transform:"none",
	transition:"none",
	position:"absolute",
	top:"0",
	right:"0",
	padding:"0.5rem",
	cursor:"pointer",

});
export const Container = styled("div", {
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	textAlign: "center",
	maxWidth: "20rem",
	minWidth: "20rem",
	marginBottom: 10,
	borderRadius: 10,
	// overflow: "hidden",
	minHeight: "2.8125rem",
	backgroundColor: "#fff",
	padding:".5rem 1.25rem",
	// animation: `${fadeIn} .5s ease-in-out`,
	button: {
		all: "unset",
		width: "1rem",
		height: "1rem",
		cursor: "pointer",
		display:"flex",
		alignItems:"center",
		justifyContent:"center",

		"& svg": {
			width: "1rem",
			height: "1rem",
			color: "$purpleFwo",
		},
	},

	variants: {
		isOpened: {
			true: {
				 button: {
					transform: "rotate(90deg)",
					transition: "transform 0.2s ease-in-out",
				},
			},
			false: {
				button: {
					transform: "rotate(0deg)",
					transition: "transform 0.2s ease-in-out",
				},
			},
		},
	},
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",

});


export const Header = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	height:"2rem",
	minHeight:"2rem",
	"& h2":{
		textAlign:"left",
		overflow:"hidden",
		textOverflow:"ellipsis",
		whiteSpace:"nowrap",
		height:"1.5rem",
		fontSize:"1rem",
		fontFamily:"$DM_Sans",
		fontWeight:"700",
	}
});


export const Content = styled("div", {
	position:"relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-between",
	width: "100%",
	height:"fit-content",
	textAlign:"left",
	fontFamily:"$DM_Sans",
	paddingBottom:"2rem",
	gap:"1rem",
});

export const UserAssignment = styled("div", {
	height:"1.5rem",
	width:"100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	position:"absolute",
	bottom:".5rem",
	img:{
		width:"1.5rem",
		height:"1.5rem",
		objectFit:"cover",
		borderRadius:"50%",
		marginLeft:"-0.5rem",
		cursor:"default",
	}
});


export const Fields = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "flex-start",
	width: "100%",
	// gap:".5rem",
	marginBottom: "0.5rem",
	
});

export const FieldTittle = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap:".5rem",



	"& h3":{
		fontSize:"0.75rem",
		fontFamily:"$DM_Sans",
		fontWeight:"600",
		color:"$cinzaEscuro02",
	},
	"& svg":{
		width:"1rem",
		height:"1rem",
		color:"$purpleFwo",
	},
});

export const FielValue = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap:".1rem",
	width:"100%",
	"& p":{
		fontSize:"0.75rem",
		fontFamily:"$DM_Sans",
		fontWeight:"400",
		color:"$cinzaEscuro02",
		textOverflow:"ellipsis",
		overflow:"hidden",
		whiteSpace:"nowrap",
		width:"100%",
	},
});



export const TagButton = styled("div", {

	display: "flex",
	flexDirection: "row",
	width: "fit-content",
	padding: "0.2rem 0.87rem",
	backgroundColor: "#FFF",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	borderRadius: "30px",
	textAlign: "center",
	fontSize: "0.75rem",
	fontWeight: "400",
	color: "$white",
	fontFamily: "$DM_Sans",
	svg: {
		width: "0.75rem",
		height: "0.75rem",
		color: "$purpleFwo",
	},
  })