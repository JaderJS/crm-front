import { styled } from "@/styles"

export const Container = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  height: "100%",
  width: "22.5rem",
  backgroundColor: "$cinzaClaro01",
  fontFamily: "$DM_Sans",
  padding: "1.88rem",
  paddingTop: "1.5rem",
  borderRadius: "30px",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  marginBottom: "1.87rem",
})

export const Header = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "4rem",
  minHeight: "4rem",
  marginBottom: "1.87rem",
  gap: "1rem",

  "& > img": {
    minWidth: "4rem",
    width: "4rem",
    height: "auto",
    borderRadius: "15px",
    objectFit: "cover",
  },
})

export const ClientName = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  "& > h3": {
    fontSize: "1rem",
    fontWeight: 700,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "14rem",
  },
  "& > p": {
    fontSize: "0.875rem",
    fontWeight: 400,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "14rem",
  },
})

export const Button = styled("button", {
  position: "absolute",
  bottom: "1rem",
  right: "1.6rem",
  width: "1rem",
  height: "1rem",
  borderRadius: "50%",
  backgroundColor: "$purpleFwo",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  "& > svg": {
    width: "0.6rem",
    height: "0.6rem",
    color: "$white",
  },

  variants: {
    open: {
      true: {
        transform: "rotate(180deg)",
        transition: "all 0.3s ease-in-out",
      },
      false: {
        transform: "rotate(0deg)",
        transition: "all 0.3s ease-in-out",
      },
    },
  },
})

export const Content = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "1.1rem",
})

export const ServiceContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "0.2rem",
  minWidth: "8.75rem",
  width: "8.75rem",
  height: "2.81rem",
  minHeight: "2.81rem",
  backgroundColor: "$white",
  paddingLeft: "1.25rem",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  borderRadius: "15px",

  "& > h3": {
    fontSize: "0.875rem",
    fontWeight: 700,
  },
  "& > p": {
    fontSize: "0.75rem",
    fontWeight: 400,
  },

  "& > svg": {
    width: "1rem",
    height: "1rem",
    color: "$purpleFwo",
  },
  "input[type='number']": {
    width: "32%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontSize: "0.75rem",
    alignContent: "flex-start",
    "&::-webkit-calendar-picker-indicator": {
      filter: "invert(54%) sepia(76%) saturate(475%) hue-rotate(91deg) brightness(101%) contrast(83%)",
      transition: "all 0.3s ease-in-out",

      "&:hover": {
        filter: "invert(54%) sepia(76%) saturate(475%) hue-rotate(91deg) brightness(101%) contrast(83%)",
        cursor: "pointer",
      },
    },
  },
})

export const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  height: "4rem",
  gap: "0.4rem",

  "& > label": {
    fontSize: "0.75rem",
  },
})

export const Value = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "2.81rem",
  gap: "0.5rem",
  border: "1px solid $colors$purpleFwo",
  borderRadius: "15px",
  padding: "0 1.25rem",

  "& > svg": {
    width: "1.25rem",
    height: "1.25rem",
    color: "$purpleFwo",
  },

  "& > p": {
    fontSize: "0.75rem",
    fontWeight: 700,
  },
})

export const Investment = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  height: "4rem",
  gap: "0.4rem",

  "& > label": {
    fontSize: "0.75rem",
  },
  "input[type='number']": {
    width: "30%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontSize: "0.75rem",
    alignContent: "flex-start",
    marginLeft: "-0.3rem",

    "&::-webkit-calendar-picker-indicator": {
      filter: "invert(54%) sepia(76%) saturate(475%) hue-rotate(91deg) brightness(101%) contrast(83%)",
      transition: "all 0.3s ease-in-out",

      "&:hover": {
        filter: "invert(54%) sepia(76%) saturate(475%) hue-rotate(91deg) brightness(101%) contrast(83%)",
        cursor: "pointer",
        transform: "scale(1.2)",
      },
    },
  },
})

export const InvestmentValue = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "2.81rem",
  gap: "0.5rem",
  borderRadius: "15px",
  padding: "0 1.25rem",
  backgroundColor: "$white",
  "& > svg": {
    width: "1.25rem",
    height: "1.25rem",
    color: "$purpleFwo",
  },

  "& > p": {
    fontSize: "0.75rem",
    fontWeight: 700,
  },
})

export const ButtonsContainer = styled("div", {
  position: "absolute",
  bottom: "2rem",

  display: "flex",
  flexDirection: "row",
  height: "2.81rem",
  alignItems: "center",
  justifyContent: "space-between",
  width: "80%",
})
