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
	padding: "2rem 2rem",
	gap: "2rem",
	overflow: "auto",

});

export const UserInfoContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",

	width: "51.375rem",
	minWidth: "51.375rem",
	height: "13.1875rem",
	minHeight: "13.1875rem",
	border: "1px solid rgba(68, 68, 68, .3)",
	borderRadius: "30px",
	padding: "1.57rem",


	img: {
		width: "9.375rem",
		minWidth: "9.375rem",
		height: "100%",
		borderRadius: "15px",
		objectFit: "cover",
		objectPosition: "center",
	},


})

export const VerticalLine = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "0.125rem",
	minWidth: "0.125rem",
	height: "5.6875rem",
	border: "1px solid rgba(68, 68, 68,.5)",
	borderRadius: "30px",
})

export const UserInfo = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-between",
	minWidth: "19.5rem",
	height: "100%",
	paddingRight: "1.57rem",

	"& > div": {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",

	},
	"& > button": {
		width: "11.3125rem",
		height: "2rem",
		borderRadius: "10px",
	},
});

export const SecondInfos = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-between",
	width: "100%",
	maxWidth: "15.0625rem",
	height: "50%",
});

export const TableContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-between",
	width: "100%",
	minWidth: "93.75rem",

	// maxWidth: "80.75rem",
	// minWidth: "70.25rem",
	height: "100%",
	minHeight: "25.5rem",
	animation: `${fadeIn} .5s ease-in-out`,
});

export const TableHeader = styled("div", {
	position: "relative",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	maxWidth: "93.75rem",

	height: "4.875rem",
	backgroundColor: "$purpleFwo",

	borderRadius: "1.875rem 1.875rem 0rem 0rem",
	padding: "1rem 1.875rem",


	"& svg": {
		width: "1.5rem",
		height: "1.5rem",
		color: "$white",
		marginRight: ".4rem",
	},
});

export const CompanyName = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	maxWidth: "20.13rem",
	height: "100%",
	borderRight: "1px solid #fff",
	color: "$white",
	fontSize: "1.125rem",
	fontWeight: "600",
	paddingRight: "1.875rem",
});

export const LifeTime = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	maxWidth: "13.13rem",
	height: "100%",
	borderRight: "1px solid #fff",
	color: "$white",
	fontSize: "1.125rem",
	fontWeight: "600",
});

export const Step = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	maxWidth: "13.13rem",
	height: "100%",
	borderRight: "1px solid #fff",
	color: "$white",
	fontSize: "1.125rem",
	fontWeight: "600",
});

export const Flag1 = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	maxWidth: "12.13rem",
	height: "100%",
	color: "$white",
	fontSize: "1.125rem",
	fontWeight: "600",
});

export const Projects = styled("div", {
	position: "relative",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	maxWidth: "93.75rem",
	height: "4.37rem",
	padding: "1rem 1.875rem",
	backgroundColor: "#F8F8F8",

});

export const BodyCompanyName = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	maxWidth: "20.13rem",
	height: "100%",
	borderRight: "1px solid #fff",
	color: "$blackText",
	fontSize: "0.75rem",
	fontWeight: "600",
	paddingRight: "1.875rem",
	backgroundColor: "#F8F8F8",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const BodyLifeTime = styled("div", {

	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	maxWidth: "13.13rem",
	height: "100%",
	borderRight: "1px solid #fff",
	color: "$blackText",
	fontSize: ".75rem",
	fontWeight: "600",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const BodyStep = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	maxWidth: "13.13rem",
	height: "100%",
	borderRight: "1px solid #fff",
	color: "$blackText",
	fontSize: ".75rem",
	fontWeight: "600",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const BodyFlag = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	maxWidth: "12.13rem",
	height: "100%",
	color: "$blackText",
	fontSize: ".75rem",
	fontWeight: "600",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const Tbody = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "flex-start",
	width: "100%",
	maxWidth: "93.75rem",
	height: "100%",
	backgroundColor: "#FFF",
	gap: ".4rem",
	overflowY: "scroll",
	paddingTop: "0.625rem",
	paddingBottom: "0.625rem",
});

export const ButtonFilter = styled("button", {
	all: "unset",
	position: "absolute",
	top: "1.57rem",

	right: "1rem",
	width: "1.875rem",
	height: "1.875rem",
	borderRadius: "50%",
	backgroundColor: "$purpleFwo",
	cursor: "pointer",

	"& svg": {
		width: "1rem",
		height: "1rem",
		color: "$white",
	},
});


export const GoToProject = styled("button", {
	all: "unset",

	width: "6.875rem",
	height: ".875rem",
	color: "$blackText",
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "absolute",
	top: "40%",
	right: "1.5rem",
	"& svg": {
		width: "1rem",
		height: "1rem",
		color: "$purpleFwo",
	},
	gap: ".4rem",
});