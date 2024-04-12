import { styled, keyframes } from "@/styles";

const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});
export const Container = styled("form", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100vh",
	width: "100vw",
	backgroundColor: "$background",
	fontFamily: "$DM_Sans",
	overflow: "hidden",
	animation: `${fadeIn} 1s ease-in-out`,
	label: {
		color: "$blackText",
		fontSize: "1rem",
		fontWeight: 300,
	},
});

export const SliderButtons = styled("div", {
	position: "fixed",
	bottom: "1.5rem",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-around",
	width: "19rem",
	height: "1rem",

	zIndex: 1000,

	"& hr": {
		all: "unset",
		width: "60%",
		height: "1px",
		backgroundColor: "$redFwo",
	},

	"& button": {
		all: "unset",
		width: "1rem",
		height: "1rem",
		"& svg": {
			width: "1rem",
			height: "1rem",
			color: "$redFwo",
		},
		"&:hover": {
			cursor: "pointer",
			"& svg": {
				color: "$purpleFwo",
			},
		},
	},
});

export const H2Gradient = styled("h2", {
	fontSize: "2.35269rem",
	fontWeight: "500",
	color: "$black",
	fontFamily: "$Panchang",
});

export const H2GradientON = styled("h2", {
	fontSize: "2.35269rem",
	fontWeight: "500",
	color: "$white",
	fontFamily: "$Panchang",
	background: "$gradientFwo",
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
	backgroundClip: "text",
	textFillColor: "transparent",
});

export const Step = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100vw",
	height: "100vh",
	paddingTop: "5rem",
	gap: "2rem",

	"& span": {
		fontSize: ".8rem",
		fontWeight: 300,
		marginTop: "-1rem",
		width: "65%",
		textAlign: "left",
	},
});

export const SliderContainer = styled("div", {
	position: "relative",
	width: "100%",

	height: "100%",

	flexDirection: "column",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",

	overflow: "hidden",
	padding: "0 2rem",
});

export const StepContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	overflow: "hidden",
});

export const ImagePreview = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "8rem",
	height: "8rem",

	"& img": {
		width: "100%",
		height: "100%",
		borderRadius: "30px",
		objectFit: "cover",
		objectPosition: "center",
	},
});

export const ButtonsContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "9rem",
	height: "6.125rem",
	gap: "1rem",
	marginLeft: "1rem",
});
