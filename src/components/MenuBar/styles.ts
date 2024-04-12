import { Background } from "./../../pages/Login/styles";
import { keyframes, styled } from "@/styles";
import * as Accordion from "@radix-ui/react-accordion";

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

export const LogoAndButton = styled("div", {
	transition: "transform 0.2s ease",
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	marginBottom: "1rem",

	button: {
		all: "unset",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "1rem",
		height: "1rem",
		borderRadius: "50%",
		cursor: "pointer",
		transition: "all 0.3s ease-in-out",
		marginTop: "1rem",

		svg: {
			width: "1rem",
			minWidth: "1rem",
			height: "1rem",
			minHeight: "1rem",
			color: "#fff",
		},
		"&:hover": {
			svg: {
				color: "#000",
			},
		},
	},

	variants: {
		open: {
			true: {
				justifyContent: "space-between",
				width: "100%",
				paddingLeft: "1.5rem",
				paddingRight: "1.5rem",
			},
			false: {
				justifyContent: "center",
			},
		},
	},
});

const moveBackground = keyframes({
	"0%": { backgroundPosition: "200% 200%" },
	"25%": { backgroundPosition: "100% 0%" },
	"50%": { backgroundPosition: "0% 100%" },
	"75%": { backgroundPosition: "200% 200%" },
	"100%": { backgroundPosition: "0% 0%" },
});


export const MenuContainer = styled("div", {

	display: "flex",
	background:" var(--GRADIENTE-OK, linear-gradient(210deg, #7841B0 -0.23%, #DC2424 84.96%))",

	flexDirection: "column",
	alignItems: "center",
	height: "100vh",
	// background: "linear-gradient(231deg, #7841B0 0%, #DC2424 100%)",
	fontFamily: "$DM_Sans",
	padding: "3rem 0",
	borderRadius: "0 4.375rem 4.375rem 0",
	boxShadow: "-2px 0px 2px 0px rgba(0, 0, 0, 0.05) inset",
	animation: `${fadeIn} 0.3s ease-in-out`,
	
	position: "relative",
	zIndex: 999999,

	

	variants: {
		open: {
			true: {
				width: "14.625rem",
				maxWidth: "14.625rem",
				minWidth: "14.625rem",
				transition: "all 0.2s ease",


				
			},
			false: {
				width: "3rem",
				minWidth: "3rem",
				transition: "all 0.15s ease",
				overflow: "hidden",
			},
		},
	},
});

export const MenuContainerBoard = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	
	background: "linear-gradient(231deg, #7841B0 0%, #DC2424 100%)",
	fontFamily: "$DM_Sans",
	padding: "3rem 0",
	borderRadius: "0 4.375rem 4.375rem 0",
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
	animation: `${fadeIn} 0.7s ease-in-out`,
	
	position: "relative",
	zIndex: 999999,

	variants: {
		open: {
			true: {
				width: "14.625rem",
				maxWidth: "14.625rem",
				minWidth: "14.625rem",
				transition: "all 0.1s ease",
				position: "absolute",
				height: "100vh",

			},
			false: {
				padding: "0",
				top: "31%",

				width: "2.2rem",
				minWidth: "2.2rem",
				height: "2.6rem",
				minHeight: "2rem",
				// transition: "all 0.1s ease",
				overflow: "hidden",
				paddingLeft: ".5rem",
				paddingRight: "1rem",
				paddingTop: ".8rem",
				position: "absolute",
				transition: "box-shadow 0.2s ease-in-out",


				img: {
					width: "1rem",
					height: "1rem",
				},

				"&:hover": {
					filter: "brightness(1.05)",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 1.5)",

				}
				
			},
		},
	},
});



const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

const slideDown = keyframes({
	from: { height: 0 },
	to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
	from: { height: "auto" },
	to: { height: 0 },
});

