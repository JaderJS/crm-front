import { InputContainer } from "./styles";
import React, { useRef, useState } from "react"; // Importe o useRef do React
import { api } from "@/lib/axios";
import { useToast } from "@/contexts/ToastContext";
import { AddCircle } from "iconsax-react";

interface InputFileProps {
  label?: string;
  text?: string;
  ref?: any;
  fieldName: string;
  onFileUpload: (pathUrl: string) => void; // Passe o fieldName como argumento aqui
  input: {
    placeholder?: any;
    required?: boolean;
    onChange?: any;
    onClick?: any;
    onSubmit?: any;
    onFocus?: any;
    onBlur?: any;
    maxLength?: number;
    minLength?: number;
    size?: number;
    value?: any;
    name?: string;
    id?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    label?: string;
    svg?: any;
    style?: any;
    ref?: any;
    defaultValue?: any;
    pattern?: string;
    min?: any;
    max?: any;
    validate?: any;
    onKeyPress?: any;
    onKeyUp?: any;
    [key: string]: any; // Aceita outras props que não estão definidas
  }
  style?: any;

}

export function InputFile({ label, fieldName, onFileUpload, ...rest }: InputFileProps) {
  // const { showSuccessToast, showErrorToast, showWarningToast } = useToast()
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileClick = () => {
    inputRef.current?.click(); // Clique no input hidden
  };

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; // Pega o primeiro arquivo selecionado

    if (file) {
      setFileName(file.name);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post("/upload/archive", formData);
        const pathUrl = response.data.path; // Assume que a resposta possui um campo 'pathUrl'
       
          onFileUpload(pathUrl); // Passe o fieldName como segundo argumento
      
        // showSuccessToast(file.name + " foi carregado com sucesso!")
      } catch (error: any) {
        console.error(error);
        // showErrorToast("erro ao fazer upload")
      }
    }
  }

  return (
    <InputContainer
      style={{
        cursor: "pointer",
      }}
      {...rest}
    >
      {label && <label>{label}</label>}
      <div onClick={handleFileClick}>
        <AddCircle variant='Outline' onClick={handleFileClick} />
        {fileName ? <span>{fileName}</span> : <span>Escolher arquivo</span>}
      </div>

      <input type='file' {...rest} hidden ref={inputRef} onChange={handleFileChange} accept='application/pdf' />
    </InputContainer>
  );
}
