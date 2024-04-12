import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { PrimitivesAppointment } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveAppointment"
import { PrimitiveAttachment, PrimitiveAttachmentAction } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveAttachment"
import { PrimitivesClients } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveClient"
import { PrimitiveImage } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveImage"
import { PrimitiveLink, PrimitiveLinkAnchor } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveLink"
import { PrimitiveNumber } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveNumber"
import { PrimitiveLongText, PrimitivesBigText } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesBigText"
import { PrimitivesCashInput } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesCashInput"
import { PrimitivesCity } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesCity"
import { PrimitivesConnectionBoard } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesConnectionBoard"
import { PrimitivesDateInput } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesDateInput"
import { PrimitivesInvesters } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesInvesters"
import { PrimitivesProjects } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesProjects"
import { PrimitiveRadioButton } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesRadioBoard"
import { PrimitivesState } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesState"
import { UserContext } from "@/contexts/UserContext"
import { updateOneHistoryCard } from "@/myHooks/Card/card"
import { SchemaContentCard, schemaContentCard } from "@/myHooks/Card/schema"
import { Card, CardMovement, Field, FieldsValue } from "@/types"
import { gql, useMutation, useQuery } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash } from "iconsax-react"
import { FocusEvent, InputHTMLAttributes, useContext } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface CardsData {
  cards: Card[]
}

interface ChooseFieldProps {
  field: Field
  card: Card
  actualCard: Card
  refetch: Function
  movement: CardMovement
  disabled?: boolean
}


const FIND_MANY_CARDS_WITH_BOARD_IN_CARD_FOCUS_IN_CHOOSE_FIELD_COMPONENT = gql`
  query findManyCardsWithBoardInCardFocusInChooseFieldComponent($id: String!) {
    cards(where: { column: { is: { boardId: { equals: $id } } } }) {
      id
      appointment
      name
      createdBy
      updatedBy
      order
      priority
      description
      tags
      cardTags {
        tag {
          id
          title
          color
        }
      }
      cardAssignment {
        id
        user {
          uuid
          avatarUrl
          name
          nickName
        }
      }
      column {
        id
        title
      }
    }
  }
`

const UPDATE_ONE_CARD_MOVEMENT_IN_CHOOSE_FIELD_COMPONENTE = gql`
mutation updateOneCardInCardFocusInChooseFieldComponent($id:Int!, $args:CardMovementUncheckedUpdateInput!){
  updateOneCardMovement(data: $args, where:{id:$id} ) {
    id
  }
}
`

const UPDATE_ONE_CARD_IN_CHOOSE_FIELD_COMPONENT = gql`
mutation updateOneCardInChooseFieldComponent($id:String!, $args:CardUncheckedUpdateInput!){
  updateOneCard(data: $args, where:{id:$id} ) {
    id
  }
}
`


