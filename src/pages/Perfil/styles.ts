import { styled, keyframes } from "@/styles"

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
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
  animation: `${fadeIn} .5s ease-in-out`,
  padding: "2rem 2rem",
  gap: "2rem",
  overflow: "auto",
})

export const UserInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  width: "51.375rem",
  minWidth: "51.375rem",
  height: "13.1875rem",
  minHeight: "13.1875rem",
  border: "1px solid rgba(68, 68, 68, .3)",
  borderRadius: "30px",
  padding: "1.57rem",

  img: {
    width: "9.375rem",
    minWidth: "9.375rem",
    height: "100%",
    borderRadius: "15px",
    objectFit: "cover",
    objectPosition: "center",
  },
})

export const VerticalLine = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "0.125rem",
  minWidth: "0.125rem",
  height: "5.6875rem",
  border: "1px solid rgba(68, 68, 68,.5)",
  borderRadius: "30px",
})

export const UserInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  minWidth: "19.5rem",
  height: "100%",
  paddingRight: "1.57rem",

  "& > div": {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& > button": {
    width: "11.3125rem",
    height: "2rem",
    borderRadius: "10px",
  },
})

export const SecondInfos = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "15.0625rem",
  height: "50%",
})

export const TableContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "60.75rem",
  minWidth: "60.25rem",
  maxHeight: "50.5625rem",
  height: "100%",
  minHeight: "18.5rem",
})

// export const TableHeader = styled("div", {
//     position:"relative",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     width: "100%",
//     maxWidth:"60.75rem",
//     height:"4.875rem",
//     backgroundColor: "$purpleFwo",

//     borderRadius:"1.875rem 1.875rem 0rem 0rem",
//     padding:"1rem 1.875rem",

//     "& svg": {
//         width: "1.5rem",
//         height: "1.5rem",
//         color:"$white",
//         marginRight: ".4rem",
//     },
// });

export const ProjectsContainer = styled("div", {
  maxWidth: "75.75rem",
  width: "100%",
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    width: "0px",
    background: "transparent",
  },
  position: "relative",
  display: "flex",
  flexDirection: "column",
})
export const TableHeader = styled(Thead, {
  backgroundColor: "$purpleFwo",
  color: "#FFF",
  height: "4.875rem",
  maxWidth: "75.75rem",

  width: "100%",
  borderRadius: "1.875rem 1.875rem 0rem 0rem",
  overflow: "hidden",
  zIndex: 1,

  "&  th": {
    padding: "1rem 1rem",

    "& div": {
      display: "flex",
      alignItems: "center",
      gap: ".4rem",
      fontSize: "1.25rem",
      fontWeight: "700",
      textTransform: "capitalize",
    },
  },

  "& th:not(:first-child)": {
    textAlign: "center",

    "& div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: ".4rem",
      fontSize: "1.25rem",
      fontWeight: "700",
      textTransform: "capitalize",
    },
  },
})

export const Tbody2 = styled(Tbody, {
  width: "100%",

  "& tr:nth-child(odd)": {
    backgroundColor: "#F8F8F8",
  },

  "& tr": {
    height: "4.37rem",
    border: "1px solid #D9D9D9",
    borderRight: "none",
    borderLeft: "none",

    "&:hover": {
      backgroundColor: "#F3F3F3",
    },

    "& td": {
      textAlign: "left",
      padding: "1rem",
      fontSize: ".75rem",
      fontWeight: "700",

      "& div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: ".4rem",
        maxWidth: "fit-content",

        "& svg": {
          width: "1rem",
          height: "1rem",
          color: "$purpleFwo",
        },
      },
    },
    "& td:not(:first-child)": {
      textAlign: "center",
      fontSize: ".75rem",
      fontWeight: "400",
    },
  },
})

export const CompanyName = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "20.13rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$white",
  fontSize: "1.125rem",
  fontWeight: "600",
  paddingRight: "1.875rem",
})

export const LifeTime = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "13.13rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$white",
  fontSize: "1.125rem",
  fontWeight: "600",
})

