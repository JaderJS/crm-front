import {
  Button,
  ButtonsContainer,
  ClientName,
  Container,
  Content,
  Header,
  Info,
  Investment,
  InvestmentValue,
  ServiceContainer,
  Value,
} from "./styles"
import Image from "next/image"
import {
  ArrowDown2,
  ArrowRight,
  Building,
  CloseCircle,
  DollarCircle,
  Location,
  Pointer,
  Designtools,
  VideoSquare,
  WalletRemove,
  Graph,
  Copyright,
  Trash,
} from "iconsax-react"
import { iconMappings } from "@/utils/componentList"
import { DefaultButton } from "@/components/DefaultButton"
import { useContext, useEffect, useState } from "react"
import { ReceivedClient } from "@/types"
import { keysReceivedProject } from "@/utils/strengthWorkUser"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserContext } from "@/contexts/UserContext"

const signatureProjectSchema = z.object({
  id: z.number(),
  lps: z.coerce.number().min(0).default(0),
  designs: z.coerce.number().min(0),
  movies: z.coerce.number().min(0),
  bis: z.coerce.number().min(0),
  emails: z.coerce.number().min(0),
  copies: z.coerce.number().min(0),
  city: z.string(),
  fee: z.number(),
  segment: z.string(),
  title: z.string(),
  thumbUrl: z.string(),
})
export type SignatureProjectSchema = z.infer<typeof signatureProjectSchema>

interface ClientCardProps {
  project: ReceivedClient
  isOpen: boolean
  toggleCard: () => void
  cancel: () => void
  attribution: (data: SignatureProjectSchema) => void
  onClientDeleteClick?: () => void
}

export function ClientCard({ attribution, ...props }: ClientCardProps) {
  const { userAllowed } = useContext(UserContext)
  const allInfosProject = keysReceivedProject(props.project)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignatureProjectSchema>({
    resolver: zodResolver(signatureProjectSchema),
    defaultValues: { ...allInfosProject },
  })

  const submit = (data: SignatureProjectSchema) => {
    attribution(data)
  }

  return (
    <Container
      style={{
        height: props.isOpen ? "46.5rem" : "8.9375rem",
        minHeight: props.isOpen ? "46.5rem" : "8.9375rem",
      }}
    >
      {userAllowed && <button onClick={props.onClientDeleteClick}
      style={{
        position: "absolute",
        right: "1rem",
        top: "1rem",
        zIndex: 100,
        width: "1rem",
        height: "1rem",
        border: "none",
        background: "none",
        cursor: "pointer",
        outline: "none",
      }}
      >
          <Trash variant='Outline' color='#DC2424' 
            style={{
              width: "1rem",
              height: "1rem",
            }}
          />
        </button>}
      <Header>
        <Image loading='lazy' src={allInfosProject.thumbUrl} alt='Logo' width={480} height={480} quality={100} />
        <ClientName>
          <h3>{allInfosProject.title}</h3>
          <p>{allInfosProject.title}</p>
        </ClientName>
      </Header>

      <Content
        style={{
          opacity: props.isOpen ? 1 : 0,
          transition: props.isOpen ? "opacity 0.3s ease-in" : "opacity 0.3s ease-out",
        }}
      >
        <Info>
          <label>Fee</label>
          <Value>
            <DollarCircle variant='Outline' />
            <p>R${allInfosProject.fee}</p>
          </Value>
        </Info>

        <Info>
          <label>Segmento</label>
          <Value>
            <Building variant='Outline' />
            <p>{allInfosProject.segment}</p>
          </Value>
        </Info>

        <Info>
          <label>Cidade/UF</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Value
              style={{
                minWidth: "13.75rem",
                maxWidth: "13.75rem",
              }}
            >
              <Location variant='Outline' />
              <p>{allInfosProject.city}</p>
            </Value>
            <Value
              style={{
                minWidth: "3.75rem",
                maxWidth: "3.75rem",
              }}
            >
              <p>{allInfosProject.state}</p>
            </Value>
          </div>
        </Info>

        <Investment>
          <label>Serviços contratados</label>
          <InvestmentValue>
            <DollarCircle variant='Outline' />
            <p>
              <strong>Investimento:</strong> R$
            </p>
            <input type='number' {...register("fee", { valueAsNumber: true })} />
          </InvestmentValue>
        </Investment>

        <ServiceContainer>
          <Pointer />:<h3>Lps</h3>
          <input type='number' {...register("lps", { valueAsNumber: true })} />
        </ServiceContainer>
        <ServiceContainer>
          <Designtools />:<h3>Design</h3>
          <input type='number' {...register("designs", { valueAsNumber: true })} />
        </ServiceContainer>
        <ServiceContainer>
          <VideoSquare />:<h3>Videos</h3>
          <input type='number' {...register("movies", { valueAsNumber: true })} />
        </ServiceContainer>
        <ServiceContainer>
          <Graph />:<h3>Bi</h3>
          <input type='number' {...register("bis", { valueAsNumber: true })} />
        </ServiceContainer>
        <ServiceContainer>
          <WalletRemove />:<h3>Emails</h3>
          <input type='number' {...register("emails", { valueAsNumber: true })} />
        </ServiceContainer>
        <ServiceContainer>
          <Copyright />:<h3>Copy</h3>
          <input type='number' {...register("copies", { valueAsNumber: true })} />
        </ServiceContainer>
      </Content>

      <ButtonsContainer
        style={{
          display: props.isOpen ? "flex" : "none",
          transition: props.isOpen ? "display 1.6s ease-in" : "display 0.3s ease-out",
        }}
      >
        <DefaultButton
          onClick={handleSubmit(submit)}
          style={{ width: "11.31rem", height: "2.375rem", color: "#F8F8F8" }}
          backgroundColor={"purple"}
          animationSvg={"arrowRight"}
          svgSize={"small"}
        >
          Atribuir <ArrowRight variant='Outline' />
        </DefaultButton>

        <DefaultButton
          onClick={props.cancel}
          style={{
            width: "5.5rem",
            height: "2.375rem",
            color: "#444",
            fontSize: "0.625rem",
          }}
          backgroundColor={"transparent"}
          svgSize={"small"}
        >
          <CloseCircle variant='Outline' color='#DC2424' />
          Cancelar
        </DefaultButton>
      </ButtonsContainer>

      <Button onClick={props.toggleCard} open={props.isOpen}>
        <ArrowDown2 variant='Outline' />
      </Button>
    </Container>
  )
}
