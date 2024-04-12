import { Calendar1 } from "iconsax-react"
import { InputContainer } from "./styles"
import { useState, forwardRef, ForwardedRef, useEffect } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import React, { useRef } from "react"
import ptBR from "date-fns/locale/pt-BR" // Importando o locale pt-BR
registerLocale("pt-BR", ptBR) // Registrando o locale


export interface DateInputProps {
  label?: string
  text?: string
  ref?: any
  onChange?: (date: string | null) => void; // Altere o tipo para aceitar string
  defaultValue?: string | null | undefined
  name?: string
  [key: string]: any; // Aceita outras props que não estão definidas
  style?: any;
  value?: Date | string
}

export const DateInput = forwardRef((props: DateInputProps, ref: ForwardedRef<HTMLDivElement | null>) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const datePickerRef = useRef<DatePicker | null>(null)

  const handleDateChange = (date: Date | null) => {
    console.log(date)
    if (date) {
      const isoDate = date.toISOString();
      setStartDate(date);
       

      if (props.onChange) {
        props.onChange(isoDate);
      }


    }
  }
  useEffect(() => {
    if (props.defaultValue) {
      // Converte a string ISO para um objeto Date
      const date = new Date(props.defaultValue);
  
      // Se quiser manter apenas a data, ignorando a hora
      const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
      // Verifica se a data é válida
      if (!isNaN(adjustedDate.getTime())) {
        setStartDate(adjustedDate);
      } else {
        console.error("Invalid default date value:", props.defaultValue);
        setStartDate(null);
      }
    } else {
      setStartDate(null);
    }
  }, [props.defaultValue]);
  
  

  const handleCalendarClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.37rem",
        width: "100%",
        ...props.style,

      }}
    >

      {props.label && (
        <label
          style={{
            fontSize: "1rem",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {props.label}
        </label>
      )}
      <InputContainer
      onClick={handleCalendarClick}
      >
      <Calendar1 variant='Outline' onClick={handleCalendarClick} width={16} height={16} />
      <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          placeholderText='DD/MM/AAAA'
          ref={(el) => (datePickerRef.current = el)}
          dateFormat='dd/MM/yyyy'
          dropdownMode="scroll"
          locale='pt-BR'
          calendarContainer={(props) => (
            <div
              style={{
                border: "1px solid #7841B0",
                borderRadius: "15px",
                fontFamily: "DM Sans",
                fontWeight: "bold",
                padding: "0.25rem",
              }}
              {...props}
            />
          )}
        />
      </InputContainer>
    </div>

  )
})
export default DateInput
