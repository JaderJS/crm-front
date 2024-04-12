import { Card } from "@/types"
import { PrimitivesBigText } from "./components/PrimitivesBigText"
import { PrimitivesCashInput } from "./components/PrimitivesCashInput"
import { PrimitivesConnectionBoard } from "./components/PrimitivesConnectionBoard"
import { PrimitivesDateInput } from "./components/PrimitivesDateInput"
import { PrimitivesSmallText } from "./components/PrimitivesSmallText"
import PrimitivesSwitch from "./components/PrimitivesSwitch"
import { PrimitivesInvesters } from "./components/PrimitivesInvesters"
import { PrimitivesSelect } from "./components/PrimitivesSelect"
import { PrimitivesCity } from "./components/PrimitivesCity"
import { PrimitivesRadioBoard } from "./components/PrimitivesRadioBoard"
import { CopySuccess } from "iconsax-react"
import { PrimitivesMultiSelect } from "./components/PrimitivesMultSelect"
import PrimitivesMySelect from "./components/primitiveMySelect/index.page"
import { Control } from "react-hook-form"
import { PrimitivesClients } from "./components/PrimitiveClient"
import { PrimitivesAppointment } from "./components/PrimitiveAppointment"
import { PrimitiveAttachment } from "./components/PrimitiveAttachment"
import { PrimitivesTel } from "./components/PrimitivesTel"
import { PrimitivesCpf } from "./components/PrimitivesCpf"
import { PrimitivesCnpj } from "./components/PrimitivesCnpj"
import { PrimitivesCnh } from "./components/PrimitivesCnh"
import { PrimitivesCep } from "./components/PrimitivesCep"
import { PrimitivesEmail } from "./components/PrimitivesEmail"
import { PrimitivesState } from "./components/PrimitivesState"
import { PrimitiveLink } from "./components/PrimitiveLink"
import PrimitivesCheckbox from "./components/PrimitivesCheckbox"
import { PrimitivesHours } from "./components/PrimitivesTimeInput"
import { PrimitivesProjects } from "./components/PrimitivesProjects"
import { PrimitiveNumber } from "./components/PrimitiveNumber"

interface IPrimitivesProps {
  typeField?:
  | "SHORTTEXT"
  | "LONGTEXT"
  | "DATE"
  | "SWITCH"
  | "CASH"
  | "CONNECTIONBOARD"
  | "RADIOBUTTON"
  | "INVEST"
  | "SELECT"
  | "CITY"
  | "MONEY"
  | "MULTISELECT"
  | "MYMULTISELECT"
  | "DATEAPPOINTMENT"
  | "CLIENT"
  | "IMAGE"
  | "ATTACHMENT"
  | "TEL"
  | "CPF"
  | "CNPJ"
  | "CNH"
  | "CEP"
  | "EMAIL"
  | "STATE"
  | "CHECKBOX"
  | "PROJECTS"
  | any
  defaultValue?: any
  label?: string
  description?: string
  loading?: boolean
  cards?: Card[]
  onChange?: (value: any) => void
  disabled?: boolean
  register?: any
  errorBoolean?: boolean | null
  errorMessage?: string
  successBoolean?: boolean | null
  control?: any
}

export function PrimitivesBoard(props: IPrimitivesProps & { [key: string]: any }) {

  let componentToRender

  switch (props.typeField) {
    case "SHORTTEXT":
      componentToRender = <PrimitivesSmallText {...props} />
      break
    case "TEL":
      componentToRender = <PrimitivesTel {...props} />
      break
    case "LONGTEXT":
      componentToRender = <PrimitivesBigText {...props} />
      break
    case "DATE":
      componentToRender = <PrimitivesDateInput {...props} />
      break
    case "SWITCH":
      componentToRender = <PrimitivesSwitch {...props} />
      break
    case "MONEY":
      componentToRender = <PrimitivesCashInput {...props} />
      break
    case "INVEST":
      componentToRender = <PrimitivesInvesters {...props} />
      break
    case "CONNECTIONBOARD":
      componentToRender = <PrimitivesConnectionBoard {...props} />
      break
    case "SELECT":
      componentToRender = <PrimitivesSelect {...props} />
      break
    case "CITY":
      componentToRender = <PrimitivesCity {...props} />
      break
    case "STATE":
      componentToRender = <PrimitivesState {...props} />
      break
    case "RADIOBUTTON":
      componentToRender = <PrimitivesRadioBoard {...props} />
      break
    case "MULTISELECT":
      componentToRender = <PrimitivesMultiSelect {...props} />
      break
    case "MY_MULTISELECT":
      componentToRender = <PrimitivesMySelect {...props} />
      break
    case "DATEAPPOINTMENT":
      componentToRender = <PrimitivesAppointment {...props} />
      break
    case "CLIENT":
      componentToRender = <PrimitivesClients {...props} />
      break
    case "LINK":
      componentToRender = <PrimitiveLink {...props} />
      break
    case "IMAGE":
      componentToRender = <PrimitiveAttachment {...props} />
      break
    case "ATTACHMENT":
      componentToRender = <PrimitiveAttachment {...props} />
      break
    case "CPF":
      componentToRender = <PrimitivesCpf {...props} />
      break
    case "CNPJ":
      componentToRender = <PrimitivesCnpj {...props} />
      break
    case "CNH":
      componentToRender = <PrimitivesCnh {...props} />
      break
    case "NUMBER":
      componentToRender = <PrimitiveNumber {...props} />
      break
    case "EMAIL":
      componentToRender = <PrimitivesEmail {...props} />
      break
    case "CEP":
      componentToRender = <PrimitivesCep {...props} />
      break
    case "CHECKBOX":
      componentToRender = <PrimitivesCheckbox {...props} />
      break
    case "HOURS":
      componentToRender = <PrimitivesHours {...props} />
      break
    case "PROJECTS":
      componentToRender = <PrimitivesProjects {...props} />
      break

    default:
      componentToRender = <div>Componente não encontrado</div>
  }

  return <>{componentToRender}</>
}
