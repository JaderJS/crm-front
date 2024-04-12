import { styled, keyframes } from "@/styles"
import "animate.css/animate.min.css"

const moveBackground = keyframes({
  "0%": { backgroundPosition: "0% 0%" },
  "25%": { backgroundPosition: "100% 0%" },
  "50%": { backgroundPosition: "0% 100%" },
  "75%": { backgroundPosition: "100% 100%" },
  "100%": { backgroundPosition: "0% 0%" },
})

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})
export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "$background",
  fontFamily: "$DM_Sans",
  // animation: `${fadeIn} 1s ease-in-out`,
  label: {
    color: "$blackText",
    fontSize: "1rem",
    fontWeight: 300,
  },
  overflow: "auto",
  animation: `${moveBackground} 10s infinite linear`,
  background: "linear-gradient(25deg, #DD2424 0%, #7942B1 100%)",
  backgroundSize: "150% 150%",
  paddingLeft:"1rem",
  paddingRight:"1rem",
})


export const Content = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    maxWidth: "66.25rem",
    background: "#f8f8f8",
    borderRadius: "5.6875rem",
   
    gap: "1.88rem",
    textAlign: "center",
  })

