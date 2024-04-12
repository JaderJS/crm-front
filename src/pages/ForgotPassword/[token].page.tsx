import { Background, Container, Form, LogoContainer } from "./styles"
import Logo from "../../assets/logotipo.svg"
import Image from "next/image"
import "animate.css/animate.min.css"
import { LoginInput } from "./inputLogin"
import { Lock, Login, Unlock } from "iconsax-react"
import { useContext, useEffect, useState } from "react"
import CustomCheckbox from "@/components/CustomCheckbox"
import { AuthContext } from "@/contexts/AuthContext"
import { useForm, Controller, set } from "react-hook-form"
import EmailIcon from "../../assets/icon.svg"
import { DefaultButton } from "@/components/DefaultButton"
import { ColorRing } from "react-loader-spinner"
import { faArrowRight, faCircleArrowLeft, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled, keyframes } from "@/styles"
import Head from "next/head"
import { setCookie, parseCookies } from "nookies"
import Router from "next/router"
import logored from "../../assets/LOGO (1).svg"
import LogoAcesa from "../../assets/Camada_1.svg"
import Link from "next/link"
import { GetServerSideProps } from "next"
import Swal from "sweetalert2"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { gql, useMutation } from "@apollo/client"


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  return {
    props: {
      params,
    },
  }

}


const UPDATE_ONE_USER_CUSTOM_IN_FORGOT_PASSWORD = gql`
mutation updateOneUserCustomInForgotPassword($password:String!, $token:String!) {
  updateUserPasswordCustom(data: {password:$password, token:$token}) {
    token
    user {
      name
    }
  }
}
`


const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})


export default function ForgotPassword({ params }: { params: { token: string } }) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [updateOneUser, { loading }] = useMutation(UPDATE_ONE_USER_CUSTOM_IN_FORGOT_PASSWORD)

  const ForgotPasswordSchema = z.object({
    password: z.string().min(8, { message: "Sua senha deve ter no mínimo 8 caracteres" }),
    confirmPassword: z.string().min(8, { message: "Sua senha deve ter no mínimo 8 caracteres" })
  }).refine((args) => args.password === args.confirmPassword, { message: "Verifique suas senhas", path: ["confirmPassword"] })

  type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>

  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<ForgotPasswordSchema>({ resolver: zodResolver(ForgotPasswordSchema), mode: "onChange" })


  async function submit(data: ForgotPasswordSchema) {

    updateOneUser({
      variables: {
        password: data.password,
        token: params.token
      }
    }).then(() => {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).fire({ title: "Sua senha foi alterada com sucesso!", icon: "success" }).then(() => {
        Router.push("/Login")
      })
    
    }).catch((error) => {
      console.log(error)
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).fire({ title: "Erro ao alterar sua senha", icon: "error" })

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
                type: isPasswordVisible ? "text" : "password",
                placeholder: "Digite sua senha",
                ...register("password"),
                autoComplete: "on",
              }}
              focusColor={"red"}
              hover={"red"}
              icon={
                isPasswordVisible ? (
                  <Unlock
                    size='26'
                    color='#DD2424'
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Lock
                    size='26'
                    color='#DD2424'
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  />
                )
              }
              style={{ marginTop: "2rem" }}
            />
            <LoginInput
              input={{
                type: isPasswordVisible ? "text" : "password",
                placeholder: "Confirme sua senha",
                ...register("confirmPassword"),
                autoComplete: "on",
              }}
              focusColor={"red"}
              hover={"red"}
              icon={
                isPasswordVisible ? (
                  <Unlock
                    size='26'
                    color='#DD2424'
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Lock
                    size='26'
                    color='#DD2424'
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  />
                )
              }
              style={{ marginTop: "2rem" }}
            />
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>}


            <DefaultButton
              type='submit'
              disabled={!isValid}
              style={{
                marginTop: "2rem",
                width: "32.0625rem",
                height: "4.9375rem",
                borderRadius: "10px",
                gap: "1rem",
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
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
          </Form>
        </Container>
      </Background>
    </>
  )
}
