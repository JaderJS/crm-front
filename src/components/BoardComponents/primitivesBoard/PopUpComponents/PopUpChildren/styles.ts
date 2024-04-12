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
    width: "100vw",
    height: "100vh",
    zIndex: 1,
  })
  
  export const Container = styled("div", {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "auto",
    // minHeight: "calc(100$ + 4rem)",
    width: "35vw",
    minWidth: "25rem",
    backgroundColor: "#D9D9D9",
    fontFamily: "$DM_Sans",
    animation: `${fadeIn} .3s ease-in-out`,
    padding: "1.8rem 1.8rem",
    paddingBottom: "3rem",
    gap: "1.5rem",
    zIndex: 10,
    borderRadius:"1.875rem",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",    
    

  })

  export const CloseButton = styled("button", {

      cursor: "pointer",
      border: "none",
      outline: "none",
      position:"absolute",
      top:"1.25rem",
      right:"1.8rem",
      backgroundColor:"transparent",
      svg:{
        width: "1rem",
        height: "1rem",
        color: "$redFwo",
      }
    
  })

  export const ButtonsContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap:"1.31rem",

    "& button": {
      width:"11.3125rem",
      height:"2.375rem",

    },
    "& button:first-child": {
      backgroundColor: "$cinzaDark2",
    },
    "& button:last-child": {
      backgroundColor: "$purpleFwo",

      svg: {
        width: "1rem",
        height: "1rem",
        color: "$white",
      },
    },

  })