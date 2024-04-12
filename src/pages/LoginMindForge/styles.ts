import { styled, keyframes } from "@/styles";
import "animate.css/animate.min.css";

export const Background = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-end",
	height: "100vh",
	width: "100vw",
	backgroundColor: "$greenV4",
	fontFamily: "$MindForge",
	overflowX: "hidden",
});

export const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100Vh",
	width: "80vw",
	background: "#FFFFFF",
	borderRadius: "187px 0px 0px 187px",
	paddingRight: "10rem",
});

export const Form = styled("form", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",

	width: "32.1875rem",
	color: "#9E9E9E",
	fontFamily: "$DM_Sans",

	h2: {
		WebkitBackgroundClip: "text",
		color: "$blackText",
		fontWeight: 500,
		fontSize: "1.49625rem",
		marginTop: "4rem",
		fontFamily: "$MindForge",
	},
});

export const LogoContainer = styled("button", {
	border: "none",
	marginTop: "2rem",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	gap: "1.5rem",
	height: "5.5rem",
	maxWidth: "10rem",
	width: "100%",
	borderRadius: "5px",
	position: "relative",
	zIndex: 999,
	backgroundColor: "transparent",
	transform: "translateX(0)",
	transition: "all 0.3s ease-in-out",
	padding: "0.5rem 1rem",
	img: {
		width: "8.5rem",
		height: "2.6rem",
		transition: "all 0.3s ease-in-out",
		transform: "translateX(0)",
		// filter:
		//   "invert(52%) sepia(100%) saturate(365%) hue-rotate(92deg) brightness(101%) contrast(87%)",

		" &:hover": {
			cursor: "pointer",
		},

		"@media only screen and (max-width: 480px)": {
			width: "4rem",
			maxWidth: "4.3rem",
			maxHeight: "3.4375rem",
			backgroundColor: "transparent",

			img: {
				width: "5.5rem",
				height: "2rem",
				transition: "all 0.3s ease-in-out",
			},
		},
	},

	"@media only screen and (max-width: 480px)": {
		width: "2.9rem",
		maxWidth: "2.9rem",
		maxHeight: "3.4375rem",

		height: "3.4375rem",
		overflow: "hidden",
		// img: {
		//   filter :"invert(52%) sepia(100%) saturate(365%) hue-rotate(92deg) brightness(101%) contrast(87%)",
		//   //  " &:hover": {
		//   //   filter: "invert(52%) sepia(100%) saturate(365%) hue-rotate(92deg) brightness(101%) contrast(87%) drop-shadow(0px 0px 5px rgba(38, 198, 102, 1) )",
		//   //  },
		// },
	},
});