export const Step = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "13.13rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$white",
  fontSize: "1.125rem",
  fontWeight: "600",
})

export const Flag1 = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "12.13rem",
  height: "100%",
  color: "$white",
  fontSize: "1.125rem",
  fontWeight: "600",
})

export const Projects = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "60.75rem",
  height: "4.37rem",
  padding: "1rem 1.875rem",
  backgroundColor: "#F8F8F8",
})

export const BodyCompanyName = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  maxWidth: "20.13rem",
  minWidth: "18.13rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: "0.75rem",
  fontWeight: "700",
  paddingRight: "1.875rem",
  backgroundColor: "#F8F8F8",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  a: {
    all: "unset",
    position: "relative",
    textDecoration: "none",
    color: "$blackText",
    fontSize: "0.75rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",

    "&::before": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: 0,
      height: "2px",
      backgroundColor: "$purpleFwo",
      transition: "width 0.2s ease-in-out, left 0.2s ease-in-out",
    },

    "&:hover": {
      color: "$blackText",

      "&::before": {
        width: "105%",
        left: 0,
      },
    },

    "&.active": {
      color: "$white",

      "&::before": {
        width: "105%",
        left: 0,
      },

      "&:hover": {
        color: "$white",
      },
    },
  },
})

export const BodyLifeTime = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "13.13rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: ".75rem",
  fontWeight: "400",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
})

export const BodyStep = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "13.13rem",
  height: "100%",
  borderRight: "1px solid #fff",
  color: "$blackText",
  fontSize: ".75rem",
  fontWeight: "400",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
})

export const BodyFlag = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "12.13rem",
  height: "100%",
  color: "$blackText",
  fontSize: ".75rem",
  fontWeight: "400",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
})

// export const Tbody = styled("div", {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     width: "100%",
//     maxWidth:"75.75rem",
//     height:"100%",
//     backgroundColor:"#FFF",
//     gap:".4rem",
//     overflowY:"auto",
//     paddingTop: "0.625rem",
//     paddingBottom: "0.625rem",
// });

export const ButtonFilter = styled("button", {
  all: "unset",
  position: "absolute",
  top: "1.57rem",

  right: "1rem",
  width: "1.875rem",
  height: "1.875rem",
  borderRadius: "50%",
  backgroundColor: "$purpleFwo",
  cursor: "pointer",

  "& svg": {
    width: "1rem",
    height: "1rem",
    color: "$white",
  },
})

export const GoToProject = styled("button", {
  all: "unset",

  width: "6.875rem",
  height: ".875rem",
  color: "$blackText",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "40%",
  right: "1.5rem",
  "& svg": {
    width: "1rem",
    height: "1rem",
    color: "$purpleFwo",
  },
  gap: ".4rem",
})

export const CardsInProfile = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "space-between",
  width: "21.875rem",
  height: "13.1875rem",
  backgroundColor: "$cinzaClaro01",
  borderRadius: "30px",
  padding: "1.875rem",

  "svg": {
    width: "2rem",
    height: "2rem",
    color: "$purpleFwo",
  },
  
  "& > h2": {
    fontSize: "1rem",
    fontWeight: "700",
    color: "$blackText",
  },
  "& > span": {
    fontSize: "0.75rem",
    fontWeight: "400",
    color: "$cinzaDark2",
  },
})

export const IconDiv = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "2rem",
  gap: "1rem",
  color: "$purpleFwo",
})

export const MindforgeContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "21.875rem",
  height: "100%",
  maxHeight: "36.5625rem",
  gap: "20px",
  backgroundColor: "$blackBackground",
  borderRadius: "30px",
  padding: "1.875rem",

  "img": {
    width: "100%",
    height: "auto",
    color: "$purpleFwo",
  },

  "a": {
    all: "unset",
    width: "100%",
    height: "2.375rem",
    border : "1px solid $white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    color: "$white",
    fontSize: "1rem",
    fontWeight: "400",
    cursor: "pointer",
    transition: "all .2s ease-in-out",

    "&:hover": {
      border: "1px solid $greenV4",
    },
  },
})

