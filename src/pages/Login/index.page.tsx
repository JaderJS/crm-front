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
import router from "next/router"
import logored from "../../assets/LOGO (1).svg"
import LogoAcesa from "../../assets/Camada_1.svg"
import Link from "next/link"

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

type LoginFormInputs = {
  email: string
  password: string
  remember: boolean
}
export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [slideLeft, setSlideLeft] = useState(false)
  const [loading, setLoading] = useState(false)
  function ToggleChangeInputPassword() {
    const inputPassword = document.getElementById("password")
    if (inputPassword?.getAttribute("type") === "password") {
      inputPassword.setAttribute("type", "text")
      setIsPasswordVisible(true)
    } else {
      inputPassword?.setAttribute("type", "password")
      setIsPasswordVisible(false)
    }
  }

  const { signIn, loginError } = useContext(AuthContext)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  async function handleSignIn(data: LoginFormInputs) {
    setLoading(true)
    await signIn({ email: data.email, password: data.password, remember: data.remember })
    setLoading(false)
  }
  const onSubmit = (data: LoginFormInputs) => handleSignIn(data)

  useEffect(() => {
    const { "fwo.token": token } = parseCookies()
    if (token) {
      // Adiciona a classe para a animação
      setSlideLeft(true)
      // Redireciona após 600ms
      setTimeout(() => {
        router.push("/Perfil")
      }, 600)
    }
  }, [handleSignIn])
  const [logoHovered, setLogoHovered] = useState(false)

  function GoToMindForgePage() {
    setSlideLeft(true)
    setTimeout(() => {
      router.push("/LoginMindForge")
    }, 600)
  }
  function GoToCadastro() {
    setSlideLeft(true)
    setTimeout(() => {
      router.push("/Cadastro")
    }, 600)
  }

  return (
    <>
      <Head>
        <title>
          FWO: Framework Operacional para Gestão de Projetos,processos, pessoas e tarefas
        </title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='FWO, Framework Operacional para Gestão de Projetos,processos, pessoas e tarefas' />
        <meta name='author' content='v4Company Colli&Co' />
        <meta name='keywords' content='FWO, login, mindforge, colli&co, v4company' />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />        
      </Head>
      <Background>
        <Container
          className='animate__animated animate__fadeInRight'
          style={{
            width: slideLeft ? "100%" : "80%",
            opacity: slideLeft ? "0" : "1",
            borderRadius: slideLeft ? "0px" : "187px 0px 0px 187px",
            transition: "all .6s ease-in-out",
          }}
        >
          <Form
            onSubmit={handleSubmit(onSubmit)}
            id='form'
            style={{
              opacity: slideLeft ? "0" : "1",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <Image src={Logo} alt='Logo' width={171} height={38} priority />

            <h2>Olá! Seja bem-vindo</h2>
            <LoginInput
              input={{
                id: "email",
                type: "text",
                placeholder: "Seu e-mail",
                ...register("email", { required: true }),
                autoComplete: "on",
                style: { color: "#9E9E9E" },
              }}
              focusColor={"red"}
              hover={"red"}
              icon={<Image src={EmailIcon} alt='Email' width={23} height={26} priority />}
              style={{ marginTop: "3rem" }}
            />
            {errors.email && <p style={{ color: "red" }}>Email é obrigatório</p>}
            <LoginInput
              input={{
                id: "password",
                type: "password",
                placeholder: "Digite sua senha",
                ...register("password", { required: true }),
                autoComplete: "on",
              }}
              focusColor={"red"}
              hover={"red"}
              icon={
                isPasswordVisible ? (
                  <Unlock
                    size='26'
                    color='#DD2424'
                    onClick={() => {
                      ToggleChangeInputPassword()
                    }}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Lock
                    size='26'
                    color='#DD2424'
                    onClick={() => {
                      ToggleChangeInputPassword()
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )
              }
              style={{ marginTop: "2rem" }}
            />
            {errors.password && <p style={{ color: "red" }}>Senha é obrigatória</p>}
            <div
              style={{
                display: "flex",
                width: "98%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <Controller
                  name='remember'
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <CustomCheckbox
                      name='remember'
                      checked={field.value}
                      onChange={() => {
                        field.onChange(!field.value)
                      }}
                      color='#DD2424'
                    />
                  )}
                />

                <label htmlFor='remember'>Lembrar-me</label>
              </div>
              <Link
                href={"/ForgotPassword"}
                style={{
                  all: "unset",
                  color: "#9E9E9E",
                  cursor: "pointer",
                }}
              >
                Esqueci minha senha
              </Link>
            </div>
            <DefaultButton
              type='submit'
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
              {loading ? "" : " Fazer login"}
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
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "2rem",
                gap: "1rem",
              }}
            >
              <hr style={{ width: "100%", marginTop: ".2rem" }} />
              <p> ou </p>
              <hr style={{ width: "100%", marginTop: ".2rem" }} />
            </div>
            <div>
              <LogoContainer type='button' onClick={() => GoToMindForgePage()}>
                <Image
                  src={logored}
                  alt='Logo'
                  width={136}
                  height={42}
                  quality={99}
                  priority
                  onMouseEnter={() => setLogoHovered(true)}
                  onMouseLeave={() => setLogoHovered(false)}
                  onClick={() => GoToMindForgePage()}
                />
              </LogoContainer>
            </div>
            <span
              style={{
                marginTop: ".5rem",
              }}
            >
              Não tem uma conta? <a onClick={() => GoToCadastro()}> Cadastre-se </a>
            </span>
          </Form>
        </Container>
      </Background>
    </>
  )
}
