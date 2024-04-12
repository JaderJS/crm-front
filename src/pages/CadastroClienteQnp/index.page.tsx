import { gql, useMutation } from "@apollo/client"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Controller, useForm } from "react-hook-form"
import Router from "next/router"
import { useEffect, useState } from "react"
import { Utils } from "@/utils/utils"
import { Primitives } from "@/components/Primitives"
import CustomCheckbox from "@/components/CustomCheckbox"
import { DefaultButton } from "@/components/DefaultButton"
import axios from "axios"
import Control from "react-select/dist/declarations/src/components/Control"

const CLIENT = gql`
  mutation client(
    $name: String!
    $email: String!
    $password: String!
    $cnpj: String!
    $type: String!
    $sendEmail: Boolean!
  ) {
    registerClientCustom(
      data: { name: $name, email: $email, password: $password, cnpj: $cnpj, type: $type, sendEmail: $sendEmail }
    ) {
      message
      pathUrl
    }
  }
`

interface registerClient {
  name: string
  email: string
  password: string
  cnpj: string
  select: any
  sendEmail: boolean
}

const utils = new Utils()

export default function CadastroClienteQnp() {
  const [registerClient] = useMutation(CLIENT)

  const [link, setLink] = useState("")
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<registerClient>({
    defaultValues: {
      name: "",
      email: "",
      password: "v4",
      cnpj: "",
      select: "",
      sendEmail: false,
    },
  })


  const onSubmit = async (data: registerClient) => {
    console.log(data)
    const MySwal = withReactContent(Swal)
    if (!data.select) {
      MySwal.fire({
        icon: "error",
        title: "Erro ao cadastrar usuário!",
        text: "Selecione o tipo de QNP",
      })
      return
    }
    try {
      const { data: response } = await registerClient({
        variables: {
          name: data.name,
          email: data.email,
          password: data.password,
          cnpj: data.cnpj,
          sendEmail: data.sendEmail,
          type: data.select,
        },
      })

      // Encurta o link gerado usando o TinyURL
      const tinyUrlResponse = await axios.get(
        `https://tinyurl.com/api-create.php?url=${response.registerClientCustom.pathUrl}`,
      )
      const shortenedLink = tinyUrlResponse.data

      setLink(shortenedLink)

      Swal.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        text: data.sendEmail ? `Link enviado para o email ${shortenedLink}` : `Link gerado: ${shortenedLink}`,
      })
    } catch (error: any) {
      MySwal.fire({
        icon: "error",
        title: "Erro ao cadastrar usuário!",
        text: error.message,
      })
    }
  }



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "1rem",
        fontFamily: "Dm Sans",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "60vw",
          height: "auto",
          gap: ".5rem",
          backgroundColor: "#EEE",
          padding: "1rem",
          borderRadius: "1.875rem",
        }}
      >
        <h2>Olá querido(a) CS essa é uma pagina temporária</h2>
        selecione o tipo de QNP
        <Controller
          control={control}
          name='select'
          rules={{ required: "Selecione o tipo de QNP" }}
          render={({ field }) => (
            <Primitives
              {...field}
              componentName='SelectFWOWhite'
              selectPropsWhite={{
                placeholder: "Selecione o tipo de QNP",
                options: [
                  { value: "QnpIs", label: "InsideSales" },
                  { value: "QnpEcommerce", label: "E-Commerce" },
                ],
                onChange: (selectedOption) => {
                  setValue("select", selectedOption.value)
                },
                optionHeight: "4rem",
                menuWidth: "100%",
                optionMaxWidth: "100%",
                // menuHeight: "auto",
              }}
            />
          )}
        />
        {errors && errors.select && (
          <p
            style={{
              color: "red",
            }}
          >
            Selecione o tipo de QNP
          </p>
        )}
        <Primitives
          componentName='SmallText'
          smallTextProps={{
            input: {
              ...register("name", { required: "Preencha o campo de nome" }),
              placeholder: "Nome de quem é o responsável",
              autoComplete: "on",
              name: "name",
              onChange: (event: any) => {
                setValue("name", event.target.value)
              },
            },
          }}
        />
        {errors && errors.name && (
          <p
            style={{
              color: "red",
            }}
          >
            {errors.name.message}
          </p>
        )}
        {/* <input
          type='text'
          {...register("email", { required: "Preencha o campo de email" })}
          name='email'
          placeholder='Email'
        /> */}
        <Primitives
          componentName='SmallText'
          smallTextProps={{
            input: {
              ...register("email", { required: "Preencha o campo de email" }),
              placeholder: "Email",
              autoComplete: "on",
              name: "email",
              onChange: (event: any) => {
                setValue("email", event.target.value)
              },
            },
          }}
        />
        {errors && errors.email && (
          <p
            style={{
              color: "red",
            }}
          >
            {errors.email.message}
          </p>
        )}
        <input
          type='text'
          {...register("password", { required: "Preencha o campo de senha" })}
          name='password'
          placeholder='Senha'
          value='v4'
          hidden
        />
        {errors && errors.password && <p>{errors.password.message}</p>}
        {/* <input
          type='text'
          {...register("cnpj", { required: "Preencha o campo do cnpj" })}
          name='cnpj'
          placeholder='CNPJ'
        /> */}
        <Primitives
          componentName='SmallText'
          smallTextProps={{
            input: {
              ...register("cnpj", { required: "Preencha o campo do cnpj" }),
              placeholder: "CNPJ",
              autoComplete: "on",
              name: "cnpj",
              onChange: (event: any) => {
                setValue("cnpj", event.target.value)
              },
            },
          }}
        />
        {errors && errors.cnpj && <p>{errors.cnpj.message}</p>}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <label
            style={{
              fontSize: ".75rem",
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => {
              setValue("sendEmail", !watch("sendEmail"))
            }}
          >
            Enviar email para o cliente?
          </label>
          {/* <input type='checkbox' {...register("sendEmail")} /> */}
          <CustomCheckbox
            color='#7841B0'
            checked={watch("sendEmail")}
            onChange={() => setValue("sendEmail", !watch("sendEmail"))}
            name={"sendEmail"}
          />
          {errors && errors.sendEmail && <p>{errors.sendEmail.message}</p>}
        </div>
        <DefaultButton onClick={handleSubmit(onSubmit)}>
          <p>Cadastrar</p>
        </DefaultButton>
        {link && (
          <p
            style={{
              maxWidth: "40rem",
              color: "#000000",
              wordBreak: "break-all",
            }}
          >
            {link}
          </p>
        )}
      </form>
    </div>
  )
}
