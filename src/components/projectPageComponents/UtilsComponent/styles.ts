
import { styled } from "@/styles";


export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "center",
  width: "100%",
  minWidth:"20rem",
  height: "27.5625rem",
  backgroundColor: "transparent",
  border: "1px solid #444",
  borderRadius: "1.875rem",
  padding: "0rem 1.5rem",
  paddingTop: "1.3rem",
  color: "$blackText",
  gap: ".5rem",
})

export const HeaderContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "center",
  width: "100%",
  height: "auto",
  gap: "1.37rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid #444",
})

export const ButtonsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  width: "100%",
  height: "auto",
  gap: "1.37rem",

  "& > button": {
    backgroundColor: "transparent",
    border: "1px solid transparent",
    outline: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "$blackText",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "0.5rem",
    borderRadius: "30px",
    position: "relative",
    "&:hover": {
      border: "1px solid #444",
      transition: "all 0.2s ease-in-out",
    },

    "&.selected": {
      color: "$white",
      backgroundColor: "$purpleFwo",
      borderRadius: "30px",
      transition: "all 0.2s ease-in-out",


    },
  }
})

export const CommentsNumber = styled("span", {
  fontSize: "0.65rem",
  position: "absolute",
  top: "-.4rem",
  right: "-0.2rem",
  borderRadius: "50%",
  backgroundColor: "$purpleFwo",
  width: "1.25rem",
  height: "1.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$white",

  variants: {
    comments: {
      true: {
        backgroundColor: "$white",
        color: "$purpleFwo",
        fontWeight: "bold",
        border: "1px solid $purpleFwo",
      },
    },
  },
})

export const EditarEquipeButton = styled("button", {
  backgroundColor: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "7.5rem",
    color: "#444",
    fontSize: "0.75rem",
    fontWeight: 400,
    padding: "0.5rem",
    gap: "0.37rem",
  
    "svg": {
      width: "1rem",
      height: "1rem",
    },

  })