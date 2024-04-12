import * as Dialog from "@radix-ui/react-dialog"

import { ArrowRight, CloseCircle, Edit, TextBlock } from "iconsax-react"
import { PopUpChildren } from "../PopUpChildren"
import { ButtonTrigger, ButtonTriggerAbsolute, Content, EndButtonsContainer, HeaderContainer } from "./styles"
import { PrimitivesBoard } from "../.."
import { useEffect, useState } from "react"
import { keyframes, styled } from "@/styles"
import { DefaultButton } from "@/components/DefaultButton"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { FieldUncheckedCreateInput, FieldColumnUncheckedCreateInput, PrimitiveFields, Field, Card } from "@/types"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormText } from "@/components/InputFormComponents/Text"

const FIND_UNIQUE_PRIMITIVE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUP_TAG = gql`
  query findUniquePrimitiveFieldInCreateOneFieldInPopUpTag($type: FieldType!) {
    findUniquePrimitiveFieldsOrThrow(where: { fieldType: $type }) {
      id
      fieldType
      content
    }
  }
`

const UPSERT_ONE_TAG_BOARD_IN_POPUP_TAG = gql`
    mutation upsertOneTagBoardInPopUpTag($id:Int!, $create:TagUncheckedCreateInput!, $update:TagUncheckedUpdateInput!){
        upsertOneTag(where: {id:$id}, create: $create, update:$update ) {
            id
        }
    }
`

const UPSERT_ONE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUP_TAG = gql`
  mutation upsertOneFieldInCreateOneFieldInPopUpTag(
    $id: Int!
    $create: FieldUncheckedCreateInput!
    $update: FieldUncheckedUpdateInput!
  ) {
    upsertOneField(where: { id: $id }, create: $create, update: $update) {
      id
    }
  }
`

const SchemaData = z.object({
    title: z.string().max(25).min(1),
    color: z.string(),
})

type Data = z.infer<typeof SchemaData>

interface PrimitiveField {
    findUniquePrimitiveFieldsOrThrow: PrimitiveFields
}

interface IPopUpShortTextProps {
    card?: Card
    uuid?: string
    refetch?: Function
}

export function PopUpTag({ card, uuid, refetch }: IPopUpShortTextProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const {
        handleSubmit,
        reset,
        setValue,
        register,
        formState: { errors },
    } = useForm<Data>({
        resolver: zodResolver(SchemaData),
        defaultValues: {
            title: "Campo de texto curto",
            color: "#000000",
        },
    })

    useEffect(() => {
        console.log(card)
        if (card) {
            // reset({ title: field?.name, color: field?.description })
        }
    }, [card])

    const [primitiveField] = useLazyQuery<PrimitiveField>(FIND_UNIQUE_PRIMITIVE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUP_TAG)
    const [upsertOneField] = useMutation(UPSERT_ONE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUP_TAG)

    const submit = async (data: Data) => {
        const type = "TAG"

        const boardId = card?.column.board.id
        // const { data: field_ } = await primitiveField({ variables: { type } })

        // upsertOneField({
        //     variables: {
        //         id: card.id ?? 0,
        //         create: {
        //             fieldValueId: field_?.findUniquePrimitiveFieldsOrThrow.id,
        //             fieldType: type,
        //             name: data.title,
        //             description: data.title,
        //             content: {},
        //             createdBy: uuid,
        //             updatedBy: uuid,
        //             required: false
        //         },
        //         update: {
        //             name: { set: data.title },
        //             content: { set: {} },
        //             updatedBy: { set: uuid },
        //         },
        //     },
        // })

        if (refetch) {
            refetch()
        }

        // setIsDialogOpen(false)
    }
    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <ButtonTriggerAbsolute onClick={() => { setIsDialogOpen(true) }}>
                    <Edit />
                </ButtonTriggerAbsolute>
            </Dialog.Trigger>
            <Dialog.Portal>
                <DialogOverlay />
                <PopUpChildren>
                    <HeaderContainer>
                        <h3>Tag</h3>
                        <button onClick={() => setIsDialogOpen(false)}>
                            <CloseCircle variant='Outline' />
                        </button>
                    </HeaderContainer>
                    <Content onSubmit={handleSubmit(submit)}>

                        <FormText
                            label="Tag"
                            description="Nome da etiqueta"
                            register={register("title")}
                            error={errors.title}
                        />

                        <input type="color" onChange={(event) => setValue("color", event.target.value)} />

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

const fadeIn = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
})

const DialogOverlay = styled(Dialog.Overlay, {
    backgroundColor: "rgba(0,0,0,.001)",
    position: "fixed",
    inset: 0,
    animation: `${fadeIn} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
    backdropFilter: "blur(5px)",

})
