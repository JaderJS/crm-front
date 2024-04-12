
import { keyframes, styled } from "@/styles";


const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
  
});

export const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "80vh",
    minHeight: "4.0625rem",
    fontFamily: "$DM_Sans",
    position: "relative",
    padding: "21px",
    backgroundColor: "$white",
    borderRadius: "30px",
    animation: `${fadeIn} 1s`,
    border: "1px solid $cinzaClaro02",
    gap: "15px",
    transition: "all 0.3s ease-in-out",
});

export const UserInfoContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "3rem",
    gap: ".5rem",
    borderRadius: "15px",
    "& h1": {
        fontSize: "1rem",
        color: "$blackText",
        fontWeight: "700",
    },
    "& h2": {
        fontSize: "1rem",
        color: "$blackText",
        fontWeight: "400",
    },
});

export const Services = styled("div", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    gap: "20px",
    backgroundColor: "transparent",
    overflowX: "auto",
});

export const Service = styled("div", {
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "3rem",
    gap: "20px",
    backgroundColor: "transparent",
});

export const SelectService = styled("div", {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    minWidth:"9.375rem",
});

export const SelectCapacidade = styled("div", {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    minWidth:"12.5rem",
});

export const CapacidadeUtilizada = styled("div", {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    minWidth:"12.5rem",
});

export const RangeContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minWidth:"13.5rem",
    gap: "10px",
   
    "& p": {
        fontSize: ".75rem",
        color: "$blackText",
        fontWeight: "400",
        width: "5rem",
    },
});

export const TrashContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "1.5rem",
    height: "1.5rem",
    backgroundColor: "transparent",
    "& svg": {
        color: "$redFwo",
        cursor: "pointer",
        width: "1.5rem",
        height: "1.5rem",
    },
});