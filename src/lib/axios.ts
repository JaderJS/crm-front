import axios, { AxiosError, AxiosResponse } from "axios";
import Swal from "sweetalert2"

const apiUrl = process.env.GRAPHQL_ENDPOINT;

export const api = axios.create({
	// baseURL: "http://192.168.0.92:4001/api"
	baseURL: "https://fwo-backend-kb5o34rasa-uc.a.run.app/api"
});

export const receitaWs = axios.create({ baseURL: "https://www.receitaws.com.br/v1/cnpj" })

export interface UploadProfile extends AxiosResponse {
	data: {
		path: string
		mimeType: string
		size: string
		pathUrl: string
		fileName: string
	}
}

export interface SearchAssets extends AxiosResponse {
	data: {
		msg: string
		pathUrl?: string
		error?: string
		pathUrlDownload?: string
	}
}

const methods = ["post", "PUT", "PATCH", "DELETE"]
api.interceptors.response.use(
	(response) => (response),

	(error: AxiosError) => {
		console.log("AXIOS", error.config?.method)
		if (methods.includes(error.config?.method ?? "")) {

			const data: any = error.response?.data
			const errorMessage = data?.msg ?? "Unknown";
			customAlert(errorMessage)
		}
		return Promise.reject(error);
	}
)

const customAlert = (message: string) => {
	Swal.fire({
		icon: "error",
		title: "FWO",
		text: message,
	});
}