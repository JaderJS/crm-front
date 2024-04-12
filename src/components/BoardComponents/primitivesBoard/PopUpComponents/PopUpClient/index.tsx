import * as Dialog from "@radix-ui/react-dialog"

import { ArrowRight, CloseCircle, Edit, People, TextBlock } from "iconsax-react"
import { PopUpChildren } from "../PopUpChildren"
import { ButtonTrigger, ButtonTriggerAbsolute, Content, DialogOverlay, EndButtonsContainer, HeaderContainer } from "./styles"
import { PrimitivesBoard } from "../.."
import { useContext, useEffect, useState } from "react"
import { keyframes, styled } from "@/styles"
import { DefaultButton } from "@/components/DefaultButton"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { FieldUncheckedCreateInput, FieldColumnUncheckedCreateInput, PrimitiveFields, Field, User } from "@/types"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { FormText } from "@/components/InputFormComponents/Text"
import FormSwitch from "@/components/InputFormComponents/Switch"
import { AuthContext } from "@/contexts/AuthContext"

const FIND_UNIQUE_PRIMITIVE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUP_CLIENT = gql`
  query findUniquePrimitiveFieldInCreateOneFieldInPopUpClient($type: FieldType!) {
    findUniquePrimitiveFieldsOrThrow(where: { fieldType: $type }) {
      id
      fieldType
      content
    }
  }
`

const UPSERT_ONE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUP_CLIENT = gql`
  mutation upsertOneFieldInCreateOneFieldInPopUpClient(
    $id: Int!
    $create: FieldUncheckedCreateInput!
    $update: FieldUncheckedUpdateInput!
  ) {
    upsertOneField(where: { id: $id }, create: $create, update: $update) {
      id
    }
  }
`

const FIND_MANY_USERS_CLIENTS_IN_POPUP_CLIENT = gql`
query findManyUsersClientsInPopUpClient{
    users (where: {typeUser:{equals:client}}) {
        uuid
        name
        avatarUrl
        nickName   
    }
}
`

const SchemaData = z.object({
    title: z.string().max(15).min(1),
         description: z.string().max(100).nullable().optional(),

    require: z.coerce.boolean(),
})

type Data = z.infer<typeof SchemaData>

interface PrimitiveField {
    findUniquePrimitiveFieldsOrThrow: PrimitiveFields
}

interface ClientsData {
    users: User[]
}

interface PopUpClientProps {
    columnId: number
    field?: Field
    refetch: Function
}

const fieldType = {
    createLabel: <><People /> Cliente</>,
    editLabel: <Edit />,
    type: "CLIENT"
}

export function PopUpClient({ columnId, field, refetch }: PopUpClientProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { uuid } = useContext(AuthContext)

    const {
        handleSubmit,
        reset,
        setValue,
        control,
        register,
        watch,
        formState: { errors },
    } = useForm<Data>({
        defaultValues: {
            title: "Novo titulo",
            description: "Nova descrição",
            require: true,
        },
    })

    const [primitiveField] = useLazyQuery<PrimitiveField>(FIND_UNIQUE_PRIMITIVE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUP_CLIENT)
    const [clients] = useLazyQuery<ClientsData>(FIND_MANY_USERS_CLIENTS_IN_POPUP_CLIENT)
    const [upsertOneField] = useMutation(UPSERT_ONE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUP_CLIENT)

    useEffect(() => {
        if (field) {
            reset({ title: field?.name, description: field?.description, require: field?.required })
        }
    }, [field])

    const submit = async (data: Data) => {

        const { data: field_ } = await primitiveField({ variables: { type: fieldType.type } })

        upsertOneField({
            variables: {
                id: field?.id ?? 0,
                create: {
                    fieldValueId: field_?.findUniquePrimitiveFieldsOrThrow.id,
                    fieldType: fieldType.type,
                    name: data.title,
                    description: data.description,
                    content: {},
                    createdBy: uuid,
                    updatedBy: uuid,
                    required: data.require,
                    fieldColumn: {
                        create: {
                            column: {
                                connect: { id: columnId }
                            }
                        }
                    }
                },
                update: {
                    name: { set: data.title },
                    description: { set: data.description },
                    content: { set: {} },
                    updatedBy: { set: uuid },
                    required: { set: data.require },
                },
            },
        }).then(() => {
            refetch()
            reset()
            setIsDialogOpen(false)
            reset()
        })
    }
    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                {!field ? (
                    <ButtonTrigger onClick={() => { setIsDialogOpen(true) }}>
                        {fieldType.createLabel}
                    </ButtonTrigger>
                ) : (
                    <ButtonTriggerAbsolute onClick={() => { setIsDialogOpen(true) }}>
                        {fieldType.editLabel}
                    </ButtonTriggerAbsolute>
                )}
            </Dialog.Trigger>
            <Dialog.Portal>
                <DialogOverlay />
                <PopUpChildren>
                    <HeaderContainer>
                        <h3>Cliente</h3>
                        <button onClick={() => setIsDialogOpen(false)}>
                            <CloseCircle variant='Outline' />
                        </button>
                    </HeaderContainer>
                    <Content onSubmit={handleSubmit(submit)}>

                        <FormText
                            label="Titulo*"
                            register={register("title")}
                            error={errors.title}
                        />
                        <FormText
                            label="Descrição do campo"
                            register={register("description")}
                            error={errors.description}
                        />
                        <FormSwitch
                            label="Preenchimento obrigatório?"
                            name="require"
                            control={control}
                            error={errors.require}
                        />

                        <EndButtonsContainer>
                            <DefaultButton
                                onClick={() => setIsDialogOpen(false)}
                                backgroundColor={"gray"}
                                hover={"Gray"}
                                style={{
                                    color: "#A1A1A5",
                                    backgroundColor: "#EEE",
                                }}
                            >
                                Cancelar
                            </DefaultButton>
                            <DefaultButton animationSvg={"arrowRight"} type='submit'>
                                Salvar alterações
                                <ArrowRight
                                    variant='Outline'
                                    style={{
                                        width: "1rem",
                                        height: "1rem",
                                    }}
                                />
                            </DefaultButton>
                        </EndButtonsContainer>
                    </Content>
                </PopUpChildren>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

