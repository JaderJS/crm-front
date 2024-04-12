import { styled, keyframes } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const MenuPlusContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  margin: 0,
  padding: "0rem .2rem",
  paddingBottom: "1rem",
  outline: 0,
  boxSizing: "border-box",
  backgroundColor: "transparent !important",
})

export const Container = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  //   justifyContent: "center",
  height: "100%",
  width: "100vw",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} 1s ease-in-out`,
  overflow: "hidden",
  padding: "0rem 2rem",
  paddingRight: "1rem",
})
export const BoardContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  textAlign: "left",
  gap: "1rem",
  width: "100vw",
  height: "fit-content",
  scrollBehavior: "smooth",
  overflowX: "auto",
  // padding: "1rem 0rem",
  paddingRight: "5rem",
  
})

export const ColumnContainer = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "35vw",
  maxWidth: "35vw",
  minWidth: "35vw",
  marginTop: "1.25rem",
  //   width: "100%",
  //   minHeight: "35.6875rem",
  height: "70vh",
  borderRadius: "1.875rem",
  marginRight: "1.25rem",
  backgroundColor: "$cinzaClaro01",
  padding: "1.25rem",
  animation: `${fadeIn} .5s ease-in-out`,
  
})

export const ColumnContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "35vw",

  height: "100%",
  marginBottom: ".75rem",
  overflowX: "hidden",
  overflowY: "auto",
  padding: "1rem",
  gap: "1rem",
  scrollBehavior: "smooth",
  paddingBottom: "3rem",
})

export const ButtonsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "0rem 1.25rem",
  height: "1.5rem",
  "& > button": {
    display: "flex",
    alignItems: "center",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    height: "2.5rem",
    p: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#A1A1A5",
    },

    svg: {
      width: "1rem",
      height: "1rem",
      color: "#7841B0",
    },
    gap: "0.5rem",
  },
})

export const TrashButton = styled("button", {
  position: "absolute",
  top: "0rem",
  left: "1rem",
  display: "flex",
  alignItems: "center",
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  height: "2.5rem",

  "& > svg": {
    width: "1rem",
    height: "1rem",
    color: "$redFwo",
  },
})

export const ButtonAdd = styled("button", {
  alignItems: "center",
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  height: "5rem",

  p: {
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "$cinzaDark2",
  },

  svg: {
    width: "3rem",
    height: "3rem",
    color: "$purpleFwo",
    marginTop: ".5rem",
  },
})

export const GroupsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",

  "& > td": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: "2rem",
    gap: "1rem",
    // border: "1px solid #A1A1A5",
    borderBottom: "1px solid #A1A1A5",
    borderRight: "1px solid #A1A1A5",
    borderLeft: "none",
    textAlign: "left",
    padding: ".5rem 0rem",
  },

  "& > td:nth-child(2)": {
    borderTop: "1px solid transparent",
  },

  "& > th": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: "1rem",
    borderBottom: "2px solid #7841B0",
    padding: ".5rem 0rem",
  },
})

export const ColumnsCenterAlign = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",

  "& > td": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: "2rem",
    gap: "1rem",
    // border: "1px solid #A1A1A5",
    borderBottom: "1px solid #A1A1A5",
    borderRight: "1px solid #A1A1A5",

    textAlign: "left",
    padding: ".5rem 0rem",
  },

  "& > td:nth-child(2)": {
    borderTop: "1px solid transparent",
  },

  "& > th": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: "1rem",
    borderBottom: "2px solid #7841B0",
    padding: ".5rem 0rem",
  },
})

export const TableContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  minWidth: "fit-content",
  height: "fit-content",

  "& > div:last-child": {
    "& > td": {
      borderRight: "none",
    },
  },

  backgroundColor: "$white",
  padding: "1.8rem 1.25rem",
  borderRadius: "15px",
})
