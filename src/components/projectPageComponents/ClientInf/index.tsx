import Router, { useRouter } from "next/router"
import {
  ClientInfoContainer,
  ImageAndNameContainer,
  Infos,
  StakeHolderContainer,
  StakeHoldersContainer,
} from "./styles"
import { gql, useQuery } from "@apollo/client"
import Image from "next/image"
import { DefaultButton } from "@/components/DefaultButton"
import { ArrowRight, DocumentCopy } from "iconsax-react"
import { useContext, useEffect, useState } from "react"
import router from "next/router"
import { Client, Project } from "@/types"
import { AuthContext } from "@/contexts/AuthContext"
import { useForm } from "react-hook-form"
import { formatInfos } from "@/utils/project"
import { Utils } from "@/utils/utils"
import { util } from "zod"

const utils = new Utils()


interface ClientData {
  project: Project
  showEdit: boolean
  clientId: any
}

export function ClientInfo({ project, showEdit, clientId }: ClientData) {
  const displayNADefault = (value: string | undefined) => (value ? value : "N/A")

  const infos = formatInfos({ project: project })

  return (
    <ClientInfoContainer>
      <ImageAndNameContainer>
        <Image
          src={project.profileUrl}
          alt='img'
          width={100}
          height={100}
        />
        <h3>
          {/* {displayNADefault(project?.content?.client)} */}
          {project?.fantasyName ? project?.fantasyName : project?.content?.client}
        </h3>
      </ImageAndNameContainer>
      <Infos>
        <h4>Cliente:</h4>
        <span
          style={{
            textTransform: "capitalize",
          }}
        >{infos.user?.name ?? "n/a"}</span>
      </Infos>
      <Infos>
        <h4>Nome Fantasia:</h4>
        <span>{displayNADefault(project?.fantasyName)}</span>
      </Infos>
      <Infos>
        <h4>Razão social:</h4>
        <span>{displayNADefault(project?.fantasyName)}</span>
      </Infos>
      <Infos>
        <h4>CNPJ:</h4>
        <span>{displayNADefault(project?.cnpj)}</span>
      </Infos>
      <Infos>
        <h4>Contrato assinado em :</h4>
        <span>{displayNADefault(utils.formatToDDMMAAAA(project?.initialDateContract))}</span>
      </Infos>
      {/* <Infos>
        <h4>Data inauguração:</h4>
        <span>{displayNADefault(project?.content?.bornDate)}</span>
      </Infos> */}
      <Infos>
        <h4>Endereço:</h4>
        <span>{displayNADefault(project?.content?.address)}</span>
      </Infos>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Infos>
          <h4>Número:</h4>
          <span>{displayNADefault(project?.content?.addressNumber)}</span>
        </Infos>
        <Infos>
          <h4>Complemento:</h4>
          <span>{displayNADefault(project?.content?.addressComplement)}</span>
        </Infos>
      </div> */}
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Infos>
          <h4>Bairro:</h4>
          <span>{displayNADefault(project?.content?.addressDistrict)}</span>
        </Infos>
        <Infos>
          <h4>Cep:</h4>
          <span>{displayNADefault(project?.content?.addressZipCode)}</span>
        </Infos>
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Infos>
          <h4>Cidade</h4>
          <span>{displayNADefault(project?.city)}</span>
        </Infos>
        <Infos>
          <h4>UF:</h4>
          <span>{displayNADefault(project?.state)}</span>
        </Infos>
      </div>
      <StakeHoldersContainer>
        {project?.content?.stakeholder?.map((stakeholder: any, index: number) => (
          <StakeHolderContainer key={index}>
            {index === 0 && <h3>Dados contato/Stakeholders</h3>}
            <Infos>
              <h4>Nome:</h4>
              <span>{displayNADefault(stakeholder.stakeHolderName)}</span>
            </Infos>
            <Infos>
              <h4>E-mail:</h4>
              <span>{displayNADefault(stakeholder.stakeHolderEmail)}</span>
            </Infos>
            <Infos>
              <h4>Telefone/WhatsApp:</h4>
              <span>{displayNADefault(stakeholder.stakeHolderPhoneNumber)}</span>
            </Infos>
            <Infos>
              <h4>Função:</h4>
              <span>{displayNADefault(stakeholder.stakeHolderFunction)}</span>
            </Infos>
            <Infos>
              <h4>Data de Nascimento:</h4>
              <span>{displayNADefault(stakeholder.stakeHolderBirthDate)}</span>
            </Infos>
          </StakeHolderContainer>
        ))}
      </StakeHoldersContainer>
      {showEdit && (
        <DefaultButton
          color={"white"}
          backgroundColor={"purple"}
          style={{
            width: "100%",
            minHeight: "2.375rem",
            maxHeight: "2.375rem",
            fontSize: "0.75rem",
          }}
          svgSize={"small"}
          animationSvg={"arrowRight"}
          onClick={() => router.push(`/Perfil/Projeto/EditarProjeto/${clientId}`)}
        >
          Editar informações <ArrowRight variant='Outline' />
        </DefaultButton>
      )}
    </ClientInfoContainer>
  )
}
