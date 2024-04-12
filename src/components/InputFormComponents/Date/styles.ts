import { styled } from "@/styles"

export const Container = styled("div", {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    height: "auto",
    backgroundColor: "transparent",
    fontSize: ".75rem",
    transition: "all 0.1s ease-in-out",
    justifyContent: "space-between", // alinhar os itens do container no começo e no final
    gap: ".37rem",
    fontFamily: "$DM_Sans",
    "input[type='text']": {
        borderRadius: "0.9375rem",
        width: "100%",
        height: "2.8125rem",
        minHeight: "2.8125rem",
        border: "1px solid transparent",
        outline: "none",
        fontSize: ".75rem",
        color: "$blackText",
        padding: "0 1rem",
        backgroundColor: "$white",
        boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.015)",

        // transition: "all 0.3s ease-in-out",
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
            "-webkit-text-fill-color": "#000", // ou a cor que você preferir

            transition: "background-color 50000s ease-in-out 0s",
        },
        "&::placeholder": {
            color: "#A1A1A5",
        },
    },

    "& > label": {
        fontSize: "0.85rem",
        color: "$cinzaDark",
        transition: "all 0.3s ease-in-out",
        marginLeft: ".23rem",
        width: "100%",
        height: "auto",
        wordBreak: "break-word",
    },
    "& > span": {
        fontSize: "0.725rem",
        color: "$cinzaDark2",
        transition: "all 0.3s ease-in-out",
        marginLeft: ".23rem",
        width: "100%",
        height: "auto",
        wordBreak: "break-word",
    },

    "&:focus-within": {
        "& > label": {
            color: "$cinzaDark",
            transform: "translateY(-.05rem)",
        },
        "& > span": {
            color: "$cinzaDark2",
            transform: "translateY(-.05rem)",
        },
        "& > input[type='text']": {
            transition: "all 0.3s ease-in-out",
            border: "1px solid $purpleFwo",
            boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.15)",
        },
    },
    "&:hover": {
        "& > label": {
            color: "$cinzaDark",
        },
        "& > span": {
            color: "$cinzaDark2",
        },
        "& > input[type='text']": {
            border: "1px solid $purpleFwo",
        },
    },
})

export const InputContainer = styled("div", {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    width: "100%",
    height: "2.8125rem",
    border: "1px solid transparent",
    backgroundColor: "#fff",
    fontSize: ".75rem",
    transition: "all 0.3s ease-in-out",
    justifyContent: "space-between",
    gap: ".37rem",
    borderRadius: "0.9375rem",
    padding: "0 1rem",
    svg: {
        width: "1rem",
        height: "1rem",
        color: "$purpleFwo",
    },

    "input[type='text']": {
        width: "100%",
        padding: "0",
        height: "2.8125rem",
        border: "1px solid transparent",
        outline: "none",
        fontSize: ".75rem",
        color: "$cinzaDark",
        fontWeight: "400",
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
            "-webkit-text-fill-color": "#000",

            transition: "background-color 50000s ease-in-out 0s",
        },
        "&::placeholder": {
            color: "#A1A1A5",
        },
        "&:disabled": {
            "&:hover": {
                transition: "all 0.3s ease-in-out",
                border: "1px solid transparent",
                boxShadow: "none",
            },
        },
    },

    "&:focus-within": {
        transition: "all 0.3s ease-in-out",
        border: "1px solid $purpleFwo",
        boxShadow: "0px 11px 5px -7px rgba(120,65,176,0.15)",
    },
    "&:hover": {
        border: "1px solid $purpleFwo",
    },
    "&:disabled": {
        "&:hover": {
            transition: "all 0.3s ease-in-out",
            border: "1px solid red",
            boxShadow: "none",
        },
    },
})
