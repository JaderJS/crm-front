import { styled } from "@/styles";

export const HeaderContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "1.25rem",
    marginBottom: "1.5rem",

    "& h3": {
        fontFamily: "$DM_Sans",
        fontSize: "1rem",
        fontWeight: 700,
        color: "$blackText",
    },
    "& button": {
        cursor: "pointer",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        svg: {
            width: "1rem",
            height: "1rem",
            color: "$redFwo",
        },
    },
})

export const ButtonTrigger = styled("button", {
    cursor: "pointer",
    border: "1px solid transparent",
    outline: "none",
    backgroundColor: "$cinzaClaroPrincipal",
    width: "77%",
    height: "2.8125rem",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 1.25rem",
    gap: ".25rem",
    fontFamily: "$DM_Sans",
    fontSize: ".875rem",
    fontWeight: 400,
    color: "$cinzaDark2",
    transition: "all .3s ease-in-out",

    svg: {
        width: "1rem",
        height: "1rem",
        color: "$purpleFwo",
    },

    "&:hover": {
        borderColor: "$purpleFwo",
    },
})


export const ButtonTriggerAbsolute = styled("button", {
    zIndex: 1,
    position: "absolute",
    cursor: "pointer",
    border: "1px solid transparent",
    outline: "none",
    backgroundColor: "transparent",
    top: ".5rem",
    right: "3rem",
    width: "1rem",
    height: "1rem",

    svg: {
        width: "1rem",
        height: "1rem",
        color: "$purpleFwo",
    },

    "&:hover": {

        "& svg": {
            transition: "all .3s ease-in-out",
            scale: 1.05,
        },

    },
})




export const EndButtonsContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: "1.25rem",
})

export const Content = styled("form", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.25rem",
    width: "100%",
    height: "100%",
})