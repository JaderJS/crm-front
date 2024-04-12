import { useState, Fragment, useEffect, useRef } from "react"
import { Backdrop, Container, Form, Header } from "./styles"
import { ArrowRight, CloseCircle } from "iconsax-react"

import { useForm } from "react-hook-form"
import { DefaultButton } from "@/components/DefaultButton"
import { SmallText } from "@/components/Primitives/PrimitivesInputs/SmallText"
import { Primitives } from "@/components/Primitives"

interface PopUpLinksProps {
  openPopUp: boolean
  clientId: number
  closePopUp: () => void
  handleData: (data: any) => any
  defaultValues ?: Fields
  // onClosePopup: () => void // Função de retorno para notificar o pai

}

interface Fields {
  copys?: string
  designs?: string
  plannings?: string
  archives?: string
}

export default function PopUpLinks({ openPopUp, clientId, closePopUp, handleData ,defaultValues}: PopUpLinksProps) {
  const [showPopUp, setShowPopUp] = useState(false)

  useEffect(() => {
    if (openPopUp) {
      setShowPopUp(true)
    }
  }, [openPopUp])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Fields>({ defaultValues: defaultValues }
  );

  const [form, setForm] = useState([
    {
      fieldType: "text",
      label: "Copy's",
      placeholder: "Insira o link das copys",
      name: "copys",
    },
    {
      fieldType: "text",
      label: "Designs",
      placeholder: "Insira o link dos designs",
      name: "designs",
    },
    {
      fieldType: "text",
      label: "Planejamento",
      placeholder: "Insira o link do planejamento",
      name: "plannings",
    },
    {
      fieldType: "text",
      label: "Pasta do cliente ",
      placeholder: "Insira o link da pasta do cliente",
      name: "archives",
    },
  ])

  const onSubmit = async (data: Fields) => {
   await  handleData(data)
  }

  const content = form.map((field, index) => (
    <Fragment key={index}>
      {field.fieldType === "text" && (
        <>
          {/* <SmallText
            label={field.label}
            input={{
              ...register(`${field.name}` as any),
              placeholder: field.placeholder,
              autoComplete: "on",
              name: `${field.name}`,
              onChange: (event: any) => {
                setValue(field.name as any, event.target.value)
              },
            }}
          /> */}
          <Primitives
          componentName="SmallText"
          smallTextProps={{
            label: field.label,
            input: {
              ...register(`${field.name}` as any),
              placeholder: field.placeholder,
              autoComplete: "on",
              name: `${field.name}`,
              onChange: (event: any) => {
                setValue(field.name as any, event.target.value)
              },},
          }}
        />
        
        </>
      )}
    </Fragment>
  ))
  return (
    <Backdrop
      style={{
        opacity: showPopUp ? 1 : 0,
        pointerEvents: showPopUp ? "auto" : "none",
        display: showPopUp ? "flex" : "none",
      }}
    >
      <Container>
        <Header>
          <h3>Ajustar Links</h3>
          <button
            onClick={() => {
              setShowPopUp(false)
              closePopUp()
            }}
          >
            <CloseCircle variant='Outline' />
          </button>
        </Header>
        
        <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        
          {content}
          <div>
            <DefaultButton
              backgroundColor={"darkGray"}
              onClick={() => {
                setShowPopUp(false)
                closePopUp()
              }}
            >
              Cancelar
            </DefaultButton>

            <DefaultButton type='submit' backgroundColor={"purple"} svgSize={"small"} animationSvg={"arrowRight"}>
              Alterar <ArrowRight />
            </DefaultButton>
          </div>
        </Form>
      </Container>
    </Backdrop>
  )
}