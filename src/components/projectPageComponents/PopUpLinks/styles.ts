// paddingLeft:"4.5rem"

import { styled, keyframes } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const Backdrop = styled("div", {
    position: "fixed", 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(5px)", 
  })
  
  export const Container = styled("div", {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "34.8125rem",
    width: "46.875rem",
    backgroundColor: "$cinzaClaro01",
    fontFamily: "$DM_Sans",
    animation: `${fadeIn} .3s ease-in-out`,
    padding: "2rem 2rem",
    gap: "2rem",
    overflow: "auto",
    zIndex: 2,
    borderRadius:"1.875rem",
  })

  export const Header = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",

    "& button": {
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",

      svg:{
        width: "1.5rem",
        height: "1.5rem",
        color: "$redFwo",
      }
    },
  })

  export const Form = styled("form", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    gap: "1rem",

    div:{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      width: "100%",
      gap: "1.2rem",
    

    "& button": {
      cursor: "pointer",
      border: "none",
      outline: "none",
      color: "$cinzaClaro01",
      fontFamily: "$DM_Sans",
      fontWeight: 500,
      fontSize: "1rem",
      padding: "1rem 2rem",
      borderRadius: "0.5rem",
      transition: "all .3s ease-in-out",
      height: "2.375rem",
    },
  }
  })