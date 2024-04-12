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
  height: "100vh",
  width: "100vw",
  backgroundColor: "$background",
  fontFamily: "$DM_Sans",
  // overflow: "hidden",
  // overflowX: "auto",
  padding: "0rem 2rem",
})

export const ColumnContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  gap: "1rem",
  "& > div:last-child": {
    width: "40%",
    // maxWidth: "23rem",
    minWidth: "fit-content",
  },
  "& > div:first-child": {
    maxWidth: "30vw",
    minWidth: "2rem",
  },
})

export const ColumnContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: "33rem",
  height: "100%",
  minHeight: "100%",
  overflowY: "scroll",
  // padding: "0rem 1.8rem",
  gap: "2rem",
  scrollBehavior: "smooth",
  marginBottom: "1rem",
  paddingRight: "1.8rem",

})

export const ChooseColumns = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  width: "100%",
  minWidth: "fit-content",
  height: "100%",
  padding: "0rem 1.8rem",
  gap: "2rem",
  scrollBehavior: "smooth",
  borderRadius: "1rem",

})

const SlideRight = keyframes({
  "0%": { transform: "translateX(0%)" },
  "50%": { transform: "translateX(10%)" },
  "100%": { transform: "translateX(0%)" },
})

export const ColumnCard = styled("div", {
  transition: "all 0.3s ease-in-out",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "19.6875rem",
  minWidth: "fit-content",
  height: "4.0625rem",
  borderRadius: "15px",
  padding: "1.25rem 0rem",
  fontSize: "1rem",
  fontWeight: 700,
  cursor: "pointer",
  variants: {
    position: {
      before: {
        backgroundColor: "#D9D9D9",
        color: "#A1A1A5",
        padding: "1.25rem 1rem",
        "&:hover": {
          transform: "translateX(-5%)",
        },
      },
      actual: {
        backgroundColor: "$purpleFwo",
        color: "$white",
        padding: "1.25rem 1rem",

		animation: `${SlideRight} .5s ease-in-out `,
		animationDelay: ".2s",
      },
      last: {
        backgroundColor: "#444444",
        color: "#A1A1A5",
        padding: "1.25rem 1rem",

      },
      default: {
        backgroundColor: "#D9D9D9",
        padding: "1.25rem 1rem",

        color: "#A1A1A5",
        "&:hover": {
          transform: "translateX(3%)",
        },
      },
    },
  },
})
