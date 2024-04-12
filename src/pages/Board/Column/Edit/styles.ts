import { styled, keyframes } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  height: "100vh",
  width: "100vw",
  backgroundColor: "$background",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} .6s ease-in-out`,
  padding: "0rem 2rem",
  gap: "1rem",
})

export const FieldsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "80.93vh",
  width: "100%",
  maxWidth: "19.75vw",
  minWidth: "18.75rem",
  gap: "1.25rem",
  padding: "1.69rem 1.8rem",
  backgroundColor: "#EEE",
  borderRadius: "1.875rem",
  "& h3": {
    fontSize: "1rem",
    fontWeight: 700,
    color: "$blackText",
    textAlign: "left",
    width: "100%",
  },
})

export const ColumnContainer = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "34.04vw",
  minWidth: "34vw",
  //   width: "100%",
  //   minHeight: "35.6875rem",
  height: "80.93vh",
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
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  padding: "1rem",
  gap: "1.5rem",
  scrollBehavior: "smooth",
})

export const ItemContainer = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: "fit-content",
  backgroundColor: "rgba(238, 230, 238, 0.4)",
  padding: "1rem",
  borderRadius: "1.25rem",
  boxShadow: "4px 6px 10px rgba(0, 0, 0, 0.25)",
  borderTop: "2px dashed rgba(0, 0, 0, .15)",
  borderTopWidth: "4px",
  borderTopRadius: "0px",

  "&:hover": {
    transition: "all .2s ease-in-out",
    borderColor: "$purpleFwo",
  },
})

export const RowColumn = styled("div", {
  display: "flex",
  gap: "1.5rem",
  alignItems: "center",
  width: "100%",
})
export const DestinationContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "80.93vh",
  width: "100%",
  maxWidth: "19.75vw",
  minWidth: "18.75rem",
  gap: "1.25rem",
  padding: "1.69rem 1.8rem",
  backgroundColor: "#EEE",
  borderRadius: "1.875rem",

  "& h3": {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "$blackText",
    textAlign: "left",
    width: "100%",
  },
})

export const ColumnRow = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1.19rem",
  width: "100%",
  height: "4.0625rem",
})
export const ColumnCard = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: "4.0625rem",
  borderRadius: "15px",
  padding: "1.25rem 1.25rem",
  fontSize: "1rem",
  fontWeight: 700,

  variants: {
    position: {
      before: {
        backgroundColor: "$cinzaClaro02",
        color: "#A1A1A5",
      },
      actual: {
        backgroundColor: "$purpleFwo",
        color: "$white",
      },
      last: {
        backgroundColor: "#444444",
        color: "#A1A1A5",
      },
    },
  },
})
