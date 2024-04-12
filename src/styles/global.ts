import { globalCss } from "@stitches/react"

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    outline: 0,
    boxSizing: "border-box",
  
    "-webkit-font-smoothing": "antialiased",
    // scrollbarWidth: "auto",
    // scrollbarColor: "$greenV4 $backgroundGray",
    // scrollbarGutter: "auto",
    // scrollBehavior: "smooth",
    /* Scrollbar Vertical */
    "&::-webkit-scrollbar": {
      transition: "all 0.2s ease-in-out",
      width: "3px",
      backgroundColor: "transparent",
    },

    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "$purpleFwo",
      borderRadius: "5px",
    },

    /* Scrollbar Horizontal */
    "&::-webkit-scrollbar-corner": {
      background: "red",
      // display: "none",
    },
    "&::-webkit-scrollbar-thumb:horizontal": {
      backgroundColor: "$purpleFwo",
      borderRadius: "10px",
      border: "0px solid $backgroundGray",
      display: "none",
    },

    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
      "-webkit-text-fill-color": "#000",

      transition: "background-color 50000s ease-in-out 0s",
    },
  },

  body: {
    backgroundColor: "$background",
    fontFamily: "Panchang,DM Sans, sans-serif",
  },

  "button, a": {
    cursor: "pointer",

    outline: "none",
  },
  "link, a": {
    textDecoration: "none",
    backgroundImage: "$gradientFwo",
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontWeight: "bold",

    " &:hover": {
      cursor: "pointer",
    },
  },
  "input[type='radio']": {
    appearance: "none",
    position: "relative",
    width: "1rem",
    height: "1rem",
    cursor: "pointer",
    border: "1px solid #444444",
    borderRadius: "50%",
    transition: "all 0.1s ease-in-out",
    margin: "0.1rem",

    " &:checked": {
      backgroundColor: "#7841b0",
      borderColor: "#7841b0",
      boxShadow: "0 0 0 1px #7841b0",
      transition: "0.15s ease-in-out",
      "&:after": {
        content: "",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "0.5rem",
        height: "0.5rem",
        borderRadius: "50%",
        backgroundColor: "#7841b0",
        transition: "all 0.1s ease-in-out",
        boxShadow: "0 0 0 3px #fff",
      },
      "&:before": {
        content: "",
        position: "absolute",
        top: "50%",
        left: "40%",
        transform: "translate(-50%, -50%)",
        width: "0.5rem",
        height: "0.5rem",
        borderRadius: "50%",
        // backgroundColor: "red",
        transition: "all 0.1s ease-in-out",
        boxShadow: "0 0 0 1px #7841b0",
      },
    },
  },
  ".swal2-popup": {
    fontFamily: "DM Sans",
    color: "$blackText",
    borderRadius: "0.5rem",
    border: "1px solid rgba(127, 17, 224, 0.2)",
    fontWeight: 400,

    ".swal2-confirm": {
      backgroundColor: "#7841b0",
  
      "&:hover": {
        backgroundColor: "#7841b0",
        filter: "brightness(1.2)",
      },
    },

    ".swal2-title": {
      fontSize: "1.5rem",
      fontWeight: 500,
      fontFamily: "DM Sans",
    },
    }
})