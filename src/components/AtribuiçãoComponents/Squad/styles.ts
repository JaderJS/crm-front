import { styled, keyframes } from "@/styles"
const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  // maxWidth: "72.375rem",
  // height: "auto",
  // flexGrow: 1,
  backgroundColor: "$cinzaClaroPrincipal",
  transition: "all 0.3s ease-in-out",
  borderRadius: "30px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  paddingBottom: "2.5rem",
  animation: `${fadeIn} 1.2s ease-in-out`,
})

export const HeaderContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  // height: "10.8125rem",
  // minHeight: "10.8125rem",
  // maxHeight: "10.8125rem",
  borderRadius: "30px 30px 0px 0px",
  paddingTop: "1.9rem",
  paddingBottom: "1.9rem",
  paddingLeft: "2rem",
  paddingRight: "1.75rem",
  gap: "1.5rem",
})

export const Button = styled("button", {
  width: "1.625rem",
  height: "1.625rem",
  borderRadius: "50%",
  backgroundColor: "$purpleFwo",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  "& > svg": {
    width: "1rem",
    height: "1rem",
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

export const SquadInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  position:"relative",
  alignItems: "center",
  width: "100%",

  "& > img": {
    width: "4rem",
    height: "auto",
    borderRadius: "15px",
    objectFit: "cover",
  },
})

export const SquadInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "0.5rem",
  width: "100%",
  paddingLeft: "1.88rem",
  paddingRight: "1.88rem",

  "& > h3": {
    fontSize: "1rem",
  },
})

export const ServicesContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: "1.25rem",
  flexWrap: "wrap",
})

export const Service = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  minWidth: "4.6rem",
  width: "auto ",
  height: "1.25rem",
  paddingRight: "1.1rem",
  paddingTop: "0.25rem",

  borderRight: "3px solid $purpleFwo",

  "& > svg": {
    width: "1rem",
    height: "auto",
    marginRight: "0.2rem",
    color: "$purpleFwo",
  },

  "& > h1": {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "$cinzaDark",
    fontFamily: "$DM_Sans",
  },

  " & > p": {
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "$cinzaDark",
    fontFamily: "$DM_Sans",
    marginLeft: "0.25rem",
  },

  "&:last-child": {
    borderRight: "none",
  },
})

export const SquadName = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  minWidth: "4.6rem",
  width: "auto ",
  height: "1.25rem",
  paddingRight: "1.1rem",
  paddingTop: "0.25rem",

  borderRight: "3px solid $purpleFwo",

  "& > h3": {
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "$DM_Sans",
  },
})

export const SquadNameAndRecommended = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1.25rem",

  "& > p": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: 400,
    fontFamily: "$DM_Sans",

    "& > svg": {
      width: "1rem",
      height: "auto",
      marginLeft: "0.2rem",
      color: "$purpleFwo",
    },
  },
})

export const Margem = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "14.5625rem",
  height: "3.25rem",
  borderRadius: "15px",
  backgroundColor: "$blackBackground",
  color: "$cinzaClaroPrincipal",
})

export const ProgressAndButtonContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: "1.25rem",
})

export const ContentContainer = styled("div", {
  width: "100%",
  overflow: "hidden",
  //   height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1.25rem",
  paddingLeft: "2rem",
  paddingRight: "1.65rem",
})

export const InvesterContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "5.5rem",
  gap: "1.25rem",
  backgroundColor: "#FFFFFF",
  borderRadius: "20px",
  paddingLeft: "1.25rem",
  paddingRight: "1.25rem",
})

export const ImageAndInfo = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: ".69rem",
  width: "100%",
  maxWidth: "18.625rem",
  height: "3rem",
  borderRight: "2px solid $purpleFwo",
  "& > img": {
    width: "3rem",
    minWidth: "3rem",
    height: "3rem",
    borderRadius: "0.9375rem",
    objectFit: "cover",
  },
})

export const NameAndFunction = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "0.2rem",
  width: "100%",
  maxWidth: "14.9rem",
  minWidth: "10.9rem",
  height: "100%",

  "& > h3": {
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "$DM_Sans",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "10rem",
  },
  "& > p": {
    fontSize: "1rem",
    fontWeight: 400,
    fontFamily: "$DM_Sans",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "14rem",
  },
})

export const Capacidade = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.2rem",
  width: "100%",
  minWidth: "20rem",
  // maxWidth: "41.9rem",
  height: "3rem",

  "& > div": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.2rem",
    width: "100%",
    height: "1rem",

    "& > p": {
      wordBreak: "no",
      fontSize: "0.875rem",
      fontWeight: 400,
      fontFamily: "$DM_Sans",
      maxWidth: "14rem",
      minWidth: "8.1875rem",
      width: "14rem",
    },
  },
})

export const AtribuirButton = styled("button", {
  width: "8.9375rem",
  minWidth: "6.9375rem",
  height: "1.5625rem",
  borderRadius: "30px",
  border: "none",
  outline: "none",
  fontFamily: "$DM_Sans",
  fontSize: "0.65rem",
  padding: "0.5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  gap: "0.2rem",
  svg: {
    width: "0.75rem",
    height: "0.75rem",
  },

  variants: {
    isAtribuido: {
      true: {
        transition: "all ease-in .2s",
        background: "$gradientFwo",
        color: "$cinzaClaroPrincipal",
        border: "1px solid $purpleFwo",
        cursor: "pointer",
      },
      false: {
        transition: "all ease-in .2s",

        backgroundColor: "$white",
        color: "$blackText",
        cursor: "pointer",
        border: "1px solid $purpleFwo",
      },
    },
  },
})

export const AtribuidosContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "5.5rem",
  fontFamily: "$DM_Sans",
  borderRadius: "20px",
  backgroundColor: "#D9D9D9",
  padding: "1.31rem",
  animation: `${fadeIn} .4s ease-in-out`,
  

})

export const EquipeContainer = styled("div", {
  marginLeft:"1rem",
  display: "flex",
  flexDirection:"row",
  alignItems: "center",
  justifyContent: "flex-start",
  // maxWidth: "18rem",
  minWidth: "10rem",
  width: "80%",
  overflow: "hidden",
  height: "3rem",
  gap:"1rem",
  borderRight:"2px solid #7841B0",
  paddingRight: "1rem",
  "&  img": {
    width: "2rem",
    height: "2rem",
    borderRadius: ".375rem",
    animation: `${fadeIn} .4s ease-in-out`,
    objectFit:"cover",
  },


  "& svg": {
    width: "1rem",
    height: "1rem",
    color:"$purpleFwo",
    marginLeft: "1rem",
  }
})

export const MmrContainer = styled("div", {
  width: "8.5rem",
  height:"3rem",
  borderRadius: ".9375rem",
  border: "1px solid $purpleFwo",
  marginLeft: "2rem",
  display:"flex",
  flexDirection: "column",
  alignItems:"center",
  justifyContent: "center",
  padding:"0 1rem",
});
