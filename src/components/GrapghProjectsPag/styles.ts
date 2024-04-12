import { styled, keyframes } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
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
        // minHeight: "calc(100$ + 4rem)",
    width: "93vw",
    height: "99vh",
    backgroundColor: "#D9D9D9",
    fontFamily: "$DM_Sans",
    animation: `${fadeIn} .3s ease-in-out`,
    // padding: "1.8rem 1.8rem",
    paddingBottom: "3rem",
    gap: "1.5rem",
    zIndex: 10,
    borderRadius:"1.875rem",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",    
    

  })