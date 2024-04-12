import * as Switch from "@radix-ui/react-switch"
import { styled, keyframes } from "@/styles"
import { UseFormRegister } from "react-hook-form"
import { useState } from "react"

interface CustomSwitchProps {
  label?: string
  checked?: boolean
  defaultValue?: boolean // Adicione esta linha

  onChange?: any
  textColor?: string
  [key: string]: any // Aceita outras props que não estão definidas
}

const PrimitivesSwitch = ({
  label,
  register,
  onChange,
  textColor,
  defaultValue,
  // switchValue=defaultValue, // Adicione esta linha
  ...props
}: CustomSwitchProps) => {
  // Função para lidar com a mudança de estado do switch
  const [switchValue, setSwitchValue] = useState(defaultValue)
  
  return (
    <Flex space={!!label}>
      {label && (
        <Label htmlFor='switch' css={{ paddingRight: 15, color: textColor }}>
          {label}
        </Label>
      )}
      <SwitchRoot
        onClick={onChange}
        checked={switchValue} // Adicione esta linha
        onCheckedChange={() => setSwitchValue(!switchValue)} // Adicione esta linha
        onChange={onChange}
      >
        <SwitchThumb />
      </SwitchRoot>
    </Flex>
  )
}
const SwitchRoot = styled(Switch.Root, {
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

const greenWave = keyframes({
  "0%": { boxShadow: "0 0 0 0 rgba(38, 198, 102, 0.7)" },
  "50%": { boxShadow: "0 0 0 10px rgba(38, 198, 102, 0)" },
  "100%": { boxShadow: "0 0px 0px rgba(0, 0, 0, 0.01)" },
})

const SwitchThumb = styled(Switch.Thumb, {
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

const Flex = styled("div", {
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

const Label = styled("label", {
  color: "#202128",
  fontSize: "0.75rem",
  lineHeight: 1,
})

export default PrimitivesSwitch
