import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import PrimitivesAppointment from "@/components/BoardComponents/primitivesBoard/components/PrimitiveAppointment"
import { PrimitiveAttachment, PrimitiveAttachmentAction } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveAttachment"
import { PrimitivesClients } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveClient"
import { PrimitiveImage } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveImage"
import { PrimitiveLink, PrimitiveLinkAnchor } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveLink"
import { PrimitiveNumber } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveNumber"
import { UserContext } from "@/contexts/UserContext"
import { Card, Field, FieldsValue } from "@/types"
import { BaseMutationOptions, gql, useMutation, useQuery } from "@apollo/client"
import { Trash } from "iconsax-react"
import { useContext, useState } from "react"

const FIND_MANY_CARDS_WITH_BOARD_IN_CHOOSE_FIELD_COMPONENT = gql`
query findManyCardsWithBoardInChooseFieldsComponent ($id: String!) {
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

const CREATE_ONE_FIELD_VALUE_IN_CHOOSE_FIELD_COMPONENT = gql`
mutation createOneFieldValueInChooseFieldComponent($args: FieldsValueUncheckedCreateInput!) {
    createOneFieldsValue(data: $args) {
      id
      content
    }
  }
`

interface ChooseFieldComponentProps {
    field: Field
    card?: Card
    uuid: string
    loading: boolean
    disabled?: boolean
    refetch?: Function
}

interface CardsData {
    cards: Card[]
}

export const FieldComponent = ({ field, card, uuid, loading, disabled = false, refetch }: ChooseFieldComponentProps) => {

    const { userRoot } = useContext(UserContext)

    const { data: cards } = useQuery<CardsData>(FIND_MANY_CARDS_WITH_BOARD_IN_CHOOSE_FIELD_COMPONENT, {
        variables: { id: field?.content?.boardId?.toString() },
        skip: field?.content?.boardId === undefined,
    })

    const [success, setSuccess] = useState<boolean | null>(null)
    const [response, setResponse] = useState<BaseMutationOptions | undefined>(undefined)

    const [createValue] = useMutation(CREATE_ONE_FIELD_VALUE_IN_CHOOSE_FIELD_COMPONENT, {
        onError: (error) => {
            console.error(error)
            setSuccess(false)
            setTimeout(() => {
              setSuccess(null)
            }, 3000)
          },
          onCompleted: (response, clientOptions) => {
            setResponse(() => response)
            setSuccess(true)
            setTimeout(() => {
              setSuccess(null)
              setResponse(() => undefined)
            }, 3000)
          },
    })

    const handleSubmitValue = async ({ value }: { value: any }) => {

        createValue({
            variables: {
                args: {
                    fieldId: field.id,
                    cardId: card?.id,
                    fieldType: field.fieldType,
                    createdBy: uuid,
                    content: {
                        value: value,
                    },
                },
            },
        })
    }

    if (field?.fieldType === "CITY" || field?.fieldType === "STATE") {
        return (
            <PrimitivesBoard
                typeField={field?.fieldType}
                onChange={(selectedOptions) => {
                    const values = selectedOptions.map((item: { value: any }) => item.value)
                    handleSubmitValue({ value: values })
                }}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                id={field.id}
            />
        )
    } else if (field?.fieldType === "PROJECTS") {
        return (
          <PrimitivesBoard
            label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
            typeField={field?.fieldType}
            onChange={(value) => handleSubmitValue({ value: value })}
            defaultValue={field.FieldsValue?.[0]?.content?.value}
            description={field.description}
            id={field.id}
            successBoolean={success === true}
            errorBoolean={success === false}
          />
        )
    }
    else if (field?.fieldType === "DATE") {
        return (
            <PrimitivesBoard
                typeField={field?.fieldType}
                onChange={(date) => handleSubmitValue({ value: date })}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                id={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (field?.fieldType === "INVEST") {
        return (
            <PrimitivesBoard
                typeField={field?.fieldType}
                onChange={(values: any) => handleSubmitValue({ value: values })}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                id={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (field?.fieldType === "CONNECTIONBOARD") {
        return (
            <PrimitivesBoard
                cards={cards?.cards}
                typeField={field?.fieldType}
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                onChange={(selectedOptions) => {
                    handleSubmitValue({ value: selectedOptions })
                }}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                description={field.description}
                id={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (field?.fieldType === "RADIOBUTTON") {
        return (
            <PrimitivesBoard
                typeField={field?.fieldType}
                onChange={(selectedValue) => handleSubmitValue({ value: selectedValue })}
                options={field.content?.options}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                id={field.id}
                key={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (field?.fieldType === "MONEY") {
        return (
            <PrimitivesBoard
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                typeField={field?.fieldType}
                onBlur={(e: any) => handleSubmitValue({ value: e })}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                id={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (field?.fieldType === "DATEAPPOINTMENT") {
        return (
            <PrimitivesAppointment
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                onChange={(value) => handleSubmitValue({ value: value })}
                id={field.id.toString()}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (field?.fieldType === "CLIENT") {
        return (
            <PrimitivesClients
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                response={response}
                onChange={(value) => handleSubmitValue({ value: value })}
                id={field.id.toString()}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (field?.fieldType === "ATTACHMENT") {
        return (
            <PrimitiveAttachment
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                field={field.FieldsValue}
                response={response}
                onFetch={(response) => {
                    handleSubmitValue({ value: response.data }).then(() => refetch?.())
                }}
                successBoolean={success === true}
                errorBoolean={success === false}
            >
                <PrimitiveAttachmentAction
                    icon={Trash}
                    action='DELETE'
                    onClick={() => {
                        handleSubmitValue({ value: "" }).then(() => refetch?.())
                    }}
                />
            </PrimitiveAttachment>
        )
    } else if (field?.fieldType === "NUMBER") {
        return (
            <PrimitiveNumber
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                response={response}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                onBlur={(event: { target: { value: any } }) => handleSubmitValue({ value: event.target.value })}
            />
        )
    } else if (field?.fieldType === "IMAGE") {
        return (
            <PrimitiveImage
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                description={field.description}
                field={field.FieldsValue}
                response={response}
                onFetch={(response) => handleSubmitValue({ value: response.data }).then(() => refetch?.())}
                refetch={refetch}
            />
        )
    } else if (field?.fieldType === "TEL") {
        return (
            <PrimitivesBoard
                typeField={"TEL"}
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                onBlur={(value: any) => handleSubmitValue({ value: value })}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                description={field.description}
                id={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (
        field?.fieldType === "CNH" ||
        field?.fieldType === "CPF" ||
        field?.fieldType === "CNPJ" ||
        field?.fieldType === "CEP"
    ) {
        return (
            <PrimitivesBoard
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                typeField={field?.fieldType}
                onBlur={(value: any) => handleSubmitValue({ value: value })}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                description={field.description}
                id={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else if (field?.fieldType === "LINK") {
        return (
            <PrimitiveLink
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                description={field.description}
                onBlur={(event) => handleSubmitValue({ value: event.target.value })}
                response={response}
                successBoolean={success === true}
                errorBoolean={success === false}
            >
                {field.FieldsValue?.[0]?.content?.value && (
                    <PrimitiveLinkAnchor href={field.FieldsValue?.[0]?.content?.value} />
                )}
            </PrimitiveLink>
        )
    } else if (field?.fieldType === "CHECKBOX") {
        return (
            <PrimitivesBoard
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                typeField={field?.fieldType}
                onChange={(value) => handleSubmitValue({ value: value })}
                options={field.content?.options}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                description={field.description}
                id={field.id}
                key={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    } else {
        return (
            <PrimitivesBoard
                label={`${field.name} ${field.required ? "*" : ""} ${userRoot ? `#${field.id}` : ""}`}
                typeField={field?.fieldType}
                onBlur={(event: any) => handleSubmitValue({ value: event.target.value })}
                defaultValue={field.FieldsValue?.[0]?.content?.value}
                description={field.description}
                id={field.id}
                successBoolean={success === true}
                errorBoolean={success === false}
            />
        )
    }

}