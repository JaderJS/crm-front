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
  gap: ".5rem",
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
  marginBottom: "1rem",
  paddingRight: "1.8rem",

  },
)

export const ChooseColumns = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  width: "100%",
  minWidth: "fit-content",
  height: "100vh",
  padding: "0rem 1rem",
  gap: "1rem",
  scrollBehavior: "smooth",
  overflowY: "auto",
  paddingBottom: "5rem",
})

const SlideRight = keyframes({
  "0%": { transform: "translateX(0%)" },
  "50%": { transform: "translateX(10%)" },
  "100%": { transform: "translateX(0%)" },
})

export const ColumnCard = styled("button", {
  transition: "all 0.3s ease-in-out",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "19.6875rem",
  minWidth: "fit-content",
  height: "3.0625rem",
  borderRadius: "15px",
  padding: "1.25rem 0rem",
  fontSize: ".75rem",
  fontWeight: 700,
  cursor: "pointer",
  animation: `${fadeIn} .5s ease-in-out`,
  border: "none",
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

  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
      
  },
})

//tags

export const ContainerPopUp = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "$DM_Sans",
  justifyContent: "space-between",
  gap: "1.25rem",
  width: "100%",
  height: "100%",
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
  paddingBottom: "1rem",
  overflowY: "auto",
  paddingRight: "1rem",
  paddingTop: "1rem",
  paddingLeft: "1rem",
  backgroundColor: "$cinzaClaroPrincipal",
  borderRadius: "30px",

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
      width: "2rem",
      minWidth: "2rem",
      minHeight: "2rem",
      height: "2rem",
      borderRadius: "8px",
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



export const UserMessageContainer = styled("div", {
  display: "flex",
  flexDirection:"column",
  justifyContent:"flex-start",
  alignContent:"flex-start",
  width: "100%",
  height: "auto",
  gap: "0.5rem",
  padding: "0.5rem",

  p: {
      width: "100%",
      fontSize: ".75rem",
      fontWeight: 400,
      color: "$cinzaDark",
      backgroundColor: "#FFF",
  },
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
      border: "1px solid #D9D9D9",
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
