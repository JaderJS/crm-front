import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { PrimitiveImage } from "@/components/BoardComponents/primitivesBoard/components/PrimitiveImage"
import { PrimitivesCnpj } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesCnpj"
import PrimitivesDateInput from "@/components/BoardComponents/primitivesBoard/components/PrimitivesDateInput"
import { PrimitivesSmallText } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesSmallText"
import { DefaultButton } from "@/components/DefaultButton"
import { Primitives } from "@/components/Primitives"
import { UserContext } from "@/contexts/UserContext"
import { BaseMutationOptions, gql, useMutation } from "@apollo/client"
import Router from "next/router"
import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface Stakeholder {
  stakeholderName: string
  stakeholderEmail: string
  stakeHolderFunction: string
  stakeHolderBirthDate: Date
  stakeHolderPhoneNumber: string
}

interface NewProject {
  cnpj: string
  city: string
  fantasyName: string
  initialDateContract: Date
  state: string
  address: string
  name: string
  content: any
  pipefyId?: number
}

const CREATE_NEW_PROJECT_IN_ADM_PAGE = gql`
  mutation createNewProject($args: ReceivedClientUncheckedCreateInput!) {
    createOneReceivedClient(data: $args) {
      id
      
    }
  }
`

export default function NewProject() {
  const [createNewProject] = useMutation(CREATE_NEW_PROJECT_IN_ADM_PAGE)
  const {userAllowed,uuid,name} = useContext(UserContext)
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
    
  } = useForm<NewProject>()
  const [disabled, setDisabled] = useState(false)
 

  const onSubmit = async (data: NewProject) => {
      setDisabled(true)
    try {
        const response = await createNewProject({
          variables: {
            args: {...data,content:data}
          },
        }).then((response) => {
          toast.success("Projeto cadastrado com sucesso")
          setTimeout(() => {
              Router.reload()
          }, 2000);
        })

    } catch (error) {
      console.error(error)
        toast.error("Erro ao cadastrar projeto")
        setDisabled(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        gap: "1rem",
        overflow: "auto",
      }}
    >
      <h1>NewProject</h1>
      <p>
        Ola <b>{name}!</b> Preencha os campos abaixo para cadastrar um novo projeto <br />
        apos o cadastro o projeto estará Disponivel para ser atribuido 
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#EEE",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          borderRadius: "1.875rem",
          gap: "1rem",
        }}
      >
               <Primitives
          componentName='SmallText'
          smallTextProps={{
            input: {
              ...register("name", { required: "Preencha o campo de name" }),
              placeholder: "Nome do projeto",
              autoComplete: "on",
              name: "name",
              style: {
                width: "100%",
                border: errors.name ? "1px solid red" : "1px solid #d9d9d9",
              },
            },
          }}
        />
            {errors && errors.name && (
          <p
            style={{
              color: "red",
              fontSize: ".65rem",
              marginBottom: "1rem",
            }}
          >
            {errors.name.message}
          </p>
        )}
        <Controller
          control={control}
          name='pipefyId'
          render={({ field }) => (
            <PrimitivesBoard
              {...field}
              typeField={"NUMBER"}
              description="Pipefy ID"
              placeholder="Pipefy ID"
              onChange={(e) => {
                setValue("pipefyId", Number(e.target.value))
              }}
            />
          )}
        />
    

        <Controller
          control={control}
          name='cnpj'
          rules={{ required: "Preencha o campo de cnpj" }}
          render={({ field }) => (
            <PrimitivesCnpj
              {...field}
              description="CNPJ"
              onChange={(maskedValue: string ) => {
                setValue("cnpj", maskedValue)
              }}
            />
          )}
        />
   
        {errors && errors.cnpj && (
          <p
            style={{
              color: "red",
              fontSize: ".65rem",
              marginBottom: "1rem",
            }}
          >
            {errors.cnpj.message}
          </p>
        )}
        <br/>
        <Controller
          control={control}
          name='initialDateContract'
          rules={{ required: "Preencha o campo de initialDateContract" }}

          render={({ field }) => (
            <PrimitivesDateInput
              {...field}
              description="Assinatura do contrato"
              onChange={(date:Date) => {
                setValue("initialDateContract", date)
                console.log(date)
              }
              }
            />
          )}
        />
        {errors && errors.initialDateContract && (
          <p
            style={{
              color: "red",
              fontSize: ".65rem",
              marginBottom: "1rem",
            }}
          >
            {errors.initialDateContract.message}
          </p>
        )}
        <br/>
        
        <Primitives
          componentName='SmallText'
          smallTextProps={{
            input: {
              ...register("fantasyName", { required: "Preencha o campo de fantasyName" }),
              placeholder: "fantasyName",
              autoComplete: "on",
              name: "fantasyName",
              style: {
                width: "100%",
                border: errors.fantasyName ? "1px solid red" : "1px solid #d9d9d9",
              },
            },
          }}
        />
        {errors && errors.fantasyName && (
          <p
            style={{
              color: "red",
              fontSize: ".65rem",
              marginBottom: "1rem",
            }}
          >
            {errors.fantasyName.message}
          </p>
        )}
        <Primitives
          componentName='SmallText'
          smallTextProps={{
            input: {
              ...register("city", { required: "Preencha o campo de city" }),
              placeholder: "city",
              autoComplete: "on",
              name: "city",
              style: {
                width: "100%",
                border: errors.city ? "1px solid red" : "1px solid #d9d9d9",
              },
            },
          }}
        />
        {errors && errors.city && (
          <p
            style={{
              color: "red",
              fontSize: ".65rem",
              marginBottom: "1rem",
            }}
          >
            {errors.city.message}
          </p>
        )}

        <Primitives
          componentName='SmallText'
          smallTextProps={{
            input: {
              ...register("state", { required: "Preencha o campo de state" }),
              placeholder: "state",
              autoComplete: "on",
              name: "state",
              style: {
                width: "100%",
                border: errors.state ? "1px solid red" : "1px solid #d9d9d9",
              },
            },
          }}
        />
        {errors && errors.state && (
          <p
            style={{
              color: "red",
              fontSize: ".65rem",
              marginBottom: "1rem",
            }}
          >
            {errors.state.message}
          </p>
        )}

        <Primitives
          componentName='SmallText'
          smallTextProps={{
            input: {
              ...register("address", { required: "Preencha o campo de address" }),
              placeholder: "address",
              autoComplete: "on",
              name: "address",
              style: {
                width: "100%",
                border: errors.address ? "1px solid red" : "1px solid #d9d9d9",
              },
            },
          }}
        />
        {errors && errors.address && (
          <p
            style={{
              color: "red",
              fontSize: ".65rem",
              marginBottom: "1rem",
            }}
          >
            {errors.address.message}
          </p>
        )}

  

        <DefaultButton onClick={handleSubmit(onSubmit)}
          disabled={disabled}
        >
          <p>Cadastrar</p>
        </DefaultButton>
      </form>
    </div>
  )
}
