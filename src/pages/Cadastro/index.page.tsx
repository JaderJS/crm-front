import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ButtonsContainer, Container, H2Gradient, H2GradientON, ImagePreview, SliderButtons, Step } from "./styles";
import { useEffect, useRef, useState } from "react";
import { LoginInput } from "../Login/inputLogin";
import { Controller, set, useForm } from "react-hook-form";
import { gql, useQuery, useMutation } from "@apollo/client";
import { client } from "@/lib/apollo";
import { styled, keyframes } from "@/styles";
import Select from "react-select";
import { DefaultButton } from "@/components/DefaultButton";
import { AddCircle, ArrowLeft2, ArrowRight2, Login, Trash } from "iconsax-react";
import Image from "next/image";
import { api } from "@/lib/axios";

import Router from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage } from "@hookform/error-message";
import { RegisterInputManual } from "@/types";
import { SelectFWO } from "@/components/Primitives/PrimitivesInputs/SelectFWO";

interface Teams {
  id: number;
  name: string;
  __typename: string;
}

interface JobFunctions {
  id: number;
  name: string;
  __typename: string;
}
interface User {
  name: string;
}
interface organizations {
  id: number;
  name: string;
  __typename: string;
}

interface Steps {
  id: number;
  name: string;
  __typename: string;
}

interface Data {
  teams: Teams[];
  jobFunctions: JobFunctions[];
  organizations: organizations[];
  steps: Steps[];
}

interface Register {
  name: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
  teamId: number;
  jobFunctionId: number;
  organizationId: number;
  stepId: number;
  birthDate: Date;
  admissionDate: Date;
  avatarUrl: string;
  phone: string;
  multipleErrorInput: string;
}

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInputManual!) {
    register(data: $input) {
      user {
        uuid
      }
    }
  }