export const ChooseFieldComponent = ({ field, card, actualCard, disabled = true, movement, refetch }: ChooseFieldProps) => {

  const { userRoot, uuid, name } = useContext(UserContext)


  const { data: cards } = useQuery<CardsData>(FIND_MANY_CARDS_WITH_BOARD_IN_CARD_FOCUS_IN_CHOOSE_FIELD_COMPONENT, {
    variables: { id: field?.content?.boardId?.toString() },
    skip: field?.content?.boardId === undefined || field.fieldType !== "CONNECTIONBOARD",
    fetchPolicy: "network-only",
  })

  const [updateOneCardMovement, { loading, error }] = useMutation(UPDATE_ONE_CARD_MOVEMENT_IN_CHOOSE_FIELD_COMPONENTE)
  const [updateOneCard] = useMutation(UPDATE_ONE_CARD_IN_CHOOSE_FIELD_COMPONENT)

  const handleUpdateHistoryCard = async ({ id, field, value }: { id: number, field: { id: number, fieldType: string }, value: any }) => {

    const newContentCard = updateOneHistoryCard({
      content: value,
      card: card,
      id: id,
      field: { id: field.id, fieldType: field.fieldType },
      updatedBy: uuid,
      name: name,
    })

    // await new Promise<void>((resolve) => { setTimeout(() => { resolve() }, 5000) })

    updateOneCard({ variables: { id: card.id, args: { hasHistoryModified: { set: true } } } })

    const update = updateOneCardMovement({
      variables: {
        id: movement.id,
        args: {
          content: newContentCard
        }
      }
    }).then(() => {
      refetch()
    })

    toast.promise(update, { pending: "Carregando...", error: "Falha ao atualizar histórico", success: "Histórico atualizado com sucesso!" })
  }

  const orderedFields = field?.content?.fields?.sort((a: { order: number }, b: { order: number }) => a.order - b.order)
  const fieldsValues = field.FieldsValue
  const hasModified = actualCard?.hasHistoryModified 
  const modified = (fieldsValues: FieldsValue[], hasModified: boolean) => {
    if (!hasModified) {
      return
    }
    return {
      uuid: fieldsValues?.[0]?.user?.uuid || "n/a",
      name: fieldsValues?.[0]?.user?.name,
      updatedAt: fieldsValues?.[0]?.createdAt ?? new Date().toISOString(),
    }
  }


  if (field?.fieldType === "CITY") {
    return (
      <PrimitivesCity
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onChange={(value) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value.value })}
        defaultValue={fieldsValues?.[0]?.content?.value}
        modified={modified(fieldsValues, hasModified)}
        loading={loading}
        disabled={disabled}

      />
    )
  } else if (field.fieldType === "STATE") {
    return (
      <PrimitivesState
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onChange={(value) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value.value })}
        defaultValue={fieldsValues?.[0]?.content?.value}
        modified={modified(fieldsValues, hasModified)}
        loading={loading}
        disabled={disabled}
      />
    )
  } else if (field?.fieldType === "DATE") {
    return (
      <PrimitivesBoard
        typeField={field?.fieldType}
        onChange={(date) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: date })}
        defaultValue={fieldsValues?.[0]?.content?.value}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        id={field.id}
        modified={modified(fieldsValues, hasModified)}
        disabled={disabled}
      />
    )
  } else if (field?.fieldType === "INVEST") {
    return (
      <PrimitivesInvesters
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        onChange={(values: any) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: values })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        description={field.description}
        disabled={disabled}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        modified={modified(fieldsValues, hasModified)}
      />
    )
  } else if (field?.fieldType === "CONNECTIONBOARD") {
    return (
      <PrimitivesConnectionBoard
        cards={cards?.cards}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onChange={(data) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: data })}
        disabled={disabled}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        modified={modified(fieldsValues, hasModified)}

      />
    )
  } else if (field?.fieldType === "RADIOBUTTON") {
    return (
      <PrimitiveRadioButton
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        options={field.content?.options}
        defaultValue={{ value: fieldsValues?.[0]?.content?.value, label: field.FieldsValue?.[0]?.content?.value }}
        disabled={disabled}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        onChange={(value) => { handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value }) }}
      />
    )
  } else if (field?.fieldType === "MONEY") {
    return (
      <PrimitivesCashInput
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onBlur={(value: any) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value })}
        defaultValue={Number(fieldsValues?.[0]?.content?.value)}
        disabled={disabled}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        modified={modified(fieldsValues, hasModified)}
      />
    )
  } else if (field?.fieldType === "DATEAPPOINTMENT") {
    return (
      <PrimitivesAppointment
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        defaultValues={fieldsValues?.[0]?.content?.value}
        onChange={(value) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value, })}
        disabled={disabled}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        modified={modified(fieldsValues, hasModified)}
      />
    )
  } else if (field?.fieldType === "CLIENT") {
    return (
      <PrimitivesClients
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        defaultValue={fieldsValues?.[0]?.content?.value}
        disabled={disabled}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        onChange={(value) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value })}
        modified={modified(fieldsValues, hasModified)}

      />
    )
  } else if (field?.fieldType === "ATTACHMENT") {
    return (
      <PrimitiveAttachment
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onFetch={(response) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: response.data })}
        field={field.FieldsValue}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}
      >
        <PrimitiveAttachmentAction
          icon={Trash}
          action="DELETE"
          onClick={() => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: "" })}
        />
      </PrimitiveAttachment >

    )
  } else if (field?.fieldType === "NUMBER") {
    return (
      <PrimitiveNumber
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        defaultValue={fieldsValues?.[0]?.content?.value}
        onBlur={(event: { target: { value: any } }) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: event.target.value })}
        disabled={disabled}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        modified={modified(fieldsValues, hasModified)}
      />
    )
  } else if (field?.fieldType === "IMAGE") {
    return (
      <PrimitiveImage
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onFetch={(response) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: response.data })}
        field={field.FieldsValue}
        loading={loading}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}
      />
    )
  } else if (field?.fieldType === "TEL") {
    return (
      <PrimitivesBoard
        typeField={"TEL"}
        onBlur={(value: any) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value })}
        defaultValue={fieldsValues?.[0]?.content?.value}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        id={field.id}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}


      />
    )
  } else if (field?.fieldType === "CNH" || field?.fieldType === "CPF" || field?.fieldType === "CNPJ" || field?.fieldType === "CEP") {
    return (
      <PrimitivesBoard
        typeField={field?.fieldType}
        onBlur={(value: any) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value })}
        defaultValue={fieldsValues?.[0]?.content?.value}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        id={field.id}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}


      />
    )
  } else if (field?.fieldType === "LINK") {
    return (
      <PrimitiveLink
        defaultValue={fieldsValues?.[0]?.content?.value}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onBlur={(event) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: event.target.value })}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}
      >
        {fieldsValues?.[0]?.content?.value && <PrimitiveLinkAnchor href={fieldsValues?.[0]?.content?.value} />}
      </PrimitiveLink>
    )
  } else if (field?.fieldType === "CHECKBOX") {
    return (
      <PrimitivesBoard
        typeField={field?.fieldType}
        onChange={(value) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value })}
        options={field.content?.options}
        defaultValue={fieldsValues?.[0]?.content?.value}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        id={field.id}
        key={field.id}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
      />
    )
  } else if (field?.fieldType === "LONGTEXT") {
    return (
      <PrimitiveLongText
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onDebounce={(value) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: value })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}
      />
    )
  }
  else if (field?.fieldType === "PROJECTS") {
    return (
      <PrimitivesProjects
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        onChange={(values) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: values })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        // loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}
      />
    )
  }
  else {
    return (
      <PrimitivesBoard
        typeField={field?.fieldType}
        onBlur={(event: FocusEvent<HTMLInputElement>) => handleUpdateHistoryCard({ id: fieldsValues?.[0]?.id, field: { id: field.id, fieldType: field.fieldType }, value: event.target.value })}
        defaultValue={field.FieldsValue?.[0]?.content?.value}
        label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
        description={field.description}
        id={field.id}
        disabled={disabled}
        modified={modified(fieldsValues, hasModified)}
        loading={loading}
        errorBoolean={!!error}
        successBoolean={!error && loading}

      />
    )
  }
}