import { styled, keyframes } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100vw",
  backgroundColor: "$background",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} .6s ease-in-out`,
  padding: "1rem .5rem",
  gap: "1rem",
  overflow: "auto",
})

export const TableContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "101.4375rem",
  minWidth: "101.4375rem",
  height: "100%",
  // maxWidth: "75.75rem",
  // minWidth: "70.25rem",
  // height: "32.5625rem",
  // minHeight: "25.5rem"
})

export const TableHeader = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "4.875rem",
  backgroundColor: "$white",

  borderRadius: "1.875rem 1.875rem 0rem 0rem",
  padding: "1rem 1.875rem",
  border: "1px solid #E5E5E5",

  "& svg": {
    width: "1.5rem",
    height: "1.5rem",
    color: "$white",
    marginRight: ".4rem",
  },
})
export const Position = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "5.25rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "#202128",
  fontSize: "1.25rem",
  fontWeight: "400",
  paddingRight: ".5rem",
})

export const Name = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "20rem",
  minWidth: "20rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "#202128",
  fontSize: "1.25rem",
  fontWeight: "600",
  paddingRight: ".5rem",


  "& p": {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	fontSize: "1rem",
	fontWeight: "700",
	color: "$cinzaDark",
	maxWidth: "19rem",
  },

})

export const DocType = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "11.8125rem",
  minWidth: "11.8125rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "#202128",
  fontSize: "1.125rem",
  fontWeight: "600",
  paddingRight: ".5rem",

  "& p": {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	fontSize: "1rem",
	fontWeight: "400",
	color: "$cinzaDark",
  },
})

export const Valor = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "11.5625rem",
  minWidth: "11.5625rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: "1.125rem",
  fontWeight: "600",
  paddingRight: ".5rem",

  "& p": {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	fontSize: "1rem",
	fontWeight: "400",
	color: "$cinzaDark",
  },
})

export const ArqType = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "9.125rem",
  minWidth: "9.125rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: "1.125rem",
  fontWeight: "600",
  paddingRight: ".5rem",
  "& p": {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	fontSize: "1rem",
	fontWeight: "400",
	color: "$cinzaDark",
  },
})

export const ArqSize = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "10rem",
  minWidth: "10rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: "1.125rem",
  fontWeight: "600",
  "& p": {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	fontSize: "1rem",
	fontWeight: "400",
	color: "$cinzaDark",
  },
})

export const LastModified = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "11.6875rem",
  minWidth: "11.6875rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: "1.125rem",
  fontWeight: "600",
  
  "& p": {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	fontSize: "1rem",
	fontWeight: "400",
	color: "$cinzaDark",
  },
})
export const Editor = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "6.4375rem",
  minWidth: "6.4375rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: "1.125rem",
  fontWeight: "600",
  "& img": {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "0.375rem",
    objectFit: "cover",
  },

   ".tooltip": {
  
    position: "absolute",
    backgroundColor: "#333",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "3px",
    fontSize: ".75rem",
    opacity: "0.8",
    pointerEvents: "none",
    marginTop: "2.3rem",
    animation: `${fadeIn} .2s ease-in-out`,
    height: "2rem",
  },
  

})

export const Filtros = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "11.8125rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: "1.125rem",
  fontWeight: "600",


  "& span": {
    fontSize: "1rem",
    fontWeight: "400",
    color: "$cinzaDark",
    alignItems:"center",
    display: "flex",
    gap: ".2rem",

    "&  svg": {
      width: "1.5rem",
      height: "1.5rem",
      color: "$purpleFwo",
    },
  },


  "& div": {
    "& button": {
      all: "unset",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",


    "&  svg": {
      width: "1.5rem",
      height: "1.5rem",
    },
  }
  },
 
  
})
export const LifeTime = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "13.13rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: "1.125rem",
  fontWeight: "600",
})

export const Projects = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "4.37rem",
  padding: "1rem 1.875rem",
  paddingRight: "0",
  border: "1px solid #D9D9D9",
  borderRight: "none",
  borderLeft: "none",

  animation: `${fadeIn} .6s ease-in-out`,
})

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
})

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
})

export const Tbody = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  // maxWidth: "75.75rem",
  height: "100%",
  backgroundColor: "#FFF",
  overflowY: "scroll",
  paddingTop: "0",
  paddingBottom: "0.625rem",
})
