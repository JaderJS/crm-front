import * as Dialog from "@radix-ui/react-dialog"

import { ArrowRight, CloseCircle, CloudConnection, Edit, FolderConnection, TextBlock } from "iconsax-react"
import { PopUpChildren } from "../PopUpChildren"
import { ButtonTrigger, ButtonTriggerAbsolute, Content, EndButtonsContainer, HeaderContainer } from "./styles"
import { PrimitivesBoard } from "../.."
import { useEffect, useState } from "react"
import { keyframes, styled } from "@/styles"
import { DefaultButton } from "@/components/DefaultButton"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { FieldUncheckedCreateInput, FieldColumnUncheckedCreateInput, PrimitiveFields, Field, Board } from "@/types"
import { unknown, z } from "zod"
import { useForm } from "react-hook-form"
import { PrimitivesSelect } from "../../components/PrimitivesSelect"
import { zodResolver } from "@hookform/resolvers/zod"

const SchemaData = z.object({
  boardId: z.string(),
  title: z.string().max(50).min(1),
})

type Data = z.infer<typeof SchemaData>

const FIND_UNIQUE_PRIMITIVE_FIELD_IN_POPUPCONNECTIONBOARD = gql`
  query findUniquePrimitiveFieldInPopUpConnectionBoard($type: FieldType!) {
    findUniquePrimitiveFieldsOrThrow(where: { fieldType: $type }) {
      id
      fieldType
      content
    }
  }
`

const FIND_MANY_BOARDS_IN_POPUPCONNECTIONBOARD = gql`
  query findManyBoardsInPopUpConnectionBoar {
    boards {
      id
      title
    }
  }
`

const UPSERT_ONE_FIELD_IN_POPUPCONNECTIONBOARD = gql`
  mutation upsertOneFiledInPopUpConnectionBoard(
    $id: Int!
    $create: FieldUncheckedCreateInput!
    $update: FieldUncheckedUpdateInput!
  ) {
    upsertOneField(where: { id: $id }, create: $create, update: $update) {
      id
    }
  }
`

interface PrimitiveField {
  findUniquePrimitiveFieldsOrThrow: PrimitiveFields
}

interface BoardsData {
  boards: Board[]
}

interface IPopUpShortTextProps {
  columnId: number
  typeField?: string
  field?: Field
  uuid?: string
  refetch?: Function
}

export function PopUpConnectionBoard({ columnId, typeField, field, uuid, refetch }: IPopUpShortTextProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: boards } = useQuery<BoardsData>(FIND_MANY_BOARDS_IN_POPUPCONNECTIONBOARD)
  const [primitiveField] = useLazyQuery<PrimitiveField>(FIND_UNIQUE_PRIMITIVE_FIELD_IN_POPUPCONNECTIONBOARD)
  const [upsertOneField] = useMutation(UPSERT_ONE_FIELD_IN_POPUPCONNECTIONBOARD)

  // const rawDefaultOptionsBoards = boards?.boards?.map((board) => ({ value: board.id, label: board.title }))

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
      title: "Campo de conexão",
    },
  })

  useEffect(() => {
    reset({ title: field?.name ?? "Campo de conexão", boardId: field?.content?.boardId })
  }, [field])

  console.log(errors)

  const submit = async (data: Data) => {
    const type = "CONNECTIONBOARD"
    const { data: field_ } = await primitiveField({ variables: { type } })

    upsertOneField({
      variables: {
        id: field?.id ?? 0,
        create: {
          fieldValueId: field_?.findUniquePrimitiveFieldsOrThrow.id,
          fieldType: type,
          name: data.title,
          description: "",
          content: {
            boardId: data.boardId,
          },
          createdBy: uuid,
          updatedBy: uuid,
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
          description: { set: "" },
          content: { boardId: data.boardId },
          updatedBy: { set: uuid },
          // required: { set: data.require ?? false },
        },
      },
    }).then(() => {
      refetch?.()
      setIsDialogOpen(false)
      reset()
    })
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
            <FolderConnection /> Conexão
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
              register={register("title", { required: true })}
              placeholder='Insira o título do campo aqui'
              name='title'
            />

            <PrimitivesBoard
              typeField='SELECT'
              label='Selecione o processo'
              description='Escolha o processo ao qual deseja conectar'
              options={boards?.boards?.map((board) => ({ value: board.id, label: board.title }))}
              placeholder='Selecione o processo'
              onChange={(value: { value: number; label: string }) => setValue("boardId", value.value.toString())}
              defaultValue={field?.content?.boardId}
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
              <DefaultButton animationSvg={"arrowRight"} type='submit'
              >
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
