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
	animation: `${fadeIn} .5s ease-in-out`,
	padding: "1rem 0.5rem",
	overflow: "hidden",
	overflowX: "scroll",
	gap: "1rem",
	
});

export const LeftSide = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	height: "100%",
	width: "24rem",
	minWidth: "24rem",
	overflowY: "scroll ",
	marginRight: ".5rem",
	paddingBottom: "3rem",

	"&::-webkit-scrollbar": {
		width: "5px",
		height: "5px",
	},

	"&::-webkit-scrollbar-track": {
		background: "transparent",
	},

	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "transparent",
		borderRadius: "10px",
		border: "0px solid transparent",
	},

	"&::-webkit-autofill": {
		backgroundColor: "transparent",
	},
});

export const RightSide = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	height: "100%",
	width: "100%",
	minWidth: "43.6rem",
	paddingRight: ".5rem",
	overflowY: "scroll",
	overflowX: "scroll",
	gap: "1.75rem",
	paddingBottom: "3rem",
	
});


export const DialogContainer = styled("div", {
	position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "auto",
    // minHeight: "calc(100$ + 4rem)",
    width: "35vw",
    minWidth: "25rem",
    backgroundColor: "$cinzaClaro02",
    fontFamily: "$DM_Sans",
    // animation: `${fadeIn} .3s ease-in-out`,
    padding: "1.8rem 1.8rem",
    paddingBottom: "3rem",
    gap: "1.5rem",
    zIndex: 1,
    borderRadius:"1.875rem",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",    


  })
