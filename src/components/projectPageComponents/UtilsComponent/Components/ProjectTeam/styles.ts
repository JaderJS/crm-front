import { keyframes, styled } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "center",
  width: "100%",
  height: "18.5625rem",
  color: "$blackText",
  gap: "1rem",
  animation: `${fadeIn} .5s ease-in-out`,
  overflowY: "auto",
  marginTop: "1rem",
  padding: "0 .5rem",
})

export const HeaderContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  width: "100%",
  height: "2rem",
  borderBottom: "1px solid #A1A1A5",

  "& p": {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "$blackText",
  },

})

export const InvestContainer = styled("div", {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
});

export const FunctionContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  width: "6.5rem",
  maxWidth: "6.5rem",
  overflow:"hidden",
  textOverflow:"ellipsis",
  whiteSpace:"nowrap",
  "& p": {
    fontSize: "0.75rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color:"$cinzaDark",
    textTransform:"capitalize",
  },
})

export const NameContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  width: "10rem",
  overflow:"hidden",
  textOverflow:"ellipsis",
  whiteSpace:"nowrap",
    "& p": {
    fontSize: "0.75rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textTransform:"capitalize",

  },

})

export const ThumbnailContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  width: "1.5rem",

  "img": {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
  },
})

export const StepContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center",
  width: "2.375rem",
})
