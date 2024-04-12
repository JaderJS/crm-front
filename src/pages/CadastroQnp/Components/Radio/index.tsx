import React, { useEffect, useState } from "react";
import { Container } from "./styles";

interface RadioProps {
  label: string
  name: string // Certifique-se de que o nome seja o mesmo para todos os botões de rádio em um grupo
  options?: {
    value: any
    label: any
  }[]
  onChange: (selectedValue: any) => void
  defaultValue?:string
}

export function Radio(props: RadioProps) {
	const { label, name, options, onChange, defaultValue } = props;
	const [selectedValue, setSelectedValue] = useState<any>(null);
  
	useEffect(() => {
	  if (defaultValue) {
		setSelectedValue(defaultValue);
	  }
	}, [defaultValue]);
  
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  const value = event.target.value;
	  setSelectedValue(value);
	  onChange(value);
	};
	return (
		<Container
			style={{
				gap: ".7rem",
			}}
		>
			<label>{label}</label>
			{options && (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						gap: "0.6rem",
					}}
				>
					{options.map((option, index) => (
						<div
							key={index}
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<input
								type='radio'
								name={name}
								id={`radio${index + 1}`}
								value={option.value}
								onChange={handleRadioChange}
								checked={selectedValue === option.value}
								/>
							<label
								htmlFor={`radio${index + 1}`}
								style={{
									fontFamily: "DM Sans",
									fontSize: "0.875rem",
									color: " #A1A1A5",
									marginLeft: ".19rem",
								}}
							>
								{option.label}
							</label>
						</div>
					))}
				</div>
			)}
		</Container>
	);
}
