import { styled } from "@/styles"

export const ButtonContainer = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "5rem",
  height: "2rem",
  borderRadius: "0.5rem",
  gap: "0.5rem",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  backgroundColor: "transparent",

  "&:hover": {
    filter: "brightness(1.2)",
  },

  "& p": {
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "$cinzaDark",
  },
})

export const SvgContainer = styled("div", {
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
  backgroundColor: "#DC2424",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",

  "& > svg": {
    width: "1rem",
    height: "1rem",
    color: "#fff",
    backgroundColor: "transparent",
  },
})
