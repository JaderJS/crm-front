import { keyframes, styled } from "@/styles"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  width: "100%",
  height: "100%",
  color: "$blackText",
  animation: `${fadeIn} .5s ease-in-out`,
  paddingBottom: "1.5rem",
  overflowY: "hidden",
  gap: "1rem",
})

export const ChatContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "left",
  width: "100%",
  height: "100%",
  color: "$blackText",
  gap: ".5rem",
  animation: `${fadeIn} .5s ease-in-out`,
  paddingBottom: ".1rem",
  overflowY: "auto",
  paddingRight: "1rem",

    "& p": {
        fontSize: "0.75rem",
        fontWeight: 400,
        color: "$blackText",
        width: "100%",
        textAlign: "left",
        // border:"1px solid #7841B0",
        padding: "0.5rem",
        borderRadius: "15px",
        wordBreak: "break-word",

    },
})

export const UserMessageContainer = styled("div", {
    display: "flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignContent:"flex-start",
    width: "100%",
    height: "auto",
    gap: "0.5rem",
    padding: "0.5rem",
})

export const UserInfosContainer = styled("div", {
    display: "flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",

    gap: "0.5rem",
    width: "100%",
    height: "1.5rem",
    maxHeight: "1.5rem",
    minHeight: "1.5rem",
    fontSize: "0.75rem",
    "& img":{
        width: "1.5rem",
        height: "1.5rem",
        borderRadius: "50%",
        objectFit: "cover",
    },

    "& div":{
        display: "flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignContent:"flex-start",
        minHeight: "1.5rem",
        fontSize: "0.75rem",
        color: "#A1A1A5",

        "& h3":{
            fontWeight: 400,
            color: "$blackText",
        }
    }
    
})

export const InputContainer = styled("div", {

        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "2.3125rem",
        maxHeight:"2.3125rem",
        gap: "0.6rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.6rem",

        "& input":{
            width: "100%",
            height: "100%",
            // border: "1px solid #D9D9D9",
            borderRadius: "15px",
            outline: "none",
            padding: "0.5rem",
            paddingRight: "1rem",
            paddingLeft: "1rem",
            fontSize: "0.75rem",
            color: "$blackText",
            transition:"all 0.2s ease-in-out",

            "&::placeholder":{
                color: "#A1A1A5",
            },

            "&:focus":{
                border: "1px solid #7841B0",
                transition:"all 0.2s ease-in-out",
            },
            "&:hover":{
                border: "1px solid #7841B0",
                transition:"all 0.2s ease-in-out",
            }
        },
        "& > button":{
            width: "1.5rem",
            minWidth: "1.5rem",
            height: "1.5rem",
            minHeight: "1.5rem",
            maxHeight: "1.5rem",
            borderRadius: "50%",
            backgroundColor: "$purpleFwo",
            border: "none",
            outline: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "$white",

            "svg":{
                width: "1rem",
                height: "1rem",
            },
        }
})


const LightningGreen = keyframes({
    "0%": { opacity: 0 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0 },
  });
  
  const LightningRed = keyframes({
    "0%": { opacity: 0 },
    "40%": { opacity: 1 },
    "100%": { opacity: 0 },
  });
  
  const LightningGray = keyframes({
    "0%": { opacity: 0 },
    "60%": { opacity: 1 },
    "100%": { opacity: 0 },
  });
  

export const FlagsContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.2rem",
    width: "2.5rem",
    height: "auto",
    minHeight: "2rem",
    maxHeight: "2rem",
    // animation: `${fadeIn} .5s ease-in-out`,

    "& button": {
        opacity: .9, // Defina a opacidade padrão para os botões
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        border: "none",
        outline: "none",
        "&:hover": {
            border: "1px solid rgba(0, 0, 0, 0.2)",
            opacity: 1, // Torna o botão atual totalmente visível ao pairar sobre ele
            filter: "brightness(1.2)", // Aumenta o brilho do botão atual ao pairar sobre ele
      
        },

     
    },
});

export const GreenFlag = styled("button", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ".8rem",
    minWidth: ".8rem",
    height: ".8rem",
    minHeight: ".8rem",
    maxHeight: ".8rem",
    borderRadius: "50%",
    backgroundColor: "$greenV4",
    border: "none",
    outline: "none",

    animation: `${LightningGreen} .9s ease-in-out`,
})

export const RedFlag = styled("button", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ".8rem",
    minWidth: ".8rem",
    height: ".8rem",
    minHeight: ".8rem",
    maxHeight: ".8rem",
    borderRadius: "50%",
    backgroundColor: "$redFwo",
    border: "none",
    outline: "none",
    animation: `${LightningRed} 1.4s ease-in-out`,
})

export const GrayFlag = styled("button", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ".8rem",
    minWidth: ".8rem",
    height: ".8rem",
    minHeight: ".8rem",
    maxHeight: ".8rem",
    borderRadius: "50%",
    backgroundColor: "$cinzaDark2",
    border: "none",
    outline: "none",
    animation: `${LightningGray} 1.2s ease-in-out`,
})