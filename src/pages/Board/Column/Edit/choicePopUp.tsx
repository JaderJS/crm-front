import { PopUpConnectionBoard } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpConnectionBoard"
import { PopUpCity } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpCity"
import { PopUpRadioButton } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpRadioButton"
import { PopUpLongText } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpLongText"
import { PopUpDate } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpDate"
import { PopUpShortText } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpShortText"
import { Field } from "@/types"
import { useState } from "react"
import { PoPupAppointment } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpAppointment"
import { PopUpAttachment } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpAttachment"
import { PopUpClient } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpClient"
import { PopUpTel } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpTel"
import { PopUpDocs } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpDocs"
import { PopUpImage } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpImage"
import { PopUpNumber } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpNumber"
import { PopUpLink } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpLink"
import { PopUpInvest } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpInvest"
import { PopUpMoney } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpMoney"
import { PopUpCep } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpCep"
import { PopUpEmail } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpEmail"
import { PopUpState } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpState"
import { PopUpCheckbox } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpCheckbox"
import { PopUpHour } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpHour"
import { PopUpProjects } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpProjects"

interface ChoicePopUpComponentProps {
  typeField: string
  columnId: number
  uuid?: string
  field: Field
  refetch?: Function
}

type FieldType = "SHORTTEXT" | "LONGTEXT" | "DATE" | "CONNECTIONBOARD" | "CITY" | "RADIOBUTTON"

export const ChoicePopUpComponent = ({ typeField, columnId, uuid, field, refetch }: ChoicePopUpComponentProps) => {
  const [components, setComponents] = useState({
    SHORTTEXT: <PopUpShortText {...{ columnId, field, typeField, uuid, refetch }} />,
    LONGTEXT: <PopUpLongText {...{ columnId, field, typeField, uuid, refetch }} />,
    DATE: <PopUpDate {...{ columnId, field, typeField, uuid, refetch }} />,
    CONNECTIONBOARD: <PopUpConnectionBoard columnId={columnId} uuid={uuid} field={field} refetch={refetch} />,
    CITY: <PopUpCity {...{ columnId, field, typeField, uuid, refetch }} />,
    RADIOBUTTON: <PopUpRadioButton {...{ columnId, field, typeField, uuid, refetch }} />,
    DATEAPPOINTMENT: <>{refetch && <PoPupAppointment {...{ columnId, field, refetch }} />}</>,
    ATTACHMENT: <>{refetch && <PopUpAttachment {...{ columnId, field, refetch }} />}</>,
    CLIENT: <>{refetch && <PopUpClient {...{ columnId, field, refetch }} />}</>,
    IMAGE: <>{refetch && <PopUpImage {...{ columnId, field, refetch }} />}</>,
    TEL: <>{refetch && <PopUpTel {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    CNPJ: <>{refetch && <PopUpDocs {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    CNH: <>{refetch && <PopUpDocs {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    CPF: <>{refetch && <PopUpDocs {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    NUMBER: <>{refetch && <PopUpNumber {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    LINK: <>{refetch && <PopUpLink {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    INVEST: <>{refetch && <PopUpInvest {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    MONEY: <>{refetch && <PopUpMoney {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    CEP : <>{refetch && <PopUpCep {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    EMAIL: <>{refetch && <PopUpEmail {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    STATE: <>{refetch && <PopUpState {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    CHECKBOX: <>{refetch && <PopUpCheckbox {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    HOURS: <>{refetch && <PopUpHour {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    PROJECTS:<>{refetch && <PopUpProjects {...{ columnId, field, typeField, uuid, refetch }} />}</>,
    DEFAULT: <div>Componente não encontrado</div>,
  })

  return <>{components[typeField as FieldType] || components.DEFAULT}</>
}
