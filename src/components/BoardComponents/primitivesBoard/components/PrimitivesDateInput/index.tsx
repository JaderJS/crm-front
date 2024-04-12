import { Calendar1 } from "iconsax-react"
import { Container, InputContainer } from "./styles"
import { useState, forwardRef, ForwardedRef, useEffect } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import React, { useRef } from "react"
import ptBR from "date-fns/locale/pt-BR" // Importando o locale pt-BR
registerLocale("pt-BR", ptBR) // Registrando o locale
import { format } from "date-fns"


export interface PrimitivesDateInputProps {
  label?: string
  description?: string
  ref?: any
  onChange?: (date: Date | null) => void
  defaultValue?: string | null
  name?: string
  [key: string]: any // Aceita outras props que não estão definidas
  style?: any
  value?: Date | string
  disabled?: boolean
  modified?: { name: string , updatedAt: any , uuid: string}
  placeholder?: string
}

export const PrimitivesDateInput = forwardRef(
  (props: PrimitivesDateInputProps, ref: ForwardedRef<HTMLDivElement | null>) => {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const datePickerRef = useRef<DatePicker | null>(null)

    const handleDateChange = (date: Date | null) => {
      setStartDate(date)
      if (props.onChange) {
        props.onChange(date)
      }
    }
    useEffect(() => {
      if (props.defaultValue) {
        const date = new Date(props.defaultValue)

        const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

        if (!isNaN(adjustedDate.getTime())) {
          setStartDate(adjustedDate)
        } else {
          console.error("Invalid default date value:", props.defaultValue)
          setStartDate(null)
        }
      } else {
        setStartDate(null)
      }
    }, [props.defaultValue])

    const handleCalendarClick = () => {
      if (datePickerRef.current) {
        datePickerRef.current.setOpen(true)
      }
    }

    return (
      <Container>
        {props.label && <label>{props.label}</label>}
        {props.description && <span>{props.description}</span>}
        <InputContainer onClick={handleCalendarClick}
          style={{
            border: props.disabled ? "none" : "",
          
          }}
        >
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            placeholderText='DD/MM/AAAA'
            ref={(el) => (datePickerRef.current = el)}
            dateFormat= {props.placeholder ? props.placeholder : "dd/MM/yyyy"}
            dropdownMode='scroll'
            locale='pt-BR'
            disabled={props.disabled}
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

          <Calendar1 variant='Outline' onClick={handleCalendarClick} width={16} height={16} />
        </InputContainer>
            {props.modified && props.modified.name && <span style={{ fontSize: ".65rem" }}>Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

      </Container>
    )
  },
)
export default PrimitivesDateInput
