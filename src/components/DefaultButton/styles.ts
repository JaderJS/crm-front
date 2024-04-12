import { styled, css } from "@/styles";

export const ButtonContainer = styled("button", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	fontFamily: "$DM_Sans",
	width: "13.81rem",
	height: "3.81rem",
	borderRadius: "10px",
	border: "1px solid transparent",
	textAlign: "center",
	fontSize: ".75rem",
	gap: "0.5rem",
	fontWeight: 500,
	transition: "all 0.3s ease-in-out",

	"&:hover": {
		filter: "brightness(1.2)",
		transition: "all 0.3s ease-in-out",
	},

	"&:disabled": {
		backgroundColor: "$cinzaClaro02 !important",
		background: "$cinzaClaro02 !important",
		color: "$blackText",
		cursor: "not-allowed",
		border: "1px solid $cinzaClaro02",
		"&:hover": {
			filter: "brightness(1)",
			transition: "all 0.3s ease-in-out",
		},
	},

	variants: {
		backgroundColor: {
			red: { backgroundColor: "$redFwo" },
			gradientFwo: { background: "$gradientFwo" },
			greenV4: { backgroundColor: "$greenV4" },
			transparent: { backgroundColor: "transparent", color: "$blackText" },
			gray: { backgroundColor: "$cinzaClaro02", color: "$white" },
			purple: { backgroundColor: "$purpleFwo", color: "$white" },
			white: { backgroundColor: "$white", color: "$blackText" },
			darkGray: { backgroundColor: "#A1A1A5", color: "$white" },
		},

		color: {
			white: { color: "white" },
			red: { color: "$redFwo" },
			black: { color: "$blackText" },
			purple: { color: "$purpleFwo" },
			greenV4: { color: "$greenV4" },
		},

		sizeType: {
			primary: {
				width: "13.81rem",
				height: "3.81rem",
			},
			padrãoPeq: {
				width: "11.3rem",
				height: "2.3rem",
			},
			padrãoGg: { width: "22.625rem", height: "2.3rem" },
		},

		hover: {
			NeonRedShadowEffect: {
				"&:hover": {
					boxShadow: "inset 0px 0px 1px #b3b3b3",
					transition: "all 0.3s ease-in-out",
					filter: "drop-shadow(0px 0px 5px #E50914)",
					border: "1px solid #E50914",
				},
			},

			NeonGreenShadowEffect: {
				"&:hover": {
					boxShadow: "inset 0px 0px 1px #b3b3b3",
					transition: "all 0.3s ease-in-out",
					filter: "drop-shadow(0px 0px 5px #26C666)",
				},
			},
			NeonPurpleShadowEffect: {
				"&:hover": {
					boxShadow: " 1px 2px 3px #7841B0",
					transition: "all 0.3s ease-in-out",
				},
			},
			Gray: {
				"&:hover": {
					boxShadow: "inset 0px 0px 1px #b3b3b3",
					transition: "all 0.3s ease-in-out",
					filter: "drop-shadow(0px 0px 5px #b3b3b3)",
				},
			},
		},

		border: {
			gradientFwo: {
				borderLeft: "1px solid #DD2424",
				borderRight: "1px solid #7942B1",
				borderTop: "1px solid #7942B1",
				borderBottom: "1px solid #DD2424",
			},
		},

		svgSize: {
			small: {
				svg: {
					width: "12px",
					height: "12px",
				},
			},
		},

		animationSvg: {
			arrowRight: {
				"&:hover svg": {
					transform: "translateX(0.5rem)",
					transition: "all 0.3s ease-in-out",
					color: "#ffffff",
				},
			},
		},
	},
	defaultVariants: {
		backgroundColor: "purple",
		color: "white",
		sizeType: "padrãoPeq",
		svgSize: "small",
	},
});
