import { styled } from "@/styles";

export const InputContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	width: "100%",
	height: "3rem",
	// border: "1px solid #E5E5E5",
	borderBottom: "1px solid #E5E5E5",
	backgroundColor: "transparent",
	padding: "0 .5rem",
	fontSize: "1rem",
	transition: "all 0.3s ease-in-out",
	justifyContent: "space-between", // alinhar os itens do container no começo e no final
	gap: ".5rem",
	"input[type='date']": {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		border: "none",
		outline: "none",
		fontSize: "1rem",

		"&::-webkit-calendar-picker-indicator": {
			filter: "invert(29%) sepia(57%) saturate(1791%) hue-rotate(246deg) brightness(86%) contrast(88%)",
			transition: "all 0.3s ease-in-out",

			"&:hover": {
				filter: "invert(29%) sepia(57%) saturate(1791%) hue-rotate(246deg) brightness(86%) contrast(88%)",
				cursor: "pointer",
				transform: "scale(1.2)",
			},
		},
	},

	"input[type='time']": {
		"&::-webkit-calendar-picker-indicator": {
			filter: "invert(54%) sepia(76%) saturate(475%) hue-rotate(91deg) brightness(101%) contrast(83%)",
			transition: "all 0.3s ease-in-out",
			"&:hover": {
				filter: "invert(54%) sepia(76%) saturate(475%) hue-rotate(91deg) brightness(101%) contrast(83%)",
				cursor: "pointer",
				transform: "scale(1.2)",
			},
		},
	},
	"input[type='number']": {
		"&::-webkit-calendar-picker-indicator": {
			filter: "invert(54%) sepia(76%) saturate(475%) hue-rotate(91deg) brightness(101%) contrast(83%)",
			transition: "all 0.3s ease-in-out",
			"&:hover": {
				filter: "invert(54%) sepia(76%) saturate(475%) hue-rotate(91deg) brightness(101%) contrast(83%)",
				cursor: "pointer",
				transform: "scale(1.2)",
			},
		},
		"&::-webkit-inner-spin-button": {
			"-webkit-appearance": "none",
			margin: 0,
			padding: 0,
		},
	},

	input: {
		width: "100%",
		height: "100%",
		border: "none",
		outline: "none",
		fontSize: "1rem",
		color: "$blackText",

		transition: "all 0.3s ease-in-out",
		"&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
			"-webkit-text-fill-color": "#000", // ou a cor que você preferir

			transition: "background-color 50000s ease-in-out 0s",
		},
	},

	svg: {
		transition: "all 0.3s ease-in-out",
	},

	variants: {
		focusColor: {
			red: {
				"&:focus-within": {
					borderBottom: "1px solid $redFwo",
					transition: "all 0.3s ease-in-out",
					outline: "none",

					svg: {
						color: "$redFwo",
					},
				},
			},

			green: {
				"&:focus-within": {
					borderBottom: "1px solid #26C666",
					backgroundColor: "transparent",
					transition: "all 0.3s ease-in-out",
					outline: "none",

					svg: {
						color: "#26C666",
						transform: "scale(1.1)",
					},
				},
			},
			none: {
				"&:focus-within": {
					borderBottom: "1px solid transparent",
				},
			},
			gradient: {
				"&:focus-within": {
					borderBottom: "1px solid $gradientFwo",
				},
			},
			roxo: {
				"&:focus-within": {
					borderBottom: "1px solid #7841b0",
				},
			},
		},

		hover: {
			red: {
				"&:hover": {
					borderBottom: "1px solid red",
					backgroundColor: "transparent",
					transition: "all 0.3s ease-in-out",

					svg: {
						color: "$redMain",
						transition: "all 0.3s ease-in-out",
					},
				},
			},
			green: {
				"&:hover": {
					borderBottom: "1px solid #26C666",
					backgroundColor: "transparent",
					transition: "all 0.3s ease-in-out",
					outline: "none",
					cursor: "pointer",

					svg: {
						color: "#26C666",
						transition: "all 0.3s ease-in-out",
						transform: "scale(1.05)",
					},
				},
			},
			none: {
				"&:hover": {
					borderBottom: "1px solid transparent",
					backgroundColor: "transparent",
					transition: "all 0.3s ease-in-out",
				},
			},
			gradient: {
				"&:hover": {
					borderBottom: "1px solid $gradientFwo",
					backgroundColor: "transparent",
					transition: "all 0.3s ease-in-out",
				},
			},
			roxo: {
				"&:hover": {
					borderBottom: "1px solid #7841b0",
					backgroundColor: "transparent",
					transition: "all 0.3s ease-in-out",
				},
			},
		},

		error: {
			true: {
				"&:focus-within": {
					border: "1px solid red",
					color: "red",
					backgroundColor: "transparent",
					transition: "all 0.3s ease-in-out",
					outline: "none",
					boxShadow: "inset 0 0 0 1px red",
				},
				"&:hover": {
					border: "1px solid red",
					color: "red",
					backgroundColor: "transparent",
					transition: "all 0.3s ease-in-out",
					boxShadow: "inset 0 0 0 1px red",
					outline: "none",
				},
			},
		},
		svgColor: {
			red: {
				svg: {
					color: "$redMain",
				},
			},
			green: {
				svg: {
					color: "#26C666",
				},
			},
			grayOpacity: {
				svg: {
					color: "#D9D9D9",
				},
			},
			purple: {
				svg: {
					color: "#7841B0",
				},
			},
		},
	},
	defaultVariants: {
		focusColor: "red",
		hover: "red",
	},
});
