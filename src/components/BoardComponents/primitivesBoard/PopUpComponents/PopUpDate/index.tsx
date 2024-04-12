import * as Dialog from "@radix-ui/react-dialog"

import { ArrowRight, Calendar, CloseCircle, Edit, TextBlock } from "iconsax-react"
import { PopUpChildren } from "../PopUpChildren"
import { ButtonTrigger, ButtonTriggerAbsolute, Content, EndButtonsContainer, HeaderContainer } from "./styles"
import { PrimitivesBoard } from "../.."
import { useEffect, useState } from "react"
import { keyframes, styled } from "@/styles"
import { DefaultButton } from "@/components/DefaultButton"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { FieldUncheckedCreateInput, FieldColumnUncheckedCreateInput, PrimitiveFields, Field } from "@/types"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const FIND_UNIQUE_PRIMITIVE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPDATE = gql`
  query findUniquePrimitiveFieldInCreateOneFieldInPOPUPDATE($type: FieldType!) {
    findUniquePrimitiveFieldsOrThrow(where: { fieldType: $type }) {
      id
      fieldType
      content
    }
  }
`

const FIND_UNIQUE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPDATE = gql`
  mutation findUniqueFieldInCreateOneFieldInPOPUPDATE($id: Int!, $args: FieldUncheckedUpdateInput!) {
    updateOneField(data: $args, where: { id: $id }) {
      id
    }
  }
`

const UPSERT_ONE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPDATE = gql`
  mutation upsertOneFieldInCreateOneFieldInPOPUPDATE(
    $id: Int!
    $create: FieldUncheckedCreateInput!
    $update: FieldUncheckedUpdateInput!
  ) {
    upsertOneField(where: { id: $id }, create: $create, update: $update) {
      id
    }
  }
`

const CREATE_ONE_FIELD_IN_POPUPDATE = gql`
  mutation createOneFieldInPOPUPDATE($args: FieldUncheckedCreateInput!) {
    createOneField(data: $args) {
      id
    }
  }
`

const CREATE_ONE_FIELD_COLUMN_IN_POPUPDATE = gql`
  mutation createOneFieldColumnInPOPUPDATE($args: FieldColumnUncheckedCreateInput!) {
    createOneFieldColumn(data: $args) {
      columnId
    }
  }
`
interface IPopUpShortTextProps {
  columnId: number
  typeField?: string
  uuid?: string
  refetch?: Function
  field?: Field
}

const SchemaData = z.object({
  title: z.string().max(50).min(1),
       description: z.string().max(100).nullable().optional(),
  require: z.coerce.boolean(),
  // date: z.string().max(100).min(1),
})

type Data = z.infer<typeof SchemaData>

interface PrimitiveField {
  findUniquePrimitiveFieldsOrThrow: PrimitiveFields
}

export function PopUpDate({ columnId, typeField, uuid, refetch, field }: IPopUpShortTextProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(SchemaData),
    defaultValues: {
      title: "Campo de data",
      description: "Descrição",
      require: false,
    },
  })

  useEffect(() => {
    if (field) {
      reset({ title: field?.name, description: field?.description, require: field?.required ?? false })
    }
  }, [field])

  const [createOneField] = useMutation(CREATE_ONE_FIELD_IN_POPUPDATE)
  const [primitiveField] = useLazyQuery<PrimitiveField>(FIND_UNIQUE_PRIMITIVE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPDATE)
  const [createOneFieldInColumn] = useMutation(CREATE_ONE_FIELD_COLUMN_IN_POPUPDATE)
  const [upsertOneField] = useMutation(UPSERT_ONE_FIELD_IN_CREATE_ONE_FIELD_IN_POPUPDATE)

  const submit = async (data: Data) => {
    const type = "DATE"
    const { data: field_ } = await primitiveField({ variables: { type } })

    const { data: upsertField } = await upsertOneField({
      variables: {
        id: field?.id ?? 0,
        create: {
          fieldValueId: field_?.findUniquePrimitiveFieldsOrThrow.id,
          fieldType: type,
          name: data.title,
          description: data.description,
          content: {},
          createdBy: uuid,
          updatedBy: uuid,
          required: data.require,
        },
        update: {
          name: { set: data.title },
          description: { set: data.description },
          content: { set: {} },
          updatedBy: { set: uuid },
          required: { set: data.require },
        },
      },
    })

    if (field) {
      if (refetch) {
        refetch()
      }
      reset()
      setIsDialogOpen(false)

      return
    }
    await createOneFieldInColumn({
      variables: {
        args: {
          fieldColumnId: upsertField.upsertOneField.id,
          columnId: columnId,
        },
      },
    })

    if (refetch) {
      refetch()
    }

    setIsDialogOpen(false)
  }
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>

        {!field ? (
          <ButtonTrigger
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            <Calendar />
            Data
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
            <h3>Texto curto</h3>
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

            <PrimitivesBoard
              typeField='SWITCH'
              onChange={() => setValue("require", !watch("require"))}
              defaultValue={watch("require")}
              label='Texto obrigatório'
            />
            {/* <PrimitivesBoard
              typeField='DATE'
              onChange={( date ) => setValue("date", date)}
        
              label='Texto obrigatório'
              description="Descrição informativa sobre o texto curto"

            /> */}

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
