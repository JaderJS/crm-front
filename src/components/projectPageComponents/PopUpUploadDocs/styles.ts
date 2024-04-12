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
    height: "auto ",
    minHeight: "calc(100$ + 4rem)",
    width: "35.5625rem",
    backgroundColor: "$cinzaClaro01",
    fontFamily: "$DM_Sans",
    animation: `${fadeIn} .3s ease-in-out`,
    padding: "2rem 2rem",
    paddingBottom: "3rem",
    gap: "2rem",
    overflow: "auto",
    zIndex: 2,
    borderRadius:"1.875rem",
    color:"$blackText",


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
    justifyContent: "center",
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