import { styled } from "@/styles";

export const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxHeight: "12.6875rem",
    gap: "1rem",
    backgroundColor: "$cinzaClaroPrincipal",
    border : "1px solid $cinzaClaro01",
    borderRadius: "30px",
    padding: "1.25rem",
    });

    export const ArrowButton = styled("button", {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3rem",
        height: "3rem",
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",

        "& svg": {
            width: "3rem",
            height: "3rem",
            color: "$purpleFwo",
        },
    
    });