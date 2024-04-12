import { styled, keyframes } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100vw",
  backgroundColor: "$background",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} .6s ease-in-out`,
  transition: "all 0.2s ease-in-out",
  padding: "3rem 1rem",
  gap: "1rem",
  overflowX: "auto",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: "0.5rem",
    height: "0.5rem",
  },
})

export const OkrsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "2rem",
})

export const AddButton = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "3rem",
  height: "3rem",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  color: "$cinzaDark2",
  gap: "0.5rem",

  "& svg": {
    width: "3rem",
    minWidth: "3rem",
    height: "3rem",
    minHeight: "3rem",
    color: "$purpleFwo",
  },
})

export const Okr = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "space-between",
  width: "27.1875rem",
  minWidth: "27.1875rem",
  height: "100%",
  gap: "1rem",
  padding: "1.5rem 1.5rem",
  paddingTop: "3rem",
  paddingBottom: "2rem",
  borderRadius: "30px",
  backgroundColor: "$cinzaClaroPrincipal",
  animation: `${fadeIn} .6s ease-in-out`,

})

export const OkrDescription = styled("div", {
  width: "100%",
  height: "auto",
  borderBottom: "1px solid #7841B0",
  paddingBottom: "3rem",
  wordBreak: "break-word",
})

export const OkrContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "flex-start",
  width: "100%",
  minHeight: "40rem",
  maxHeight: "40rem",
  height: "100%",
  padding: "0 0.5rem",
  overflowY: "auto",
  gap: "1rem",
  backgroundColor: "$cinzaClaroPrincipal",
  scrollBehavior: "smooth",
  
})

export const UserMessageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  width: "auto",
  height: "auto",
  gap: "0.5rem",
  padding: "0.5rem",
  marginTop: ".75rem",

  "& p": {
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "$blackText",
    width: "100%",
    textAlign: "left",
    border: "1px solid #7841B0",
    padding: "0.5rem",
    borderRadius: "0.9375rem",
    wordBreak: "break-word",
    backgroundColor: "$white",
  },
})

export const UserInfosContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",

  gap: "0.5rem",
  width: "100%",
  height: "1.5rem",
  maxHeight: "1.5rem",
  minHeight: "1.5rem",
  fontSize: "0.75rem",
  "& img": {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "0.5rem",
    objectFit: "cover",
  },

  "& div": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    minHeight: "1.5rem",
    fontSize: "0.75rem",
    color: "#A1A1A5",

    "& h3": {
      fontWeight: 400,
      color: "$blackText",
    },
  },

  "& svg": {
    width: ".75rem",
    height: ".75rem",
    color: "$redFwo",
  },
})

export const InputContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  width: "100%",
  marginTop: "1rem",
  paddingBottom: "1.5rem",

  "& button": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    backgroundColor: "$purpleFwo",
    border: "none",
    outline: "none",

    "& svg": {
      width: "0.75rem",
      height: "0.75rem",
      color: "$white",
    },
  },

  "input[type='text']": {
    borderRadius: "0.9375rem",
    width: "100%",
    height: "2.3125rem",
    minHeight: "2.3125rem",
    outline: "none",
    fontSize: ".75rem",
    color: "$blackText",
    padding: "0 1rem",
    backgroundColor: "$white",
    border: "1px solid #D9D9D9",
    transition: "all 0.3s ease-in-out",
    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
      "-webkit-text-fill-color": "#000", // ou a cor que você preferir

      transition: "background-color 50000s ease-in-out 0s",
    },
    "&::placeholder": {
      color: "#A1A1A5",
    },
  },
})
