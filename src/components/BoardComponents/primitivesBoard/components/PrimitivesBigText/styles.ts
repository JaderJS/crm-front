
import { keyframes, styled } from "@/styles";


const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
  
});

export const InputContainer = styled("div", {
  position:"relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  // minHeight: "6.4375rem",
  height: "auto",
  
  // border: "1px solid #E5E5E5",
  //   borderBottom: "1px solid #E5E5E5",
  backgroundColor: "transparent",
  fontSize: ".75rem",
  transition: "all 0.1s ease-in-out",
  justifyContent: "space-between", // alinhar os itens do container no começo e no final
  gap: ".37rem",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} 0.3s ease-in-out`,
  textarea: {
    // Target both input and textarea
    // resize: "none",
    resize: "vertical",
    position: "relative",
    borderRadius: "15px",
    width: "100%",
    height: "auto",
    border: "1px solid transparent",
    outline: "none",
    fontSize: ".75rem",
    color: "$blackText",
    padding: ".87rem .87rem",
    backgroundColor: "$white",
    minHeight: "7.1rem",
    transition: "none",
    fontFamily: "$DM_Sans",
    boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.015)",

    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
      "-webkit-text-fill-color": "#000", // ou a cor que você preferir

      transition: "background-color 50000s ease-in-out 0s",
    },
    "&::placeholder": {
      color: "#A1A1A5",
    },
    "&:hover": {
      border: "1px solid $purpleFwo",
      boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.15)",
    },
    "&:disabled": {
      "&:hover": {
        transition: "all 0.3s ease-in-out",
        border: "1px solid transparent",
        boxShadow: "none",
      },
    }
  },

  "& > label": {
    fontSize: "0.85rem",
    color: "$cinzaDark",
    transition: "all 0.3s ease-in-out",
    marginLeft: ".23rem",
    width: "100%",
    height: "auto",
    wordBreak: "break-word",
    fontWeight: 400,
  },
  "& > span": {
    fontSize: "0.725rem",
    color: "$cinzaDark2",
    transition: "all 0.3s ease-in-out",
    marginLeft: ".23rem",
    width: "100%",
    height: "auto",
    fontWeight: 400,
    wordBreak: "break-word",
  },

  "&:focus-within": {
    "& > label": {
      color: "$cinzaDark",
      transform: "translateY(-.05rem)",
    },
    "& > span": {
      color: "$cinzaDark2",
      transform: "translateY(-.05rem)",
    },
    "& > textarea": {
      border: "1px solid $purpleFwo",
    },
  },
 


  //   defaultVariants: {
  //     focusColor: "red",
  //     hover: "red",
  //   },
})
