// paddingLeft:"4.5rem"

import { styled, keyframes } from "@/styles"



export const ClientInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  // maxWidth: "29.0625rem",
  width: "100%",
  minWidth: "24.0625rem",
  backgroundColor: "$cinzaClaroPrincipal",
  borderRadius: "30px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  padding: "1.7rem",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: "49.625rem",
  gap: "1rem",
  overflow: "auto",
})

export const ImageAndNameContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  alignItems: "center",

  "& img": {
    width: "4rem",
    height: "4rem",
    objectFit: "cover",
    borderRadius: "15px",
  },

  "& h3": {
    fontSize: "1.25rem",
    color: "$blackText",
  },
})

export const Infos = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: ".5rem",
  "& h4": {
    fontSize: "0.75rem",
    color: "#444",
  },
  "& span": {
    fontSize: "0.75rem",
    color: "#444",
  },
})

export const StakeHoldersContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "1rem",
})

export const StakeHolderContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderTop: "2px solid $purpleFwo",
  paddingTop: "1rem",
  gap: "1rem",
})

export const CenterContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "flex-start",
  height: "100%",
})

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "center",
  width: "13.875rem",
  height: "9.75rem",
  backgroundColor: "#F8F8F8",
  border: "1px solid #EEE",
  borderRadius: "1.875rem",
  padding: "1.33rem",
  paddingTop:"1.88rem",
})

export const SvgAndTittle = styled("div", {
  display: "flex",
  alignContent: "center",
  justifyContent: "flex-start",
  gap: ".87rem",

  h3: {
    fontSize: "1rem",
  },
  svg: {
    width: "2rem",
    height: "2rem",
    minHeight: "2rem",
	color:"$purpleFwo"
  },
})
