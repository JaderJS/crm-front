
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
  padding: "0rem 0rem",
  paddingBottom: ".0rem",
  outline: 0,
  boxSizing: "border-box",
  backgroundColor: "transparent !important",
  overflow: "hidden",
})

export const Container = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: "100%",
  width: "100%",
  fontFamily: "$DM_Sans",
  animation: `${fadeIn} .5s ease-in-out`,
  gap: "1rem",
  overflow: "auto",

})

export const ClientInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "29.0625rem",
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
  width: "55%",
  gap: "1.7rem",
  minWidth: "40rem",

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
