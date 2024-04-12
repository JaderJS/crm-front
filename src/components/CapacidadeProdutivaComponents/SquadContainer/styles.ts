import { styled } from "@/styles"

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "21.75rem",
  maxWidth: "21.75rem",
  minWidth: "19.75rem",
  height: "80vh",
  minHeight: "4.0625rem",
  fontFamily: "$DM_Sans",
  position: "relative",
  padding: "0.725rem",
  backgroundColor: "$cinzaClaro01",
  borderRadius: "30px",
  transition: "all 0.3s ease-in-out",

  "& span": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: "2rem",
    padding: "0.625rem",
    "& h1": {
      fontSize: "1rem",
      color: "$cinzaDark",
      fontWeight: "500",
      textAlign: "left",
    },
  },

})

export const UserInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "3rem",
  gap: ".5rem",
  backgroundColor: "$cinzaClaro01",
  borderRadius: "15px",
  
 
  "& h1": {
    fontSize: "0.75rem",
    color: "$blackText",
  },
  "& h2": {
    fontSize: "0.625rem",
    color: "$blackText",
    fontWeight: "400",
  },

})