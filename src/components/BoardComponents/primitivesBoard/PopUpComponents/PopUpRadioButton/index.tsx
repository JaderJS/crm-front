import * as Dialog from "@radix-ui/react-dialog"

import { Add, AddCircle, ArrowRight, CloseCircle, Edit, TextBlock, Trash } from "iconsax-react"
import { PopUpChildren } from "../PopUpChildren"
import { ButtonTrigger, ButtonTriggerAbsolute, Content, EndButtonsContainer, HeaderContainer } from "./styles"
import { PrimitivesBoard } from "../.."
import { useEffect, useState } from "react"
import { keyframes, styled } from "@/styles"
import { DefaultButton } from "@/components/DefaultButton"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { FieldUncheckedCreateInput, FieldColumnUncheckedCreateInput, PrimitiveFields, Field } from "@/types"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const FIND_UNIQUE_PRIMITIVE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPRADIOBUTTON = gql`
  query findUniquePrimitiveFieldInCreateOneFieldInPopUpRadioButton($type: FieldType!) {
    findUniquePrimitiveFieldsOrThrow(where: { fieldType: $type }) {
      id
      fieldType
      content
    }
  }
`

const UPSERT_ONE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPRADIOBUTTON = gql`
  mutation upsertOneFieldInCreateOneFieldInPopUpRadioButton(
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
  title: z.string().max(50).min(1),
       description: z.string().max(100).nullable().optional(),

  require: z.coerce.boolean(),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ).min(1),
})

type Data = z.infer<typeof SchemaData>

interface PrimitiveField {
  findUniquePrimitiveFieldsOrThrow: PrimitiveFields
}

interface IPopUpShortTextProps {
  columnId: number
  typeField?: string
  field?: Field
  uuid?: string
  refetch?: Function
}

export function PopUpRadioButton({ columnId, typeField, field, uuid, refetch }: IPopUpShortTextProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(SchemaData),
    defaultValues: {
      title: "Campo de rádio button",
      description: "Descrição informativa sobre o campo rádio button",
      options: [{ label: "new option", value: "new option" }],
      require: false,
    },
  })

  const { fields: fieldsOptions, append: appendOptions, remove: removeOption } = useFieldArray({ control, name: "options" })

  useEffect(() => {
    if (field) {
      reset({ title: field?.name, description: field?.description, require: field?.required ?? false, options: field.content?.options })
    }
  }, [field])

  const [primitiveField] = useLazyQuery<PrimitiveField>(
    FIND_UNIQUE_PRIMITIVE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPRADIOBUTTON,
  )
  const [upsertOneField] = useMutation(UPSERT_ONE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPRADIOBUTTON)

  const submit = async (data: Data) => {
    const type = "RADIOBUTTON"
    const { data: field_ } = await primitiveField({ variables: { type } })

    upsertOneField({
      variables: {
        id: field?.id ?? 0,
        create: {
          fieldValueId: field_?.findUniquePrimitiveFieldsOrThrow.id,
          fieldType: type,
          name: data.title,
          description: data.description,
          content: { options: data.options },
          createdBy: uuid,
          updatedBy: uuid,
          required: data.require,
          fieldColumn: {
            create: {
              column: {
                connect: { id: columnId },
              },
            },
          },
        },
        update: {
          name: { set: data.title },
          description: { set: data.description },
          content: { options: data.options },
          updatedBy: { set: uuid },
          required: { set: data.require },
        },
      },
    })

    if (refetch) {
      refetch()
    }

    reset()
    setIsDialogOpen(false)
  }

  useEffect(() => { console.log(errors) }, [errors])

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        {!field ? (
          <ButtonTrigger
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            <input type='radio'
              checked={true}
            />
            Radio Button
          </ButtonTrigger>
        ) : (
          <ButtonTriggerAbsolute
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            <Edit />
            
          </ButtonTriggerAbsolute>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <PopUpChildren>
          <HeaderContainer>
            <h3>Radio Button</h3>
            <button onClick={() => setIsDialogOpen(false)}>
              <CloseCircle variant='Outline' />
            </button>
          </HeaderContainer>
          <Content onSubmit={handleSubmit(submit)}>
            <PrimitivesBoard
              typeField='SHORTTEXT'
              label='Titulo'
              register={register("title")}
              placeholder='Insira o título do campo aqui'
              name='title'
              errors={errors.title?.message}
            />
            <PrimitivesBoard
              typeField='LONGTEXT'
              label='Descrição do campo'
              register={register("description")}
              placeholder='Insira a descrição aqui'
              name='description'
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                width: "100%",
                overflowY: "auto",
                maxHeight: "15rem",
                paddingRight: "1rem",
              }}
            >
              <p>Adicionar itens de seleção única*</p>
              {fieldsOptions.map((option, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "row", gap: "1rem", width: "100%",alignItems:"center" }}>
                  <PrimitivesBoard
                    key={index}
                    typeField='SHORTTEXT'
                    placeholder={`Opção ${index + 1}`}
                    defaultValue={option.label}
                    onChange={(e) => {
                      setValue(`options.${index}.value`, e.target.value)
                      setValue(`options.${index}.label`, e.target.value)
                    }}
                  />
                  <DefaultButton
                    type="button"
                    onClick={() => removeOption(index)}
                    backgroundColor={"gray"}
                    hover={"Gray"}
                    style={{
                      color: "#A1A1A5",
                      backgroundColor: "transparent",
                      width: "1rem",
                      height: "2.8125rem",
                    }}
                  >
                    <Trash 
                      style={{
                        minWidth: "1rem",
                        minHeight: "1rem",
                      }}
                    />
                  </DefaultButton>
                </div>
              ))}
              {errors.options && <p>{errors.options.message}</p>}
              <DefaultButton
                type="button"
                onClick={() => appendOptions({ value: "new option", label: "new option" })}
                hover={"Gray"}
                color={"black"}
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  
                }}
              >
                <AddCircle
                  style={{
                    minWidth: "1rem",
                    minHeight: "1rem",
                    color: "#7841B0",
                  }}
                />
                Adicionar mais
              </DefaultButton>
            </div>
            <PrimitivesBoard
              typeField='SWITCH'
              onChange={() => setValue("require", !watch("require"))}
              defaultValue={watch("require")}
              label='Obrigatório'
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
              <DefaultButton animationSvg={"arrowRight"} type='submit' >
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
    </Dialog.Root >
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
