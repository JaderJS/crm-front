import { styled } from "@/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export const InputContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	width: "100%",
	height: "3.75rem",
	borderRadius: "5px",
	border: "1px solid #E5E5E5",
	backgroundColor: "transparent",
	padding: "0 1rem",
	fontSize: "1rem",
	transition: "all 0.3s ease-in-out",
	justifyContent: "space-between", // alinhar os itens do container no começo e no final




	"input[type='date']": {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		border: "none",
		outline: "none",
		fontSize: "1rem",

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
		backgroundColor: "transparent",
		border: "none",
		outline: "none",
		fontSize: "1rem",
		color: "$blackText",
		fontFamily: "$DM_Sans",
		transition: "all 0.3s ease-in-out",
		"&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
			"-webkit-text-fill-color": "#000", // ou a cor que você preferir

			transition: "background-color 50000s ease-in-out 0s",
		},
	},

	svg: {
		width: "1rem",
		height: "1rem",
		transition: "all 0.3s ease-in-out",
	},

	variants: {
		focusColor: {
			red: {
				"&:focus-within": {
					border: "1px solid #DC2424",

					svg: {
						color: "#DC2424",
						transition: "all 0.3s ease-in-out",
					}
				},

			},

			green: {
				"&:focus-within": {
					border: "1px solid #26C666",

					svg: {
						color: "#26C666",
					},
				},
			},
			none: {
				"&:focus-within": {
					border: "1px solid transparent",
				},
			},
		},

		hover: {
			red: {
				"&:hover": {
					border: "1px solid red",
					color: "red",
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
					border: "1px solid #26C666",
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
					border: "1px solid transparent",
					color: "transparent",
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
					color: "$redFwo",
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
		},
	},
	defaultVariants: {
		hover: "red",
	},
});
