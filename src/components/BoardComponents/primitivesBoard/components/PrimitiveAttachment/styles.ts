import { keyframes, styled } from "@/styles"

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const InputContainer = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: ".5rem 0rem",

  width: "100%",
  height: "auto",
  fontSize: ".75rem",
  transition: "all 0.1s ease-in-out",
  justifyContent: "space-between",
  gap: ".37rem",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} 0.3s ease-in-out`,
  "input[type='file']": {
    display: "none", // Esconde o input padrão
  },
  button: {},

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

  "&:focus-within": {
    "& > label": {
      color: "$cinzaDark",
      transform: "translateY(-.05rem)",
    },
    "& > span": {
      color: "$cinzaDark2",
      transform: "translateY(-.05rem)",
    },
    "& > input[type='text']": {
      transition: "all 0.3s ease-in-out",
      border: "1px solid $purpleFwo",
      boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.15)",
    },
  },
})

export const AddArquiveBtn = styled("label", {
  display: "flex",
  alignItems: "center",
  borderRadius: "0.9375rem",
  width: "100%",
  height: "2.8125rem",
  minHeight: "2.8125rem",
  border: "1px solid transparent",
  outline: "none",
  padding: "0 1rem",
  backgroundColor: "$white",
  boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.015)",
  "& span": {
    fontSize: ".75rem",
    color: "$blackText",
  },

  "&::placeholder": {
    color: "#A1A1A5",
  },
  "&:hover": {
    transition: "all 0.3s ease-in-out",
    border: "1px solid $purpleFwo",
    boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.15)",
  },
  "&:disabled": {
    "&:hover": {
      transition: "all 0.3s ease-in-out",
      border: "1px solid transparent",
      boxShadow: "none",
    },
  },
  svg: {
    marginRight: ".5rem",
    width: "1rem",
    height: "1rem",
    color: "$purpleFwo",
  },
})

export const FileInputContainer = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  height: "auto",
  fontSize: ".75rem",
  transition: "all 0.1s ease-in-out",
  justifyContent: "space-between",
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

  "&:focus-within": {
    "& > label": {
      color: "$cinzaDark",
      transform: "translateY(-.05rem)",
    },
    "& > span": {
      color: "$cinzaDark2",
      transform: "translateY(-.05rem)",
    },
  },

  // Estilos para o input do tipo file
  "& input[type='file']": {
    borderRadius: "0.9375rem",
    width: "100%",
    height: "2.8125rem",
    minHeight: "2.8125rem",
    border: "1px solid transparent",
    outline: "none",
    fontSize: ".75rem",
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
  "& > label.fileInputLabel": {
    borderRadius: "0.9375rem",
    width: "100%",
    height: "2.8125rem",
    minHeight: "2.8125rem",
    border: "1px solid transparent",
    outline: "none",
    fontSize: ".75rem",
    color: "$blackText",
    padding: "0 1rem",
    backgroundColor: "$white",
    boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.015)",
    cursor: "pointer",

    "&:hover": {
      transition: "all 0.3s ease-in-out",
      border: "1px solid $purpleFwo",
      boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.15)",
    },
  },
})

export const ContentDownload = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  textAlign: "left",
  // padding: "0.5rem 1rem",
  backgroundColor: "$white",
  borderRadius: "0.9375rem",
  height: "2.8125rem",
  minHeight: "2.8125rem",
  transition: "all 0.3s ease-in-out",
})
