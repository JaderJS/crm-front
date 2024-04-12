import { useState, useEffect } from "react"
import { UseFieldArrayAppend, UseFormRegister, UseFormSetValue, UseFormWatch, useFieldArray, useForm, Controller } from "react-hook-form"
import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"
import { ImageAndNameContainer, Infos, ClientInfoContainer, Container, InfosStakeholder, ButtonTrigger, ButtonTriggerAbsolute, HeaderContainer, Content, EndButtonsContainer } from "./styles"
import router, { useRouter } from "next/router"
import { gql, useQuery, useMutation } from "@apollo/client"
import { SmallText } from "@/pages/CadastroQnp/Components/SmallText"
import { DefaultButton } from "@/components/DefaultButton"
import { GetServerSideProps } from "next"
import { Project } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, CloseCircle, Edit, TextBlock, Trash } from "iconsax-react"
import { PopUpChildren } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpChildren"
import { keyframes, styled } from "@/styles"
import { UploadProfile, api } from "@/lib/axios"
import { ErrorMessage } from "@hookform/error-message"



const FIND_ONE_PROJECT = gql`
  query FindOneProject($id: Int!) {
    project(where: { id: $id }) {
      id
      cnpj
      address
      city
      state
      initialDateContract
      name
      fantasyName
      content
      profileUrl
    }
  }
`

