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
	height: "100%",
	width: "100%",
	backgroundColor: "$background",
	fontFamily: "$Panchang",
	animation: `${fadeIn} .5s ease-in-out`,
	padding: "1rem 0.5rem",
	// overflow: "hidden",
	// overflowX: "auto",
	// padding: "1rem 0.5rem",
	// paddingBottom: "0rem",

});
