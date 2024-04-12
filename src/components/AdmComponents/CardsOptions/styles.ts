import { styled } from "@/styles";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "17.8125rem",
  height: "15.625rem",
  backgroundColor: "$cinzaClaroPrincipal",
  gap: "1rem",
  border: "1px solid $colors$cinzaClaro02",
  borderRadius: "30px",
  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
  color: "$blackText",
  transition: "all 0.3s ease-in-out",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  fontSize: "1.25rem",
  fontFamily: "$DM_Sans",
  textAlign: "center",

  "& svg": {
    width: "4.4375rem",
    height: "4.4375rem",
    color: "$purpleFwo",
  },

  "&:hover": {
    border: "1px solid $colors$purpleFwo",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
  
  },
});
