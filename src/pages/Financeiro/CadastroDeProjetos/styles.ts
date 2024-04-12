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
	fontFamily: "$Panchang",
	animation: `${fadeIn} .5s ease-in-out`,
	overflow: "hidden",
	overflowX: "auto",
	padding: "2rem 2rem",
});
