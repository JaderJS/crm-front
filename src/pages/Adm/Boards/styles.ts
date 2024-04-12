import { styled, keyframes } from "@/styles"

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
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
  animation: `${fadeIn} .5s ease-in-out`,
  overflow: "auto",
  padding: "0rem 2rem",
})



export const TableHeader = styled(Thead, {
  backgroundColor: "$purpleFwo",
  color: "#FFF",
  height: "4.875rem",
  width: "100%",
  textAlign: "center",

  "& th": {
    padding: "1rem 1.875rem",
    fontSize: "1.25rem",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  "& tr": {
   "& th:nth-child(2)": {
        textAlign: "left",
        paddingLeft: "0rem",

        },
  },
})

export const Tbody2 = styled(Tbody, {
  width: "100%",
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  "& tr": {
    height: "4.37rem",
    border: "1px solid #D9D9D9",
    borderRight: "none",
    borderLeft: "none",
    "&:hover": {
      backgroundColor: "#F3F3F3",
    },

    "& td:nth-child(2)": {
      textAlign: "left",
    },
  },
  textAlign: "center",
})

// export const Row = styled("div", {
//     position: "relative",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     width: "100%",
//     height: "4.37rem",
//     padding: "1rem 1.875rem",
//     paddingRight: "0",
//     border: "1px solid #D9D9D9",
//     borderRight: "none",
//     borderLeft: "none",

//     animation: `${fadeIn} .6s ease-in-out`,
// })

// export const Item = styled("div", {
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "center",
//   width: "100%",
//   height: "100%",
//   borderRight: "1px solid #fff",
//   color: "#202128",
//   fontSize: "1.25rem",
//   fontWeight: "400",
//   paddingRight: ".5rem",
//   paddingLeft: ".5rem",
//   wordBreak: "break-word",
// })
