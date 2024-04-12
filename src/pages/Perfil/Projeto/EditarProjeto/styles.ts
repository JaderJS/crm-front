// paddingLeft:"4.5rem"

import { styled, keyframes } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "$background",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} .6s ease-in-out`,
  padding: "2rem 2rem",
  gap: "2rem",
  overflow: "auto",
})

export const ClientInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "66%",
  backgroundColor: "$cinzaClaroPrincipal",
  borderRadius: "30px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  padding: "1.7rem",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: "100%",
  gap: "1rem",
  overflow: "auto",
  fontFamily: "$DM_Sans",
})

export const ImageAndNameContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  alignItems: "center",

  "& img": {
    width: "4rem",
    height: "4rem",
    objectFit: "cover",
    borderRadius: "15px",
  },

  "& h3": {
    fontSize: "1.25rem",
    color: "$blackText",
  },
})

export const Infos = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: ".5rem",
  "& h4": {
    fontSize: "0.75rem",
    color: "#444",
  },
  "& span": {
    fontSize: "0.75rem",
    color: "#444",
  },

  "& input": {
    all: "unset",
    backgroundColor: "$cinzaClaro01",
    padding: ".5rem",
    borderRadius: "5px",
  },
})

export const InfosStakeholder = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: ".5rem",
  width: "100%",
  "& h4": {
    fontSize: "0.75rem",
    color: "#444",
  },
  "& span": {
    fontSize: "0.75rem",
    color: "#444",
  },

  "& input": {
    all: "unset",
    backgroundColor: "$cinzaClaro01",
    width: "100%",
    padding: ".5rem",
    borderRadius: "5px",
  },
})

export const StakeHoldersContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "1rem",
})

export const StakeHolderContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderTop: "2px solid $purpleFwo",
  paddingTop: "1rem",
  gap: "1rem",
})

export const CenterContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "flex-start",
  height: "100%",
})

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "center",
  width: "13.875rem",
  height: "9.75rem",
  backgroundColor: "#F8F8F8",
  border: "1px solid #EEE",
  borderRadius: "1.875rem",
  padding: "1.33rem",
  paddingTop: "1.88rem",
})

export const SvgAndTittle = styled("div", {
  display: "flex",
  alignContent: "center",
  justifyContent: "flex-start",
  gap: ".87rem",

  h3: {
    fontSize: "1rem",
  },
  svg: {
    width: "2rem",
    height: "2rem",
    minHeight: "2rem",
    color: "$purpleFwo",
  },
})


export const HeaderContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "1.25rem",
  marginBottom: "1.5rem",

  "& h3": {
    fontFamily: "$DM_Sans",
    fontSize: "1rem",
    fontWeight: 700,
    color: "$blackText",
  },
  "& button": {
    cursor: "pointer",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    svg: {
      width: "1rem",
      height: "1rem",
      color: "$redFwo",
    },
  },
})

export const ButtonTrigger = styled("button", {
  cursor: "pointer",
  border: "1px solid transparent",
  outline: "none",
  backgroundColor: "$cinzaClaroPrincipal",
  width: "77%",
  height: "2.8125rem",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "0 1.25rem",
  gap: ".25rem",
  fontFamily: "$DM_Sans",
  fontSize: ".875rem",
  fontWeight: 400,
  color: "$cinzaDark2",
  transition: "all .3s ease-in-out",

  svg: {
    width: "1rem",
    height: "1rem",
    color: "$purpleFwo",
  },

  "&:hover": {
    borderColor: "$purpleFwo",
  },
})


export const ButtonTriggerAbsolute = styled("button", {
  zIndex: 1,
  position: "absolute",
  cursor: "pointer",
  border: "1px solid transparent",
  outline: "none",
  backgroundColor: "transparent",
  top: ".5rem",
  right: "3rem",
  width: "1rem",
  height: "1rem",

  svg: {
    width: "1rem",
    height: "1rem",
    color: "$purpleFwo",
  },

  "&:hover": {

    "& svg": {
      transition: "all .3s ease-in-out",
      scale: 1.05,
    },

  },
})




export const EndButtonsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  gap: "1.25rem",
})

export const Content = styled("form", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.25rem",
  width: "100%",
  height: "100%",
})
