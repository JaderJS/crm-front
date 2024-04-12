import { styled } from "@/styles"

export const InputContainer = styled("div", {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-center",
    width: "100%",
    height: "auto",
    
    backgroundColor: "transparent",
    fontSize: ".75rem",
    transition: "all 0.1s ease-in-out",
    justifyContent: "space-between", // alinhar os itens do container no começo e no final
    gap: ".37rem",
    fontFamily: "$DM_Sans",

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

})
