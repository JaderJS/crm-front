import { Background, Container, Form, LogoContainer } from "./styles";
import Logo from "../../assets/logotipo.svg";
import Image from "next/image";
import "animate.css/animate.min.css";
import { LoginInput } from "../Login/inputLogin";
import { Lock, Login, Unlock } from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import CustomCheckbox from "@/components/CustomCheckbox";
import { AuthContext } from "@/contexts/AuthContext";
import { useForm, Controller, set } from "react-hook-form";
import EmailIcon from "../../assets/icon.svg";
import { DefaultButton } from "@/components/DefaultButton";
import { ColorRing } from "react-loader-spinner";
import {
	faArrowRight,
	faCircleArrowLeft,
	faCircleArrowRight,
	faEnvelope,
	faLock,
	faLockOpen,
	faSpinner,
	faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled, keyframes } from "@/styles";
import Head from "next/head";
import { setCookie, parseCookies } from "nookies";
import router from "next/router";
import logored from "../../assets/LOGO (1).svg";
import LogoAcesa from "../../assets/Camada_1.svg";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { api } from "@/lib/axios";
const rotate = keyframes({
	"0%": {
		transform: "rotate(0deg)",
	},
	"100%": {
		transform: "rotate(360deg)",
	},
});

const SlideRightToLeft = keyframes({
	"0%": {
		transform: "translateX(-50%)",
	},
	"100%": {
		transform: "translateX(50)",
	},
});

type LoginFormInputs = {
  email: string;
  password: string;
  remember: boolean;
};
export default function LoginMindForge() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [slideLeft, setSlideLeft] = useState(false);
	const [loading, setLoading] = useState(false);
	function ToggleChangeInputPassword() {
		const inputPassword = document.getElementById("password");
		if (inputPassword?.getAttribute("type") === "password") {
			inputPassword.setAttribute("type", "text");
			setIsPasswordVisible(true);
		} else {
			inputPassword?.setAttribute("type", "password");
			setIsPasswordVisible(false);
		}
	}

	const { signInMindForge, loginError } = useContext(AuthContext);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>();

	async function handleSignIn(data: LoginFormInputs) {
		setLoading(true);
		await signInMindForge({ email: data.email, password: data.password, remember: data.remember });
		setLoading(false);
	}
	const onSubmit = (data: LoginFormInputs) => handleSignIn(data);

  
	useEffect(() => {
		const { "fwo.token": token } = parseCookies();
		if (token) {
			// Adiciona a classe para a animação
			setSlideLeft(true);
			// Redireciona após 600ms
			setTimeout(() => {
				router.push("/Perfil");
			}, 600);
		}
	}, [handleSignIn]);
	const [logoHovered, setLogoHovered] = useState(false);

	return (
		<>
			<Head>
				<title>Entrar com MindForge </title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc." />
				<meta name="author" content="Luis Henrique Reinhold Pavão" />
			</Head>
			<Background>
				<Container
					className="animate__animated animate__fadeInRight"
					style={{
						width: slideLeft ? "100%" : "80%",
						opacity: slideLeft ? "0" : "1",
						borderRadius: slideLeft ? "0px" : "187px 0px 0px 187px",
						transition: "all .6s ease-in-out",
					}}
				>
					<Form
						onSubmit={handleSubmit(onSubmit)}
						id="form"
						style={{
							opacity: slideLeft ? "0" : "1",
							transition: "all 0.5s ease-in-out",
						}}
					>
						<Image src={logored} alt="Logo" width={171} height={38} priority />

						<h2>Entrar com MindForge</h2>
						<LoginInput
							input={{
								id: "email",
								type: "text",
								placeholder: "Seu e-mail",
								...register("email", { required: true }),
								autoComplete: "on",
								style: { color: "#9E9E9E" },
							}}
							icon={<FontAwesomeIcon icon={faEnvelope} width={26} height={26} color="#26C666" />}
							style={{ marginTop: "3rem" }}
							focusColor={"green"}
							hover={"green"}
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
							focusColor={"green"}
							hover={"green"}
							icon={
								isPasswordVisible ? (
									<FontAwesomeIcon
										icon={faLockOpen}
										width={26}
										height={26}
										color="#26C666"
										onClick={() => ToggleChangeInputPassword()}
									/>
								) : (
									<FontAwesomeIcon
										icon={faLock}
										width={26}
										height={26}
										color="#26C666"
										onClick={() => ToggleChangeInputPassword()}
									/>
								)
							}
							style={{ marginTop: "2rem" }}
						/>
						{errors.password && <p style={{ color: "red" }}>Senha é obrigatória</p>}
						<div
							style={{
								display: "flex",
								width: "100%",
								justifyContent: "space-between",
								alignItems: "center",
								marginTop: "1rem",
							}}
						>
							<Controller
								name="remember"
								control={control}
								defaultValue={false}
								render={({ field }) => (
									<CustomCheckbox
										name="remember"
										checked={field.value}
										onChange={() => {
											field.onChange(!field.value);
										}}
										color="#26C666"
									/>
								)}
							/>

							<label htmlFor="remember">Lembrar-me</label>
						</div>
						<DefaultButton
							type="submit"
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
							backgroundColor={"greenV4"}
							hover={"NeonGreenShadowEffect"}
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
								<FontAwesomeIcon icon={faCircleArrowRight} width={20} height={20} color="#ffffff5d" />
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
							<LogoContainer type="button">
								<Image
									src={Logo}
									alt="Logo"
									width={136}
									height={42}
									quality={99}
									priority
									onMouseEnter={() => setLogoHovered(true)}
									onMouseLeave={() => setLogoHovered(false)}
									onClick={() => router.push("/Login")}
								/>
							</LogoContainer>
						</div>
						<span
							style={{
								marginTop: ".5rem",
							}}
						>
              Não tem uma conta? <Link href={"/Cadastro"}> Cadastre-se </Link>
						</span>
					</Form>
				</Container>
			</Background>
		</>
	);
}
