import { styled } from "@/styles"

export const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "4.0625rem",
  minHeight: "4.0625rem",
  fontFamily: "$DM_Sans",
  position: "relative",

})

export const Links = styled("div", {

  display: "flex",
  flexDirection: "row",
  width: "fit-content",
  position: "relative",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  gap: ".2rem",
  a: {
    fontFamily: "$DM_Sans",
    fontSize: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    all: "unset",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    textDecoration: "none",
    color: "$blackText",
    fontWeight: 500,
    alignItems: "center",
    width: "fit-content",
    height: "100%",
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
        width: "98%",
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
  span: {
    fontFamily: "$DM_Sans",

    top: "50%",
    transform: "translateY(-50%)",
    all: "unset",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    textDecoration: "none",
    color: "$blackText",
    fontWeight: 500,
    fontSize: "1rem",
    alignItems: "center",
    width: "fit-content",
    height: "100%",
  },
})
