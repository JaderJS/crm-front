import * as Switch from "@radix-ui/react-switch"
import { styled } from "@/styles"

interface CustomSwitchProps {
    label?: string
    checked?: boolean
    onClick?: () => void
    textColor?: string
}

const CustomSwitch = ({ label, checked, onClick,textColor}: CustomSwitchProps) => (
  <Flex css={{ alignItems: "center", width: "100%", justifyContent: "space-between" }}>
    {label &&
    <Label htmlFor='switch' css={{ paddingRight: 15 ,color: textColor}}>
        {label}
    </Label>
    }
    <SwitchRoot id='switch'checked={checked} onClick={onClick}>
      <SwitchThumb />
    </SwitchRoot>
  </Flex>
)

const SwitchRoot = styled(Switch.Root, {
  all: "unset",
  width: "29.45px",
  height: "18.85px",
  backgroundColor: "#A1A1A5",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: "0 2px 10px '-2px rgba(0,0,0,.2)'",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  "&[data-state=\"checked\"]": { backgroundColor: "#26C666" },
  transition: "all 0.2s ease",
  paddingLeft: "5px",
  cursor: "pointer",
})

const SwitchThumb = styled(Switch.Thumb, {
  display: "block",
  width: ".60125rem",
  height: ".60125rem",
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  "&[data-state=\"checked\"]": { transform: "translateX(150%)" },
})

const Flex = styled("div", { display: "flex" })
const Label = styled("label", {
  color: "#202128",
  fontSize: "0.75rem",
  lineHeight: 1,
})

export default CustomSwitch
