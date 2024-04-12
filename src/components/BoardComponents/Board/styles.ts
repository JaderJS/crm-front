import { keyframes, styled } from "@/styles";


const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

export const KanbanContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "left",
	justifyContent: "flex-start",

	width: "100vw",
	backgroundColor: "$white",
	height: "98%",
	// animation: `${fadeIn} .5s ease-in-out`,
	overflowX: "auto",
	paddingRight: "1.25rem",

	// "&::-webkit-scrollbar": {
	// 	width: ".75rem",
	// 	height: ".75rem",
	// },

	"&::-webkit-scrollbar": {
		transition: "all 0.2s ease-in-out",
		width: "3px",
		height: "12px",
		// backgroundColor: "transparent",
	  },
  
	  "&::-webkit-scrollbar-track": {
		background: "transparent",
	  },
	  "&::-webkit-scrollbar-thumb": {
		backgroundColor: "$purpleFwo",
		borderRadius: "5px",
	  },
  
	  /* Scrollbar Horizontal */
	  "&::-webkit-scrollbar-corner": {
		background: "red",
	  },
	  "&::-webkit-scrollbar-thumb:horizontal": {
		backgroundColor: "$purpleFwo",
		borderRadius: "10px",
		border: "0px solid $backgroundGray",
		display: "block",
		// height: "5px",
		// width: "7px",
	  },
});



export const ColumnContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "22.5rem",
    
	height: "95%",
	flexShrink: 0,
	borderRadius: "1.875rem",
	marginRight: "1.25rem",
	gap: "1.5rem",
	backgroundColor: "transparent",
	animation: `${fadeIn} .5s ease-in-out`,


	
});



export const DroppableContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "22.5rem",
	backgroundColor: "#F8F8F8",
	height: "90%",
	overflowY: "auto",
	overflowX: "hidden",
	padding: "1.25rem",

	paddingBottom: "15rem",
	flexShrink: 0,
	borderRadius: "1.875rem",
	borderTopRightRadius: "0",
	transition: "all 0.2s ease-in-out",
	scrollBehavior: "smooth",
	animation: `${fadeIn} .7s ease-in-out`,

});



export const HeaderContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "5rem",
	minHeight: "5rem",
	maxHeight: "5rem",
	padding: "1.25rem",
  
});


export const HeaderTitle = styled("h1", {
	fontSize: "1rem",
	fontWeight: 700,
	lineHeight: "1.875rem",
	color: "$white",
	fontFamily: "$DM_Sans",
	width: "100%",
	zIndex: 0,
});

export const HeaderBottom = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	height: "1.25rem",
	minHeight: "1.25rem",
	paddingRight: "2.9rem",
	zIndex: 0,
});

export const Item = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	minWidth: "2.5rem",
	width: "3.5rem",

	"& > svg": {
		cursor: "pointer",
		transition: "all 0.2s ease-in-out",
		width: ".85rem",
		height: ".85rem",
		color: "$white",
		marginRight: ".25rem",
	},

	"& span": {
		fontSize: ".75rem",
		fontWeight: 400,
		lineHeight: "1.125rem",
		fontFamily: "$DM_Sans",
		color: "$white",
	},
	zIndex: 0,

});

