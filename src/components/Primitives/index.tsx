import { DefaultInputs, DefaultInputsProps } from "../DefaultInputs"
import { SelectFWO, SelectProps } from "./PrimitivesInputs/SelectFWO"
import { SelectFWOWhite,SelectPropsWhite } from "./PrimitivesInputs/SelectFWOWhite"
import { BigText,BigTextProps } from "./PrimitivesInputs/BigText"
import { DateInput, DateInputProps } from "./PrimitivesInputs/DateInput"
import { InputFile, InputFileProps } from "./PrimitivesInputs/InputFile"
import { SmallText, SmallTextProps } from "./PrimitivesInputs/SmallText"

interface IPrimitivesProps {
  componentName: "SmallText" | "DefaultInputs" | "SelectFWO" | "DateInput" | "SelectFWOWhite"|"InputFile"|"BigText" 
  value?: any
  defaultInputsProps?: DefaultInputsProps
  selectFWOProps?: SelectProps
  smallTextProps?: SmallTextProps
  dateInputProps?: DateInputProps
  selectPropsWhite?: SelectPropsWhite
  inputFileProps?: InputFileProps
  bigTextProps?: BigTextProps
}

export function Primitives(props: IPrimitivesProps) {
  const { componentName, defaultInputsProps, selectFWOProps } = props

  let componentToRender

  switch (componentName) {
    case "DefaultInputs":
      componentToRender = <DefaultInputs {...defaultInputsProps} />
      break
    case "SelectFWO":
      componentToRender = <SelectFWO {...selectFWOProps} />
      break
    case "SmallText":
      componentToRender = <SmallText {...props.smallTextProps} />
      break
    case "DateInput":
      componentToRender = <DateInput {...props.dateInputProps} />
      break
    case "SelectFWOWhite":
      componentToRender = <SelectFWOWhite {...props.selectPropsWhite} />
      break
    case "InputFile":
      componentToRender = {...props.inputFileProps ? <InputFile {...props.inputFileProps} /> : <div>Componente não encontrado</div>}
      break
    case"BigText":
      componentToRender =  <BigText {...props.bigTextProps} />
      break

    

    default:
      componentToRender = <div>Componente não encontrado</div>
  }

  return <>{componentToRender}</>
}
