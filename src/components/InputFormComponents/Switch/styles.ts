import { styled, keyframes } from "@/styles"
import * as Switch from "@radix-ui/react-switch"

export const SwitchRoot = styled(Switch.Root, {
    all: "unset",
    width: "1.9375rem",
    height: "1rem",
    backgroundColor: "#D9D9D9",
    borderRadius: "27px",
    position: "relative",
    border: "1px solid rgba(0, 0, 0, 0.1)",

    "&[data-state=checked]": { backgroundColor: "#62d28f" },
    transition: "all 0.2s ease",
    paddingLeft: "5px",
    cursor: "pointer",
})

export const greenWave = keyframes({
    "0%": { boxShadow: "0 0 0 0 rgba(38, 198, 102, 0.7)" },
    "50%": { boxShadow: "0 0 0 10px rgba(38, 198, 102, 0)" },
    "100%": { boxShadow: "0 0px 0px rgba(0, 0, 0, 0.01)" },
})

export const SwitchThumb = styled(Switch.Thumb, {
    display: "block",
    width: "1.206rem",
    height: "1.206rem",
    backgroundColor: "#A1A1A5",
    borderRadius: "9999px",
    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.0)",
    transition: "all 100ms",
    transform: "translateX(-4px) translateY(-1px)",
    willChange: "transform",

    "&[data-state=checked]": {
        transform: "translateX(60%) translateY(-1px)",
        backgroundColor: "#26C666",
        animation: `${greenWave} .5s ease-in-out`,
    },
})

export const Flex = styled("div", {
    display: "flex",
    variants: {
        space: {
            true: {
                width: "100%",
                justifyContent: "space-between",
            },
            false: {},
        },
    },
})

export const Label = styled("label", {
    color: "#202128",
    fontSize: "0.75rem",
    lineHeight: 1,
})