const UPDATE_ONE_PROJECT_IN_EDIT_PROJECT = gql`
  mutation UpdateOneProject($id: Int!, $args: ProjectUncheckedUpdateInput!) {
    updateOneProject(where: { id: $id }, data: $args) {
      id
      profileUrl
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  return {
    props: {
      params,
    },
  }
}

interface ProjectData {
  project: Project
}

const InfoSchema = z.object({
  name: z.string().min(1),
  fantasyName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().length(2),
  cnpj: z.string().transform((value) => {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5")
  }),
  avatarUrl: z.string().default("https://"),
  initialDateContract: z.coerce.date(),
  address: z.string(),
  stakeholder: z.array(z.object({
    stakeHolderName: z.string().min(1),
    stakeHolderEmail: z.string(),
    stakeHolderFunction: z.string(),
    stakeHolderBirthDate: z.string(),
    stakeHolderPhoneNumber: z.string()
  }))
})

type InfoData = z.infer<typeof InfoSchema>

export default function EditarProjeto({ params }: { params: { id: string } }) {
  const {
    data: project,
    loading: loadingClient,
    refetch: refetchProject,
  } = useQuery<ProjectData>(FIND_ONE_PROJECT, {
    variables: { id: Number(params.id) },
    skip: params.id === undefined,
  })
  const [updateOneProject] = useMutation(UPDATE_ONE_PROJECT_IN_EDIT_PROJECT)


  const { control, register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<InfoData>({ resolver: zodResolver(InfoSchema) })

  useEffect(() => {
    reset({
      name: project?.project.name,
      fantasyName: project?.project.fantasyName,
      city: project?.project.city,
      state: project?.project.state,
      address: project?.project.address,
      cnpj: project?.project.cnpj,
      initialDateContract: project?.project.initialDateContract,
      stakeholder: project?.project.content?.stakeholder,
      avatarUrl: project?.project.profileUrl
    })
  }, [project])

  const onSubmit = async (data: InfoData) => {

    const content = project?.project.content
    if (!content) {
      return
    }
    updateOneProject({
      variables: {
        id: Number(params.id), args: {
          name: { set: data.name },
          fantasyName: { set: data.fantasyName },
          state: { set: data.state },
          city: { set: data.city },
          address: { set: data.address },
          cnpj: { set: data.cnpj },
          initialDateContract: { set: data.initialDateContract },
          profileUrl: { set: data.avatarUrl },
          content: { ...content, stakeholder: data.stakeholder }
        }
      }
    }).catch(console.error).then((data) => console.log(data))
  }


  return (
    <Container>
      <ClientInfoContainer onSubmit={handleSubmit(onSubmit)}>
        <ImageAndNameContainer>
          <EditImageComponent setValue={setValue} watch={watch} />

          <h3>Dados da empresa</h3>
        </ImageAndNameContainer>
        <Infos>
          <h4>Nome Fantasia:</h4>
          <input {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </Infos>
        <Infos>
          <h4>Razão social:</h4>
          <input {...register("fantasyName")} />
          {errors.fantasyName && <span>{errors.fantasyName.message}</span>}
        </Infos>
        <Infos>
          <h4>CNPJ:</h4>
          <input {...register("cnpj")} />

          {errors.cnpj && <span>{errors.cnpj.message}</span>}
        </Infos>
        <Infos>
          <h4>Data inauguração:</h4>
          <Controller
            control={control}
            name="initialDateContract"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <input type="date" onChange={onChange} ref={ref} value={GetValueDateFormControl(value)} />
            )}
          />
          {errors.initialDateContract && <span>{errors.initialDateContract.message}</span>}
        </Infos>
        <Infos>
          <h4>Endereço:</h4>
          <input {...register("address")} />
          {errors.address && <span>{errors.address.message}</span>}
        </Infos>

        <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
          <Infos>
            <h4>Cidade</h4>
            <input {...register("city")} />
            {errors.city && <span>{errors.city.message}</span>}

          </Infos>
          <Infos>
            <h4>UF:</h4>
            <input {...register("state")} />
            {errors.state && <span>{errors.state.message}</span>}

          </Infos>
        </div>

        <EditStakeHolder control={control} register={register} errors={errors} />

        <DefaultButton
          type='submit'
          onClick={handleSubmit(onSubmit)}
          backgroundColor={"purple"}
          style={{
            height: "2.3rem",
          }}
        >
          Salvar
        </DefaultButton>
        <ErrorMessage
          errors={errors}
          name="multipleErrorInput"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
      </ClientInfoContainer>
    </Container>
  )
}

const GetValueDateFormControl = (value: Date) => {
  return value?.toString().substring(0, 10)
};



const EditStakeHolder = ({ control, register, errors }: { control: any, register: UseFormRegister<InfoData>, errors: any }) => {
  const { fields: fieldsStakeholder, append: appendStakeholder, remove: removeStakeholder } = useFieldArray({ name: "stakeholder", control })
  useEffect(() => { console.log(errors) }, [errors])
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      <h3>Dados Stakeholders :</h3>
      {fieldsStakeholder?.map((data: any, index: number) => (
        <InfosStakeholder key={index}>
          <input
            type='text'
            {...register(`stakeholder.${index}.stakeHolderName`)}
            placeholder={"Nome do Stakeholder"}
          />
          <input
            type='text'
            {...register(`stakeholder.${index}.stakeHolderEmail`)}
            placeholder={"Email do Stakeholder"}
          />
          <input
            type='text'
            {...register(`stakeholder.${index}.stakeHolderFunction`)}
            placeholder={"Função do Stakeholder"}
          />
          <input
            type='text'
            {...register(`stakeholder.${index}.stakeHolderBirthDate`)}
            placeholder={"Data de nascimento do Stakeholder"}
          />
          <input
            type='text'
            {...register(`stakeholder.${index}.stakeHolderPhoneNumber`)}
            placeholder={"Telefone do Stakeholder"}
          />
          <DefaultButton
            onClick={() => removeStakeholder(index)}
            style={{
              height: "2rem",
              minWidth: "1rem",
            }}
            backgroundColor={"red"}
          >
            <Trash />
          </DefaultButton>
          {/* {errors.stakeholder && <span>{errors.stakeholder?.map((item: any) => item?.stakeHolderName?.message)}</span>} */}
          <br />
        </InfosStakeholder>
      ))}

      <DefaultButton
        onClick={() => appendStakeholder({})}
        style={{
          height: "2rem",
          width: "100%",
        }}
      >
        <p>Adicionar Stakeholder</p>
      </DefaultButton>
    </div>
  )
}

const EditImageComponent = ({ setValue, watch }: { setValue: UseFormSetValue<InfoData>, watch: UseFormWatch<InfoData> }) => {

  const [show, setShow] = useState<boolean>(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {

      const file = event.target.files?.[0]
      if (!file) {
        return
      }
      const formData = new FormData()
      formData.append("file", file)
      const response: UploadProfile = await api.post("upload/profile", formData)
      setValue("avatarUrl", response.data.path)
    } catch (error) {
      console.error(error)
    }

  }


  return (
    <Dialog.Root open={show} onOpenChange={setShow}>
      <Dialog.Trigger asChild>

        <Image
          src={watch("avatarUrl") ?? "https://comoequetala.com.br/images/com_vagasejobs/empresa/marca/95-fd774b66ded35144e6fc1cddfb13902c.png"}
          alt='img'
          width={100}
          height={100}
          onClick={() => { setShow(true) }}
        />

      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <PopUpChildren>
          <HeaderContainer>
            <h3>Alterar a imagem do perfil do projeto</h3>
            <button onClick={() => setShow(false)}>
              <CloseCircle variant='Outline' />
            </button>
          </HeaderContainer>
          <Content >

            <input type="file" onChange={(event) => handleFileChange(event)} />

            <EndButtonsContainer>
              <DefaultButton
                onClick={() => setShow(false)}
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
