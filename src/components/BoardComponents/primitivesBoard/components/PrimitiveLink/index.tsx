import { InputContainer } from "./styles"

import { Slash, CopySuccess, Link } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { InputHTMLAttributes, forwardRef, useEffect, useId } from "react"

import { BaseMutationOptions } from "@apollo/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RotatingLines } from "react-loader-spinner"

type PrimitiveLinkProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  description?: string
  response?: BaseMutationOptions
  errorBoolean?: boolean | null
  successBoolean?: boolean | null
  children?: React.ReactElement
    modified?: { name?: string; updatedAt: any; uuid: string }
  loading?: boolean | null
}

export const PrimitiveLink = forwardRef<HTMLInputElement, PrimitiveLinkProps>(
  ({ label, description, response, type = "text", children, loading = false, successBoolean = false, errorBoolean = false, ...props }: PrimitiveLinkProps, ref) => {
    const id = useId()

    return (
      <InputContainer>
        <SuccessAndErrorSvgContainer>
          {errorBoolean && <Slash color='#E0465C' />}
          {successBoolean && <CopySuccess color='#00C48C' />}
          {loading && <RotatingLines />}
        </SuccessAndErrorSvgContainer>
        {label && <label htmlFor={id}>{label}</label>}
        {description && <span>{description}</span>}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: "1rem" }}>
          {children}
          <input id={id} type={type} ref={ref} {...props} />
        </div>
            {props.modified && props.modified.name && <span style={{ fontSize: ".65rem" }}>Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}</span>}

      </InputContainer>
    )
  },
)

export const PrimitiveLinkAnchor = forwardRef<HTMLAnchorElement, { href: string }>(({ href, ...props }, ref) => {
  return (
    <a target='_blank' rel='noreferrer noopener'
      href={href}
      {...props}
    >
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <Link
          color="#7841B0"

        />
      </button>
    </a>
  )
})
