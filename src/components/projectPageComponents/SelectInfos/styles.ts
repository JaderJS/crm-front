import { styled } from "@/styles"

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "center",
  width: "100%",
  maxWidth: "9rem",
  minWidth:"8rem",
  height: "100%",
  backgroundColor: "$blackBackground",
  border: "1px solid #EEE",
  borderRadius: "1.875rem",
  padding: "1.88rem .7rem",
  color: "$white",
  gap: "1.5rem",
})

export const Margem = styled("div", {
  width: "100%",
  height: "3.125rem",
  padding: ".75rem 1rem",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  background: "$gradientFwo",
  borderRadius: "0.9375rem",
  textAlign: "center",

  "& p": {
    fontSize: "0.75rem",
  },
  "& strong": {
    fontSize: "0.875rem",
  },

  "&:hover": {
    cursor: "pointer",
  },
})

export const LT = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  textAlign: "center",
  borderTop: "1px solid #D9D9D9",
  gap: ".5rem",
  paddingTop:"1rem",
  "& p": {
    fontSize: "0.75rem",
  },
  "& strong": {
    fontSize: "0.875rem",
  },
  "& div": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: ".17rem",
  },
  
})
export const Steps = styled("div", {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    borderTop: "1px solid #D9D9D9",
    gap: ".5rem",
    paddingTop:"1rem",


    "& p": {
      fontSize: "0.75rem",
    },
    "& strong": {
      fontSize: "0.875rem",
    },
    "& div": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: ".17rem",
    },
    "&:hover": {
      cursor: "pointer",
    },
  })
  
  export const Flags = styled("div", {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    borderTop: "1px solid #D9D9D9",
    gap: ".5rem",
    paddingTop:"1rem",


    "& p": {
      fontSize: "0.75rem",
    },
    "& strong": {
      fontSize: "0.875rem",
    },
    "& div": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: ".17rem",
    },
    "&:hover": {
      cursor: "pointer",
    },
  })
  