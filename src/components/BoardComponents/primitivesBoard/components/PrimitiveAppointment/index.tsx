import { Calendar1, CopySuccess, Slash } from "iconsax-react"
import { Container, InputContainer } from "./styles"
import { useState, forwardRef, ForwardedRef, useEffect, InputHTMLAttributes } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import React, { useRef } from "react"
import { Locale, format } from "date-fns"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { BaseMutationOptions } from "@apollo/client"
import { ptBR } from "date-fns/locale"

export type PrimitivesDateInputProps = InputHTMLAttributes<HTMLDivElement> & {
  label?: string
  description?: string
  onChange?: (value: Date) => void
  response?: BaseMutationOptions
  disabled?: boolean
  loading?: boolean
  defaultValues?: Date | null
  errorBoolean?: boolean | null
  successBoolean?: boolean | null
    modified?: { name?: string; updatedAt: any; uuid: string }

}

export const PrimitivesAppointment = forwardRef<HTMLDivElement, PrimitivesDateInputProps>(({ label = "UNKNOWN", description, onChange, response, loading = false, disabled = false, errorBoolean = false, successBoolean = false, defaultValues, ...props }: PrimitivesDateInputProps, ref) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const datePickerRef = useRef<DatePicker | null>(null)

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    onChange?.(date)
  }

  useEffect(() => {
    if (!defaultValues) {
      return
    }
    const date = new Date(defaultValues)
    const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    if (!isNaN(adjustedDate.getTime())) {
      setSelectedDate(adjustedDate)
    } else {
      setSelectedDate(null)
    }
  }, [defaultValues])

  const handleCalendarClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true)
    }
  }

  return (
    <Container>
      <SuccessAndErrorSvgContainer>
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
      </SuccessAndErrorSvgContainer>{" "}
      {label && <label>{label}</label>}
      {description && <span>{description}</span>}
      <InputContainer onClick={handleCalendarClick} style={{ border: disabled ? "none" : "" }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText='DD/MM/AAAA'
          ref={(el) => (datePickerRef.current = el)}
          dateFormat='dd/MM/yyyy'
          dropdownMode='scroll'
          locale='pt-BR'
          disabled={disabled}
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
      {props.modified && props.modified.name && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </Container>
  )
},
)
export default PrimitivesAppointment
