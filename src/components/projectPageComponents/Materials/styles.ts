import { styled, keyframes } from "@/styles"

const RotateAnimation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(180deg)" },
})

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "center",
  width: "100%",
  maxWidth: "20rem",
  minWidth: "18rem",
  // maxHeight: "56.5625rem",
  height: "auto",
  // minHeight: "53.5625rem",
  backgroundColor: "$blackBackground",
  border: "1px solid #EEE",
  borderRadius: "1.875rem",
  padding: "1.875rem",
  paddingBottom: "1.825rem",
  color: "$white",
})

export const AjustarLinks = styled("button", {
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  color: "$white",
  fontSize: "0.75rem",
  gap: ".25rem",

  svg: {
    width: "1rem",
    height: "1rem",

    "&:hover": {
      animation: `${RotateAnimation} 1s linear infinite`,
    },
  },
})

export const ItemsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: ".7rem",
  marginTop: ".5rem",
  width: "100%",
})

export const Item = styled("div", {
  borderTop: "1px solid #D9D9D9",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  
  paddingTop: "1.31rem",
  gap: "1.24rem",

  "& button": {
    backgroundColor: "$purpleFwo",
    height: "2.375rem",
    minHeight: "2.375rem",
    width: "100%",
    borderRadius: "10px",
    fontSize: ".75rem",
    // marginLeft: "2.2rem",
  },
})

export const ItemHeader = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: ".5rem",

  svg: {
    width: "2rem",
    height: "2rem",
    color: "$cinzaClaro01",
  },
  "& h3": {
    fontSize: "1rem",
    fontWeight: 700,
    color: "$white",
  },

  "&  p": {
    color: "$cinzaClaroPrincipal",
    fontSize: "0.75rem",
    fontWeight: 400,
  },
})
