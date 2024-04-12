import { styled,keyframes } from "@/styles";

const fadeIn = keyframes({
	"0%": {
		opacity: 0,
	},
	"100%": {
		opacity: 1,
	},
});

export const CalendarContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "1.5rem",
	padding: "1rem",
	paddingBottom: ".5rem",
	fontFamily: "$MindForge",
	backgroundColor: "$blackBackground",
	borderBottom : "1px solid #444",
	width: "100%",
});
  
export const CalendarHeader = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",

	button: {
		all: "unset",
		cursor: "pointer",
		lineHeight: 0,
		borderRadius: "5px",
  
		svg: {
			width: ".75rem",
			height: ".75rem",
			color: "$cinzaClaro01",
		},
  
		"&:hover": {
			color: "$cinzaClaro02",
		},
  
  
	},
});
  
export const CalendarTitle = styled("p", {
	fontWeight: "normal",
	textTransform: "capitalize",
	color: "$white",
	span: {
		color: "$purpleFwo",
	},
});
  
export const CalendarActions = styled("div", {
	display: "flex",
	gap: ".5rem",
	color: "$cinzaClaro01",
  
	button: {
		all: "unset",
		cursor: "pointer",
		lineHeight: 0,
		borderRadius: "5px",
  
		svg: {
			width: "0.625rem",
			height: "0.625rem",
		},
  
		"&:hover": {
			color: "$blackText",
		},
  
		"&:focus": {
			boxShadow: "0 0 0 2px $colors$purpleFwo",
		},
	},
});
  
export const CalendarBody = styled("table", {
	width: "100%",
	fontFamily: "$DM_Sans",
	borderSpacing: "0.25rem",
	tableLayout: "fixed",
	borderCollapse: "separate",
	minWidth: "13.5625rem",
	maxWidth: "20.5625rem",
	minHeight: "13.5625rem",
	maxHeight: "15.5625rem",
	backgroundColor: "$blackBackground",
	"thead th": {
		color: "#A1A1A5",
		fontWeight: "bold",
		fontSize: "0.75rem",
	},
  
	"tbody:before": {
		lineHeight: "0.75rem",
		content: "attr(data-month)",
		display: "block",
		color: "$cinzaClaro02",
	},
  
	"tbody td": {
		boxSizing: "border-box",
	},
});
  
export const CalendarDay = styled("button", {
	all: "unset",
	width: "100%",
	aspectRatio: "1 / 1",
	background: "$blackBackground",
	textAlign: "center",
	cursor: "pointer",
	borderRadius: "5px",
	color: "$cinzaClaro01",
	fontSize: "0.7rem",
	transition: "all 0.3s ease-in-out",
	"&:disabled": {
		background: "none",
		cursor: "default",
		opacity: 0.4,
	},
  
	"&:not(:disabled):hover": {
		background: "$cinzaDark",
		color: "$white",
		boxShadow: "0 0 0 2px $colors$purpleFwo",
		borderRadius: "9999px",
	},
  
	"&:focus": {
		boxShadow: "0 0 0 2px $colors$purpleFwo",
		backgroundColor:"$purpleFwo",
		borderRadius: "9999px",
	},

	"&.has-event": {
		position: "relative",
		"&:after": {
			content: "''",
			position: "absolute",
			width: "0.5rem",
			height: "0.5rem",
			borderRadius: "50%",
			backgroundColor: "$purpleFwo",
			top: "0.125rem",
			right: "0.35rem",
		},
	},
  

	variants: {
		selected: {
			true: {
				backgroundColor: "$purpleFwo",
				color: "$white",
				borderRadius: "9999px",
			},
		},
	},
});




  
export const Container = styled("div", {
	// margin: "1.5rem auto 0  ",
	padding: "1.5rem",
	display: "Flex",
	flexDirection: "column",
	width: "100%",
	height: "100%",
	minWidth: "20rem",
	position: "relative",
	backgroundColor: "$blackBackground",
	borderRadius: "30px",



});

export const TimePicker = styled("div", {
  
	// padding: ".5rem .5rem",
	overflowY: "scroll",
	overflowX: "hidden",
	position: "relative",
	width: "100%",
	maxHeight: "11rem",
	minHeight: "11rem",

	"&::-webkit-scrollbar-track": {
		background: "$blackBackground",
	},

});

export const TimePickerHeader = styled("p", {
	fontWeight: "bold",
	padding : "1rem 0",
	span: {
		color: "$white",
		fontWeight: "bold",
		fontSize: "1rem",
		padding: "0 1rem",
		fontFamily: "$DM_Sans",
	},
});

export const TimePickerList = styled("div", {
	display: "grid",
	gridTemplateColumns: "1fr",
	backgroundColor: "$blackBackground",
	"@media (max-width: 900px)": {
		gridTemplateColumns: "2fr",
	},
});

export const TimePickerItem = styled("button", {
	border: 0,
	backgroundColor: "$blackBackground",
	padding: ".5rem 1rem",
	cursor: "pointer",
	color: "$white",
	borderRadius: "5px",
	borderBottom: "1px solid #444",
	fontSize: ".75rem",
	lineHeight: "1.5rem",
	transition: "all 0.3s ease-in-out",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	display:"flex",
	flexDirection:"row",
	alignItems:"center",
	gap:".5rem",
  
	animation: `${fadeIn} 0.3s ease-in-out`,


	"&:last-child": {
		marginBottom: "1.5rem",
	},

	"&:disabled": {
		background: "none",
		cursor: "default",
		opacity: 0.4,
	},

	"&:not(:disabled):hover": {
		background: "$purpleFwo",
		color: "$white",
		boxShadow: "0 0 0 2px $colors$purpleFwo",
	},

	// "&:focus": {
	//   boxShadow: "0 0 0 5px $colors$purpleFwo",
	// },

	"& span": {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
		width: "80%",
		height: "2.5rem",
		margin: "0",
		padding: "0",
		fontSize: "0.75rem",
		fontWeight: "bold",
		gap: ".25rem",
		"& div": {
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-start",
			fontSize: "0.525rem",
			fontWeight: "lighter",

			margin: "0",
			padding: "0",
			lineHeight: "0",
        
		},
	},

});

export const SvgIcon = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "1.5rem",
	height: "1.5rem",
	backgroundColor: "$white",
	borderRadius: "50%",

	"& svg": {
		width: ".85rem",
		height: ".85rem",
		color: "$purpleFwo",
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
