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
export const Container = styled("form", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "100%",
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
  // paddingLeft:"1rem",
  // paddingRight:"1rem",
})

export const SliderButtons = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "2rem",
  justifyContent: "center",
  width: "100%",
  height: "3rem",
  marginTop: "2rem",
 
 
})

export const H2Gradient = styled("h2", {
  fontSize: "2.35269rem",
  fontWeight: "500",
  color: "$black",
  fontFamily: "$Panchang",
})

export const H2GradientON = styled("h2", {
  fontSize: "2rem",
  fontWeight: "500",
  color: "$white",
  fontFamily: "$Panchang",
  background: "$gradientFwo",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  letterSpacing:"0.02125rem",
  lineHeight: "3.25rem",
  textAlign: "center",
})

export const Step = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100vw",
  height: "100vh",
  padding: "0 1rem",
})

export const SliderContainer = styled("div", {
  position: "relative",
  width: "100%",

  height: "100%",

  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  overflow: "hidden",
  padding: "0 1rem",
})

export const StepContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  overflow: "hidden",
})

export const ImagePreview = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "8rem",
  height: "8rem",

  "& img": {
    width: "100%",
    height: "100%",
    borderRadius: "30px",
    objectFit: "cover",
    objectPosition: "center",
  },
})

export const ButtonsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "9rem",
  height: "6.125rem",
  gap: "1rem",
  marginLeft: "1rem",
})

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "auto",
  width: "100%",
  maxWidth: "66.25rem",
  background: "#f8f8f8",
  borderRadius: "1.875rem",
  padding: "1.88rem",
  paddingBottom: "3rem",
  gap: "1.88rem",
  marginTop: "2rem",
})

export const EtapaContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "9.5rem",
  width: "100%",
  marginTop: "3rem",
  gap: "2.88rem",
})

export const Etapa = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "8.5rem",
  height: "2.5rem",
  gap: "1.88rem",
  padding: ".75rem",
  border: "1px solid #fff",
  borderRadius: "1.875rem",
  color: "$white",
})

export const TextEtapaContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "3.8rem",
  width: "100%",
  textAlign: "center",

  "& > p": {
    color: "$white",
    fontSize: "1.875rem",
    fontWeight: 300,
    "& > b": {
      color: "$white",
      fontSize: "1.875rem",
      fontWeight: 700,
    },
  },
})

export const Forcas = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "auto",
  //   minWidth: "9.5rem",
  //   maxWidth: "13.5rem",
  gap: "1.88rem",
  height: "2.5rem",
  minHeight: "2.5rem",
  backgroundColor: "$greenV4",
  borderRadius: "30px",
  color: "$white",
  paddingRight: "2.5rem",
  paddingLeft: "1rem",

  "& > h3": {
    color: "$background",
    fontSize: "1rem",
    fontWeight: 300,
  },
  variants: {
    colors: {
      green: {
        backgroundColor: "$greenV4",
      },
      red: {
        backgroundColor: "#DC2424",
      },
    },
  },
})

export const SvgIcon = styled("div", {
  position: "absolute",
  right: "-.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "2.5rem",
  height: "2.5rem",
  backgroundColor: "$greenV4",
  borderRadius: "30px",
  border: "2px solid #fff",

  "& svg": {
    width: "1rem",
    height: "1rem",
    color: "$white",
  },

  variants: {
    colors: {
      green: {
        backgroundColor: "$greenV4",
      },
      red: {
        backgroundColor: "#DC2424",
      },
    },
  },
})

export const HorizontalLine = styled("div", {
  width: "100%",
  height: "0.25rem",
  backgroundColor: "$cinzaClaro02",
  borderRadius: "20px",
})