export const StyledContent = styled(Accordion.Content, {
	// overflow: "hidden",
	fontSize: "0.75rem",
	color: "#FFF",
	fontWeight: 500,
	wordBreak: "break-word",
	boxSizing: "border-box",
	"&[data-state=open]": {
		animation: `${slideDown} 0.2s ease-in-out`,
	},
	"&[data-state=closed]": {
		animation: `${slideUp} ${fadeOut} 0.2s ease-in-out`,
	},
	marginTop: ".5rem",

	width: "100%",
	paddingLeft: "3.5rem",
	gap: ".5rem",
	flexDirection: "column",
	a: {
		position: "relative", 
		textDecoration: "none",
		color: "#FFF",
		fontWeight: 500,
		fontSize: "0.85rem",
		display: "flex",
		alignItems: "center",
		width: "fit-content",
		height: "1.8rem",
		
		"&::before": {
			content: "''",
			position: "absolute",
			bottom: 0,
			left: 0,
			width: 0,
			height: "2px",
			backgroundColor: "#FFF",
			transition: "width 0.2s ease-in-out, left 0.2s ease-in-out",
		},

		"&:hover": {
			color: "#fff",

			"&::before": {
				width: "105%",
				left: 0,
			},
		},

		"&.active": {
			color: "$white",

			"&::before": {
				width: "105%",
				left: 0,
			},

			"&:hover": {
				color: "$white",
			},
		},
	},

	variants: {
		open: {
			true: {
				display: "flex",
			},
			false: {
				display: "none",
			},
		},
	},
});

export const StyledChevron = styled("div", {
	color: "$black",

	transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
	"[data-state=open] &": { transform: "rotate(180deg)" },
	width: "1rem",
	height: "1rem",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "50%",

	svg: {
		width: "100%",
		height: "100%",
	},

	variants: {
		open: {
			true: {
				display: "flex",
			},
			false: {
				display: "none",
			},
		},
	},
});

export const StyledTrigger = styled(Accordion.Trigger, {
	all: "unset",
	display: "flex",
	alignItems: "center",

	width: "100%",
	height: "1.5rem",
	maxHeight: "2rem",
	justifyContent: "space-between",
	boxSizing: "border-box", 

	border: "1px solid transparent",
	paddingRight: "1rem",
});

export const IconAndTitle = styled("div", {
	display: "flex",
	alignItems: "center",
	gap: "0.7rem",
	justifyContent: "flex-start",
	width: "100%",
	height: "1.5rem",
	maxHeight: "2rem",

	span: {
		maxWidth: "6rem",
		// wordBreak: "break-word",

		width: "100%",
		height: "1.5rem",
		maxHeight: "2rem",

		fontSize: ".9rem",
		fontWeight: 700,
		color: "#fff",

		lineHeight: "1rem",
		display: "flex",
		alignItems: "center",
	},

	svg: {
		width: "1.25rem",
		minWidth: "1.25rem",
		height: "1.25rem",
		minHeight: "1.25rem",
		color: "#fff",
	},

	variants: {
		open: {
			true: {
				span: {
					display: "flex",
				},
			},
			false: {
				span: {
					display: "none",
				},
			justifyContent: "center",
			// backgroundColor: "red",

			},
		},
	},
});

export const IsActive = styled("div", {
	width: "0.5rem",
	height: "1.5rem",
	backgroundColor: "#fff",
	borderRadius: "0rem 0.375rem 0.375rem 0rem",
	transition: "all 0.3s ease-in-out",
	variants: {
		active: {
			true: {
				backgroundColor: "#fff",
			},
			false: {
				backgroundColor: "transparent",
			},
		},
	},
});

export const AccordionItem = styled(Accordion.Item, {
	display: "flex",
	marginBottom: "2rem",
	width: "100%",
	flexDirection: "column",
});

export const LogOutButton = styled("button", {
	all: "unset",
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	height: "1.5rem",
	paddingLeft: "3rem",

	"&:hover": {
		cursor: "pointer",
	},

	svg: {
		width: "1.5rem",
		height: "1.5rem",
		color: "#fff",
	},

	span: {
		fontSize: "0.875rem",
		color: "#FFF",
		fontWeight: 400,
	},

	variants: {
		open: {
			true: {
				display: "flex",
				gap: "0.7rem",
			},
			false: {
				justifyContent: "center",
				paddingLeft: "0",
				span: {
					display: "none",
				},
			},
		},
	},
});
