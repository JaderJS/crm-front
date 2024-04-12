import { keyframes, styled } from "@/styles"

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const scaleAnimation = keyframes({
  from: { transform: "scale(0)" },
  to: { transform: "scale(1)" },

})
const scaleDownAnimation = keyframes({
  from: { transform: "scale(1)" },
  to: { transform: "scale(0)" },
})

export const SuccessAndErrorSvgContainer = styled("div", {
  position: "absolute",
  right: "1rem",
  top: "-.5rem",
  width: "1rem",
  height: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",


  svg: {
    width: "1rem",
    minWidth: "1rem",
    height: "1rem",
    minHeight: "1rem",
    transition: "all 0.3s ease-in-out",
    // animation: `${scaleAnimation} .4s ease-in-out, ${scaleDownAnimation} .5s ease-in-out 2.5s`,
    
  },
})

export const Container = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-center",
  width: "100%",
  height: "auto",
  // border: "1px solid #E5E5E5",
  //   borderBottom: "1px solid #E5E5E5",
  fontSize: ".75rem",
  transition: "all 0.3s ease-in-out",
  justifyContent: "space-between", // alinhar os itens do container no começo e no final
  gap: ".37rem",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} 0.3s ease-in-out`,
  "& > label": {
    fontSize: "0.85rem",
    color: "$cinzaDark",
    transition: "all 0.3s ease-in-out",
    marginLeft: ".23rem",
    width: "100%",
    height: "auto",
    wordBreak: "break-word",
  },
  "& > span": {
    fontSize: "0.725rem",
    color: "$cinzaDark2",
    transition: "all 0.3s ease-in-out",
    marginLeft: ".23rem",
    width: "100%",
    height: "auto",
    wordBreak: "break-word",
  },
})

export const InputContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  minHeight: "4rem",
  height: "4rem",
  // border: "1px solid #E5E5E5",
  //   borderBottom: "1px solid #E5E5E5",
  backgroundColor: "transparent",
  fontSize: "1rem",
  transition: "all 0.3s ease-in-out",
  justifyContent: "space-between", // alinhar os itens do container no começo e no final
  gap: ".37rem",

  "input[type='text']": {
    borderRadius: "0.9375rem",
    width: "100%",
    height: "2.8125rem",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    color: "$blackText",
    padding: "0 1rem",
    backgroundColor: "$white",
    transition: "all 0.3s ease-in-out",
    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
      "-webkit-text-fill-color": "#000", // ou a cor que você preferir

      transition: "background-color 50000s ease-in-out 0s",
    },
    "&::placeholder": {
      color: "#A1A1A5",
    },
  },

  "& > label": {
    fontSize: "1rem",
    color: "$blackText",
    transition: "all 0.3s ease-in-out",
    marginLeft: ".2rem",
  },

  //   defaultVariants: {
  //     focusColor: "red",
  //     hover: "red",
  //   },
})

export const LabelFromRadio = styled("label", {
  fontFamily: "DM Sans",
  fontSize: "0.75rem",
  color: " #444",
  marginLeft: ".37rem",
  width: "100%",

  "&:hover": {
    cursor: "pointer",
  },
})

export const RadioContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  border: "1px solid transparent",
  transition: "all 0.1s ease-in-out",
  padding: ".3rem",
  borderRadius: "15px",



  "&:hover": {
    cursor: "pointer",
    border: "1px solid $colors$purpleFwo",
  },

  variants: {
    disabled: {
      true: {
        "&:hover": {
          cursor: "not-allowed",
          border: "1px solid transparent",
        },
      },
    },
  },

})

