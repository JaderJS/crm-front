import { Background, Container, Form, LogoContainer } from "./styles"
import Logo from "../../assets/logotipo.svg"
import Image from "next/image"
import "animate.css/animate.min.css"
import { LoginInput } from "./inputLogin"
import { Lock, Login, Unlock } from "iconsax-react"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { useForm, Controller, set } from "react-hook-form"
import EmailIcon from "../../assets/icon.svg"
import { DefaultButton } from "@/components/DefaultButton"
import { faArrowRight, faCircleArrowLeft, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled, keyframes } from "@/styles"
import Head from "next/head"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { gql, useMutation } from "@apollo/client"
import Swal from "sweetalert2"
import Router from "next/router"
import { toast } from "react-toastify"

const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

const SlideRightToLeft = keyframes({
  "0%": {
    transform: "translateX(-50%)",
  },
  "100%": {
    transform: "translateX(50)",
  },
})

const FORGOT_PASSWORD_IN_FORGOT_PASSWORD = gql`
mutation forgotPasswordInForgotPassword($email:String!){
  forgotPasswordCustom(data: {email:$email}) {
    token
    user {
      name
    }
  }
}
`

const ForgotSchema = z.object({
  email: z.string().email({ message: "Por favor né, insira um email válido" })
})

type ForgotPassword = z.infer<typeof ForgotSchema>

export default function ForgotPassword() {

  const { signIn, loginError } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgotPassword>({ resolver: zodResolver(ForgotSchema) })
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_IN_FORGOT_PASSWORD)

  const submit = async (data: ForgotPassword) => {
    const response = forgotPassword({ variables: { email: data.email } })

    toast.promise(response, {
      pending: "Consultando base de dados...",
      error: {
        render({ data }: any) {
          return (<span>Error {data?.message || "nullish"}</span>)
        }
      },
      success: "Verifique seu email para recuperar a senha"
    })

  }

  return (
    <>
      <Head>
        <title>Recuperar Senha | FWO</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='FWO - Login' />
        <meta name='author' content='v4Company Colli&Co' />
      </Head>
      <Background>
        <Container
          className='animate__animated animate__fadeInRight'
          style={{
            width: "80%",
            opacity: "1",
            borderRadius: "187px 0px 0px 187px",
            transition: "all .6s ease-in-out",
          }}
        >
          <Form
            onSubmit={handleSubmit(submit)}
            id='form'
            style={{
              opacity: "1",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <Image src={Logo} alt='Logo' width={171} height={38} priority />

            <h2>Redefinir senha</h2>
            <LoginInput
              input={{
                id: "email",
                type: "text",
                placeholder: "Seu e-mail",
                ...register("email"),
                autoComplete: "on",
                style: { color: "#9E9E9E" },
              }}
              focusColor={"red"}
              hover={"red"}
              icon={<Image src={EmailIcon} alt='Email' width={23} height={26} priority />}
              style={{ marginTop: "3rem" }}
            />
            {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}

            <DefaultButton
              disabled={!isValid}
              type='submit'
              style={{
                marginTop: "2rem",
                width: "32.0625rem",
                height: "4.9375rem",
                borderRadius: "10px",
                gap: "1rem",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              }}
              backgroundColor={"gradientFwo"}
            >

              {loading ? "" : "Redefinir senha"}
              {loading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin={loading}
                  style={{
                    animation: loading ? `${rotate} 2s linear infinite` : "none",
                  }}
                  width={20}
                  height={20}
                />
              ) : (
                <Login size='2.5rem' color='#ffffff5d' />
              )}
            </DefaultButton>

            <a href='/Login' style={{ color: "#9E9E9E", marginTop: "2rem" }}>
              Voltar para o login
            </a>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          </Form>
        </Container>
      </Background>
    </>
  )
}
