import {keyframes, styled} from "@/styles";
import * as Menubar from "@radix-ui/react-menubar";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

const UpToDown = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(-15rem)",
  },

  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});
export const DownToUp = keyframes({
  "0%": {
    opacity: 1,
    transform: "translateY(0)",
  },
  "100%": {
    opacity: 0,
    transform: "translateY(-15rem)",
  },
});

export const MenubarTrigger = styled(Menubar.Trigger, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "5.3125rem",
  cursor: "pointer",
  gap: "0.5rem",
  border: "none",
  backgroundColor: "$white",
  "&[data-state='open']": {
    svg: {
      transform: "rotate(0deg)",
      transition: "transform 0.2s ease-in-out",
    },
  },
  "&[data-state='closed']": {
    svg: {
      transform: "rotate(180deg)",
      transition: "transform 0.2s ease-in-out ",
    },
  },
  svg: {
    width: "1rem",
    height: "1rem",
    color: "$cinzaDark",
  },

 
});

export const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: "2rem",
  height: "2rem",
  borderRadius: "8px",
  
 
});

export const AvatarImage = styled(AvatarPrimitive.Image, {
  width: "2rem",
  height: "2rem",
  objectFit: "cover",
  borderRadius: "50%",

  "@media (max-width: 480px)": {
    width: "2rem",
    height: "2rem",
  },
});

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  color: "$grayLogo",
  fontSize: "0.9375rem",
  lineHeight: 1,
  fontWeight: 500,
});

export const MenubarContent = styled(Menubar.Content, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "5.3125rem",
  height: "auto",

  minHeight: "5rem",
  backgroundColor: "$white",
  borderRadius: "15px",
  // marginRight: "1.75rem",
  marginTop: "0.1rem",
  gap: "0.5rem",
  padding: "0.5rem",
  boxShadow: "0 0 2px 1px rgba(0, 0, 0, 0.1)",
  "&[data-state='open']": {
    animation: `${UpToDown} 0.3s ease-in-out`,
  },
  "&[data-state='closed']": {
    animation: `${DownToUp} 0.4s ease-in-out`,
  },
  zIndex: 100,


  
});

export const MenubarItem = styled(Menubar.Item, {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "fit-content",
  backgroundColor: "$white",
  border: "none",
  outline: "none",
  color: "$cinzaDark",
  fontSize: "0.75rem",
  fontWeight: 400,
  fontFamily: "$DM_Sans",
  transition: "all 0.3s ease-in-out",

  "&:hover": {
    cursor: "pointer",
    fontWeight: 500,
  },
});
export const LogOut = styled(Menubar.Item, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: "2.3125rem",
  backgroundColor: "$white",
  border: "none",
  outline: "none",
  color: "$cinzaDark",
  fontSize: "0.75rem",
  fontWeight: 400,
  fontFamily: "$DM_Sans",
  transition: "all 0.3s ease-in-out",
  borderTop: "1px solid #696969 ",
  gap: "0.25rem",
  "& svg": {
    width: "1rem",
    height: "1rem",
    color: "$redFwo",
  },
  "&:hover": {
    cursor: "pointer",
    fontWeight: 500,
  },
});

export const MenuHeader = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "3.5rem",
  backgroundColor: "$",
  alignItems: "left",
  borderBottom: "1px solid #696969 ",

  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingTop: ".5rem",
  paddingBottom: "1rem",
  justifyContent: "center",
  color: "$cinzaDark",
  fontSize: "0.75rem",
  fontWeight: 400,
  fontFamily: "$DM_Sans",

});

export const MenuBarLogoutContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "3rem",
  backgroundColor: "$blackText",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  color: "red",
  fontSize: "0.75rem",
  borderTop: "1px solid #696969 ",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  paddingRight: "1.5rem",

  transition: "all 0.3s ease-in-out",
  svg: {
    width: "1rem",
    height: "1rem",
    color: "$redMain",
  },
});

export const LogoutItem = styled("div", {
  display: "flex",
  width: "100%",
  height: "100%",
  backgroundColor: "$black",
  border: "1px solid $black",
  outline: "none",
  alignItems: "center",
  cursor: "pointer",
  flexDirection: "row",
  gap: ".5rem",
  color: "$redMain",
  fontSize: "0.75rem",
  paddingLeft: "1.5rem",
  fontFamily: "$DM_Sans",
  svg: {
    width: "1rem",
    height: "1rem",
    color: "$white",
  },

  "&:hover": {
    color: "$redMain",
    fontWeight: 500,

    svg: {
      color: "$redMain",
    },
  },

});