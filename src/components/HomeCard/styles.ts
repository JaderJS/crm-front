import { keyframes, styled } from "@/styles";
import "animate.css/animate.min.css";

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

export const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-around",
	
	width: "100%",
	minWidth: "11.875rem",
	
	// aspectRatio: "1.2/1",
	aspectRatio: "17.8125rem / 15.625rem", // aspect ratio baseado nos valores de largura e altura desejados

	backgroundColor: "$cinzaClaroPrincipal",
	borderRadius: "30px",
	padding: "1.5rem",
	border: "1px solid #EEEEEE",
	background: "var(#F8F8F8, #F8F8F8)",
	boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.04)",
	transition: "all 0.3s ease-in-out",
	animation: ` ${fadeIn} 0.2s ease-in-out`,
	"&:hover": {
		border: "1px solid rgba(120, 65, 176, 1)",
		boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",
	},

	"&.Disabled": {
		border: "1px solid #EEEEEE",
		boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",

		"&:hover": {
			border: "1px solid #EEEEEE",
			boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",
		},
	},

	variants: {
		background: {
			white: {
				backgroundColor: "#F8F8F8",
			},
			black: {
				backgroundColor: "$blackBackground",
			},
			purple: {
				backgroundColor: "#7841B0",
			},
		},
		enable: {
			false: {
				border: "1px solid transparent",
				backgroundColor: "transparent",
				boxShadow: "none",
				
				"&:hover": {
					border: "1px solid transparent",
					backgroundColor: "transparent",
					boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.0)",
					cursor: "default",
				},
			},
		},
	},

	defaultVariants: {
		background: "white",
	},

	// "@media (min-width: 768px) and (max-width: 991px)": {
	//    width: "15.625rem",
	//    height: "15.625rem",
	// },
	// "@media (min-width: 768px) and (max-width: 1280px)": {
	// 	width : "12.8rem",
	// 	height: "12rem",
	// },

});
export const ContainerLoading = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-between",
	width: "100%",
	minWidth: "11.875rem",
	
	// aspectRatio: "1.2/1",
	aspectRatio: "285 / 250", // aspect ratio baseado nos valores de largura e altura desejados

	backgroundColor: "$cinzaClaroPrincipal",
	borderRadius: "30px",
	padding: "1.5rem",
	border: "1px solid #EEEEEE",
	background: "var(#F8F8F8, #F8F8F8)",
	boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.04)",
	transition: "all 0.3s ease-in-out",
	animation: ` ${fadeIn} 0.2s ease-in-out`,
	"&:hover": {
		border: "1px solid rgba(120, 65, 176, 1)",
		boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",
	},

	"&.Disabled": {
		border: "1px solid #EEEEEE",
		boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",

		"&:hover": {
			border: "1px solid #EEEEEE",
			boxShadow: "0px 19px 23px 0px rgba(0, 0, 0, 0.1)",
		},
	},
	variants: {
		background: {
			white: {
				backgroundColor: "#F8F8F8",
			},
			black: {
				backgroundColor: "$blackBackground",
			},
			purple: {
				backgroundColor: "#7841B0",
			},
		},
	},

	defaultVariants: {
		background: "white",
	},

	// "@media (min-width: 768px) and (max-width: 991px)": {
	//    width: "15.625rem",
	//    height: "15.625rem",
	// },


});
export const ImageOrIcon = styled("div", {
	display: "flex",
	flexDirection: "row",
	width: "100%",
	height: "2rem",
	alignItems: "center",
	justifyContent: "flex-start",

	svg: {
		width: "2rem",
		height: "2rem",
		color: "$purpleFwo",
	},

	img: {
		width: "2.5rem",
		height: "2.5rem",
		borderRadius: "50%",
		objectFit: "cover",
	},


});

export const Title = styled("h2", {
	fontSize: "1rem",
	fontWeight: 700,
	color: "$blackText",
	fontFamily: "$DM_Sans",
	variants: {
		color: {
			white: {
				color: "$blackText",
			},
			black: {
				color: "$white",
			},
			purple: {
				color: "$purpleFwo",
			},
		},
	},
});

export const Description = styled("p", {
	fontSize: "0.875rem",
	fontWeight: 400,
	color: "$cinzaDark",
	fontFamily: "$DM_Sans",
	maxWidth: "15.625rem",
	width:"100%",
	// maxHeight: "4.125rem",
	// height:"100%",
	wordBreak: "break-word",
	overflow: "hidden",
	textOverflow: "ellipsis",
	display: "-webkit-box",
	"-webkit-line-clamp": 2,
	"-webkit-box-orient": "vertical",
	textAlign: "left",

	variants: {
		color: {
			white: {
				color: "$cinzaDark",
			},
			black: {
				color: "$cinzaClaro02",
			},
			purple: {
				color: "$purpleFwo",
			},
		},
	},
});

const borderRotate = keyframes({
	"0%": {
		borderColor: "transparent",
	},
	"50%": {
		borderColor: "#7841B0", // Cor roxa para a borda durante a animação
	},
	"100%": {
		borderColor: "transparent",
	},
});

export const Button = styled("button", {
	border: "none",
	// width: "11.3rem",
	minWidth: "6rem",
	maxWidth: "11.3rem",
	width: "100%",

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

});
