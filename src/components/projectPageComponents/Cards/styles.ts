import { styled, keyframes } from "@/styles"

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
  paddingTop: "1.88rem",
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
    minWidth: "2rem",
    height: "2rem",
    minHeight: "2rem",
    color: "$purpleFwo",
  },
})