`;

export default function Cadastro() {
	const rotate = keyframes({
		"0%": {
			transform: "rotate(0deg)",
		},
		"100%": {
			transform: "rotate(360deg)",
		},
	});

	const { loading, error, data } = useQuery(gql`
    query Config {
      teams {
        id
        name
      }
      jobFunctions {
        id
        name
      }
      organizations {
        id
        name
      }
      steps {
        id
        name
      }
    }
  `);
	const [registerUser, { loading: mutationLoading, error: mutationError }] = useMutation(REGISTER_USER);

	const [teams, setTeams] = useState<Teams[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [steps, setSteps] = useState<Steps[]>([]);

	const selectOptionsSteps = steps.map((step) => ({
		value: step.id,
		label: step.name,
	}));

	useEffect(() => {
		if (data && data.steps) {
			setSteps(data.steps);
		}
	}, [data]);

	useEffect(() => {
		if (data && data.teams) {
			setTeams(data.teams);
		}
	}, [data]);

	const selectOptions = teams.map((team) => ({
		value: team.id,
		label: team.name,
	}));
	const [jobFunctions, setJobFunctions] = useState<JobFunctions[]>([]);
	useEffect(() => {
		if (data && data.jobFunctions) {
			setJobFunctions(data.jobFunctions);
		}
	}, [data]);
	const selectOptionsJobFunctions = jobFunctions.map((jobFunction) => ({
		value: jobFunction.id,
		label: jobFunction.name,
	}));
	const [organizations, setOrganizations] = useState<organizations[]>([]);
	console.log(organizations);
	useEffect(() => {
		if (data && data.organizations) {
			setOrganizations(data.organizations);
		}
	}, [data]);

	const selectOptionsOrganizations = organizations.map((organization) => ({
		value: organization.id.toString(),
		label: organization.name,
	}));
	console.log(selectOptionsOrganizations);

	const {
		register,
		control,
		handleSubmit,
		setValue,
		setError,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm<Register>({});
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = 4;

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		loop: false,
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		slides: {
			perView: 1,
		},
	});
	function slideNext() {
		instanceRef.current?.next();
	}
	function slidePrev() {
		instanceRef.current?.prev();
	}

	function slideTo1() {
		instanceRef.current?.moveToIdx(1);
	}

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File>();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedImage(URL.createObjectURL(e.target.files[0]));
			setSelectedFile(e.target.files[0]);
		}
	};

	useEffect(() => {
		const fileInput = fileInputRef.current;
		if (fileInput) {
			fileInput.onchange = () => {
				if (fileInput.files && fileInput.files[0]) {
					const reader = new FileReader();
					reader.onload = function (e) {
						setSelectedImage((e.target as FileReader).result as string);
					};
					reader.readAsDataURL(fileInput.files[0]);
				}
			};
		}
	}, [setSelectedImage]);

	const [path, setPath] = useState("");
	const [isImageUploaded, setIsImageUploaded] = useState(false);
	async function newProfilePicture(file: File) {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const response = await api.post("upload/profile", formData);

			setPath(response.data.path);
			setValue("avatarUrl", response.data.path);
			setIsImageUploaded(true); // Set the flag to true
		} catch (error: any) {
			console.error("Erro ao fazer upload:", error);
		}
	}

	const onSubmit = async (data: Register) => {
		try {
			const input: RegisterInputManual = {
				name: data.name,
				email: data.email,
				confirmationEmail: data.emailConfirmation, // Use "confirmationEmail" em vez de "emailConfirmation"
				password: data.password,
				passwordConfirmation: data.passwordConfirmation,
				teamId: data.teamId,
				jobFunctionId: data.jobFunctionId,
				organizationId: data.organizationId,
				stepId: data.stepId,
				birthDate: new Date(data.birthDate).toISOString(), // Corrija para "birthDate"
				adimissionDate: new Date(data.admissionDate).toISOString(), // Corrija para "admissionDate"
				avatarUrl: data.avatarUrl,
				phone: data.phone,
			};

			const response = await registerUser({ variables: { input } });
			if (response.data?.register?.user?.uuid) {
				Router.push("/Login");
			}
		} catch (error: any) {
			console.error("Erro ao cadastrar:", error);
			const errorMessage = error.message.replace("GraphQL error: ", "");
			const MySwal = withReactContent(Swal);
			MySwal.fire({
				title: "Erro ao cadastrar!",
				text: errorMessage,
				icon: "error",
				confirmButtonText: "Ok",
				toast: true,
				width: "50%",
				heightAuto: true,
				padding: "1.25rem",
			});
		}
	};

	const handleConfirmClick = async () => {
		try {
			await newProfilePicture(selectedFile as File); // Upload the image

			onSubmit && onSubmit(watch());
		} catch (error) {
			console.error("Erro ao fazer upload da imagem:", error);
		}
	};

	const email = watch("email");
	const emailConfirmation = watch("emailConfirmation");
	const password = watch("password");
	const passwordConfirmation = watch("passwordConfirmation");
	const avatarUrl = watch("avatarUrl");

	// useEffect(() => {
	//   if(avatarUrl){
	//     setPath(avatarUrl);
	//   }
	// }, [avatarUrl]);

	useEffect(() => {
		if (emailConfirmation && emailConfirmation !== email) {
			setError("emailConfirmation", {
				type: "manual",
				message: "Email não confere.",
			});
		} else {
			clearErrors("emailConfirmation"); // Clear the error when email matches
		}
	}, [email, emailConfirmation, setError, clearErrors]);

	useEffect(() => {
		if (passwordConfirmation && passwordConfirmation !== password) {
			setError("passwordConfirmation", {
				type: "manual",
				message: "Senhas não conferem.",
			});
		} else {
			clearErrors("passwordConfirmation"); // Clear the error when password matches
		}
	}, [password, passwordConfirmation, setError, clearErrors]);

	return (
		<Container id="cadastro" name="Cadastro">
			<div ref={sliderRef} className="keen-slider">
				<Step className="keen-slider__slide ">
					<div
						style={{
							width: "65%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-start",
							marginBottom: "4rem",
						}}
					>
						<H2Gradient>Vamos Começar!</H2Gradient>
					</div>
					<LoginInput
						input={{
							type: "text",
							placeholder: "Seu nome completo",
							autoComplete: "name",
							style: {
								backgroundColor: "transparent",
							},
							...register("name", { required: "Campo obrigatório" }),
						}}
						hover={"roxo"}
						focusColor={"roxo"}
						style={{
							width: "65%",
						}}
					/>
					{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
					<div
						style={{
							width: "65%",
						}}
					>
						<Controller
							name="organizationId"
							control={control}
							defaultValue={undefined}
							rules={{ required: "Selecione sua unidade" }}
							render={({ field }) => (
								
								<SelectFWO
									options={selectOptionsOrganizations}
									placeholder="Selecione sua Unidade"
									onChange={({ value }) => {
										setValue("organizationId", Number(value));
									}}
									optionWidth="100%"
									optionHeight="3rem"
									menuHeight="10rem"
									menuWidth="100%"
								/>
							// 	<SelectFWO
							// 	options={selectOptions}
							// 	placeholder="Sua Squad"
							// 	onChange={({ value }) => setValue("teamId", value)}
							// 	optionWidth="100%"
							// 	optionHeight="3rem"
							// 	menuHeight="10rem"
							// 	menuWidth="100%"
							// />
							)}
						/>
						{errors.organizationId && <span style={{ color: "red" }}>{errors.organizationId.message}</span>}
					</div>
				</Step>
				<Step className="keen-slider__slide">
					<div
						style={{
							width: "65%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-start",
							marginBottom: "4rem",
						}}
					>
						<H2Gradient>Vamos preparar seus dados.</H2Gradient>
					</div>
					<LoginInput
						input={{
							type: "text",
							placeholder: "Seu telefone com DDD",
							autoComplete: "on",
							style: {
								backgroundColor: "transparent",
							},
							...register("phone", { required: "Campo obrigatório" }),
						}}
						hover={"roxo"}
						focusColor={"roxo"}
						style={{
							width: "65%",
						}}
					/>
					{errors.phone && <span style={{ color: "red" }}>{errors.phone.message}</span>}
					<div
						style={{
							width: "65%",
						}}
					>
						<Controller
							name="teamId"
							control={control}
							defaultValue={undefined}
							rules={{ required: "Selecione sua Squad" }}
							render={({ field }) => (
								<SelectFWO
									options={selectOptions}
									placeholder="Sua Squad"
									onChange={({ value }) => setValue("teamId", value)}
									optionWidth="100%"
									optionHeight="3rem"
									menuHeight="10rem"
									menuWidth="100%"
								/>
							)}
						/>
						{errors.teamId && <span style={{ color: "red" }}>{errors.teamId.message}</span>}
					</div>
					<div
						style={{
							width: "65%",
						}}
					>
						<Controller
							name="jobFunctionId"
							control={control}
							defaultValue={undefined}
							rules={{ required: "Selecione sua função" }}
							render={({ field }) => (
								<SelectFWO
									options={selectOptionsJobFunctions}
									placeholder="Sua função"
									onChange={({ value }) => setValue("jobFunctionId", value)}
									optionWidth="100%"
									optionHeight="3rem"
									menuHeight="10rem"
									menuWidth="100%"
								/>
							)}
						/>
						{errors.jobFunctionId && <span style={{ color: "red" }}>{errors.jobFunctionId.message}</span>}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							width: "65%",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<div>
							<label htmlFor="entrouNaUnidade">Quando entrou na unidade?</label>
							<LoginInput
								input={{
									type: "date",
									placeholder: "dd/mm/yyyy",
									style: {
										backgroundColor: "transparent",
										width: "8rem",
									},
									id: "entrouNaUnidade",
									...register("admissionDate", { required: "Campo obrigatório" }),
								}}
								hover={"roxo"}
								focusColor={"roxo"}
								style={{
									maxWidth: "16.0625rem",
								}}
							/>
							{errors.admissionDate && <span style={{ color: "red" }}>{errors.admissionDate.message}</span>}
						</div>
						<div>
							<label htmlFor="DataDeNascimento">Data de nascimento?</label>
							<LoginInput
								input={{
									type: "date",
									placeholder: "dd/mm/yyyy",
									style: {
										backgroundColor: "transparent",
										width: "8rem",
										minWidth: "8rem",
									},
									id: "DataDeNascimento",
									...register("birthDate", { required: "Campo obrigatório" }),
								}}
								hover={"roxo"}
								focusColor={"roxo"}
								style={{
									maxWidth: "16.0625rem",
									width: "15.0625rem",
								}}
							/>
							{errors.birthDate && <span style={{ color: "red" }}>{errors.birthDate.message}</span>}
						</div>
						<div
							style={{
								width: "15.0625rem",
							}}
						>
							<label htmlFor="entrouNaUnidade">Selecione seu Step</label>
							<Controller
								name="stepId"
								control={control}
								defaultValue={undefined}
								rules={{ required: "Selecione sua Step" }}
								render={({ field }) => (
									<SelectFWO
										options={selectOptionsSteps}
										placeholder="Step"
										onChange={({ value }) => setValue("stepId", value)}
										optionWidth="100%"
										optionMaxWidth="16.06rem"
										optionHeight="3rem"
										menuHeight="10rem"
										menuMaxWidth="61.75rem"
										menuWidth="100%"
									/>
								)}
							/>
							{errors.stepId && <span style={{ color: "red" }}>{errors.stepId.message}</span>}
						</div>
					</div>
				</Step>
				<Step className="keen-slider__slide">
					<div
						style={{
							width: "65%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-start",
							marginBottom: "4rem",
						}}
					>
						<H2Gradient>{"Estamos quase lá ;)"}</H2Gradient>
					</div>
					<input type="text" value={path} {...register("avatarUrl")} hidden />

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							width: "65%",
							justifyContent: "flex-start",
						}}
					>
						<ImagePreview>
							{selectedImage ? (
								<img src={selectedImage} alt="IMGPREVIEW"/>
							) : (
								<img
									src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
									alt="image preview"
								/>
							)}
						</ImagePreview>
						<ButtonsContainer>
							<DefaultButton
								border={"gradientFwo"}
								backgroundColor={"transparent"}
								svgSize={"small"}
								color={"black"}
								hover={"NeonPurpleShadowEffect"}
								style={{
									width: "8.93rem",
									height: "1.875rem",
									borderRadius: "1.875rem",
									fontSize: "0.75rem",
								}}
								type="button"
								onClick={() => fileInputRef.current?.click()}
							>
                Escolher foto <AddCircle variant="Outline" color="#DC2424" />
							</DefaultButton>

							<input hidden type="file" id="file" ref={fileInputRef} onChange={handleFileChange} />

							<DefaultButton
								backgroundColor={"gray"}
								hover={"Gray"}
								svgSize={"small"}
								color={"black"}
								style={{
									width: "8.93rem",
									height: "1.875rem",
									borderRadius: "1.875rem",
									fontSize: "0.75rem",
								}}
								type="button"
								onClick={() => {
									setSelectedImage(null);
									setSelectedFile(undefined);
								}}
							>
                Remover foto <Trash variant="Outline" color="#DC2424" />
							</DefaultButton>

							{errors.avatarUrl && <span style={{ color: "red" }}>{errors.avatarUrl.message}</span>}
						</ButtonsContainer>
					</div>

					<LoginInput
						input={{
							type: "email",
							placeholder: "Seu melhor e-mail",
							autoComplete: "email",
							style: {
								backgroundColor: "transparent",
							},
							...register("email", { required: "Email obrigatório" }),
						}}
						hover={"roxo"}
						focusColor={"roxo"}
						style={{
							width: "65%",
						}}
					/>
					{errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
					<LoginInput
						input={{
							type: "email",
							placeholder: "Confirmar seu e-mail",
							autoComplete: "email",
							style: {
								backgroundColor: "transparent",
							},
							...register("emailConfirmation", { required: "Confirme seu email" }),
						}}
						hover={"roxo"}
						focusColor={"roxo"}
						style={{
							width: "65%",
						}}
					/>
					{errors.emailConfirmation && <span style={{ color: "red" }}>{errors.emailConfirmation.message}</span>}
					<LoginInput
						input={{
							type: "password",
							placeholder: "Escolha uma senha",
							style: {
								backgroundColor: "transparent",
							},
							...register("password", { required: "Senha obrigatória" }),
						}}
						hover={"roxo"}
						focusColor={"roxo"}
						style={{
							width: "65%",
						}}
					/>
					{errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
					<LoginInput
						input={{
							type: "password",
							placeholder: "Confirmar sua senha",
							style: {
								backgroundColor: "transparent",
							},
							...register("passwordConfirmation", { required: "Confirme sua senha" }),
						}}
						hover={"roxo"}
						focusColor={"roxo"}
						style={{
							width: "65%",
						}}
					/>
					{errors.passwordConfirmation && <span style={{ color: "red" }}>{errors.passwordConfirmation.message}</span>}
				</Step>
				<Step
					className="keen-slider__slide"
					style={{
						padding: "0",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							gap: "3rem",
							height: "100%",
						}}
					>
						<H2GradientON>Confira seus dados preenchidos!</H2GradientON>
						<span
							style={{
								maxWidth: "53rem",
								minWidth: "30rem",
								textAlign: "justify",
								fontSize: "1.25rem",
								fontWeight: "300",
								color: "#A1A1A5",
							}}
						>
              E aguarde que em breve você receberá aprovação ..... Copy copy copy aqui... E aguarde que em breve você
              receberá aprovação ..... Copy copy copy aqui...E aguarde que em breve você receberá aprovação ..... Copy
              copy copy aqui...E aguarde que em breve você receberá aprovação ..... Copy copy copy aqui...E aguarde que
              em breve você receberá aprovação ..... Copy copy copy aqui...E aguarde que em breve você receberá
              aprovação ..... Copy copy copy aqui...E aguarde que em breve você receberá aprovação ..... Copy copy copy
              aqui...
						</span>

						<DefaultButton
							border={"gradientFwo"}
							backgroundColor={"gradientFwo"}
							color={"white"}
							style={{
								width: "32rem",
								height: "4.9rem",

								fontSize: "1rem",
								fontWeight: "400",
							}}
							type="button"
							onClick={handleSubmit(handleConfirmClick)}
							disabled={mutationLoading} // Disable the button when the mutation is loading
						>
							{mutationLoading ? "" : "Confirmar Cadastro"}
							{mutationLoading ? (
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
								<Login size="2.5rem" color="#ffffff5d" />
							)}
						</DefaultButton>
						{Object.keys(errors).length > 0 && (
							<div>
								<ul>
									{Object.keys(errors).map((fieldName) => (
										<li
											key={fieldName}
											style={{
												color: "red",
												fontSize: ".8rem",
												fontWeight: "400",
											}}
										>
											{(errors as any)[fieldName]?.message}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</Step>
			</div>
			<SliderButtons>
				<button type="button" onClick={slidePrev}>
					{currentSlide === 0 ? <></> : <ArrowLeft2 variant="Outline" />}
				</button>
				{currentSlide + 1}
				<hr />
				{totalSlides}
				<button type="button" onClick={slideNext}>
					<ArrowRight2 variant="Outline" />
				</button>
			</SliderButtons>
		</Container>
	);
}
