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
  // minHeight: "10rem",
  // height: "auto",
  width: "100%",
  backgroundColor: "$cinzaClaroPrincipal",
  padding: "1rem 1rem",
  transition: "all 0.3s ease-in-out",
  borderRadius: "30px",



  "&:hover": {
   boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
  },
})
  

export const MovedBy = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "auto",
  padding: "0.5rem 0",
  animation: `${fadeIn} 0.5s ease-in-out`,


  "& > span": {
    width: "100%",
    fontSize: ".75rem",
  },
  "& > img": {
    width: "2rem",
    height: "2rem",
    borderRadius: "8px",
  },
})