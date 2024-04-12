import React, { useContext, useEffect, useMemo, useState } from "react"
import { Background } from "@/pages/Login/styles"
import { api } from "@/lib/axios"
import {
  Container,
  TableContainer,
  TableHeader,
  LifeTime,
  Tbody,
  Projects,
  BodyLifeTime,
  BodyFlag,
  Position,
  Name,
  DocType,
  Valor,
  ArqType,
  ArqSize,
  LastModified,
  Editor,
  Filtros,
} from "./styles"
import Link from "next/link"
import { gql, useMutation, useQuery } from "@apollo/client"
import router, { Router } from "next/router"
import { Archives, ArchivesUncheckedCreateInput } from "@/types"
import Swal from "sweetalert2"
import { Utils } from "@/utils/utils"
import { AuthContext } from "@/contexts/AuthContext"
import Image from "next/image"
import { PopUpUploadDocs } from "@/components/projectPageComponents/PopUpUploadDocs"
import { DefaultButton } from "@/components/DefaultButton"
import { AddCircle, ArrowCircleRight, Edit, Trash, ArrowSwapVertical } from "iconsax-react"
import { Primitives } from "@/components/Primitives"
import { PopUpEditDocs } from "@/components/projectPageComponents/PopUpEditDocs"

const utils = new Utils()

const MAX_UPLOAD_MBYTES = 12 * 1024

const UPDATE_ONE_PROJECT_DOCUMENTS = gql`
  mutation UpdateOneProjectDocuments($id: Int!, $content: JSON!) {
    updateOneProject(where: { id: $id }, data: { content: $content }) {
      id
    }
  }
`

const FIND_ONE_PROJECT_DOCUMENT = gql`
  query FindOneProjectDocument($id: Int!) {
    project(where: { id: $id }) {
      id
      content
      archives {
        id
        name
        description
        typeFile
        path
        cash
        createdAt
        size
        mimeType
        typeFile
        user {
          uuid
          avatarUrl
          name
          nickName
        }
      }
    }
  }
`

const DELETE_ONE_ARCHIVE_DOCUMENT = gql`
  mutation deleteOneArchiveDocument($id: Int!) {
    deleteOneArchives(where: { id: $id }) {
      id
    }
  }
`

const Documentos = () => {
  //============================================================================
  // Integrations

  const id = router.query.id
  if (!id) {
    return <></>
  }
  const { data: project, refetch: refetchArchives } = useQuery(FIND_ONE_PROJECT_DOCUMENT, {
    variables: { id: +id },
    skip: id === undefined,
  })
  const [updateOneProject] = useMutation(UPDATE_ONE_PROJECT_DOCUMENTS)

  const [showPopUp, setShowPopUp] = useState(false)

  return (
    <Container>
      <DefaultButton
        onClick={() => setShowPopUp(true)}
        backgroundColor={"transparent"}
        border={"gradientFwo"}
        style={{
          borderRadius: "1.875rem",
          width: "12.5rem",
          height: "3.1875rem",
          fontSize: "1rem",
        }}
        color={"black"}
      >
        Adicionar Novo <AddCircle variant='Outline' color='#DC2424' />
      </DefaultButton>
      {project && <TableComponent archives={project.project?.archives} refetch={refetchArchives} />}

      {showPopUp && (
        <PopUpUploadDocs
          closePopUp={() => setShowPopUp(false)}
          projectId={Number(id)}
          successReturn={() => {
            refetchArchives()
            setShowPopUp(false)
          }}
        />
      )}
    </Container>
  )
}

const TableComponent = ({ archives, refetch }: { archives?: Archives[]; refetch: Function }) => {
  const projectId = router.query.id

  //================================================================
  // Integrations
  const [deleteOneArchive] = useMutation(DELETE_ONE_ARCHIVE_DOCUMENT)

  const handleSearchArchive = async ({ path }: { path: string }) => {
    try {
      const response = await api.post("/search/asset", { path })
      window.open(response.data.pathUrl, "_blank")
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteArchive = async ({ id }: { id: number }) => {
    await deleteOneArchive({ variables: { id: id } })
    refetch()
  }
  //================================================================

  const [orderBy, setOrderBy] = useState<string>("")
  const [orderDirection, setOrderDirection] = useState<string>("")

  const handleOrderByChange = (selectedOrder: string) => {
    setOrderBy(selectedOrder)
    setOrderDirection(orderDirection === "ASC" ? "DESC" : "ASC")
  }
  const sortedArchives = useMemo(() => {
    if (!archives) return []
    let sorted = [...archives]
    if (orderBy) {
      sorted = sorted.sort((a, b) => {
        if (orderDirection === "ASC") {
          return a[orderBy as keyof Archives] > b[orderBy as keyof Archives] ? 1 : -1
        } else {
          return a[orderBy as keyof Archives] < b[orderBy as keyof Archives] ? 1 : -1
        }
      })
    }
    return sorted
  }, [archives, orderBy, orderDirection])

  const handleToggleOrder = () => {
    setOrderDirection(orderDirection === "ASC" ? "DESC" : "ASC")
  }
  const [hoveredEditors, setHoveredEditors] = useState<{ [key: string]: boolean }>({})
  const handleMouseEnter = (id: string) => {
    setHoveredEditors((prev) => ({ ...prev, [id]: true }))
  }

  const handleMouseLeave = (id: string) => {
    setHoveredEditors((prev) => ({ ...prev, [id]: false }))
  }

  const [editPopUp, setEditPopUp] = useState(false)
  const [docId, setDocId] = useState<number | null>(null)
  return (
    <TableContainer>
      {editPopUp && (
        <PopUpEditDocs
          closePopUp={() => setEditPopUp(!editPopUp)}
          successReturn={() => {
            refetch()
            setEditPopUp(!editPopUp)
          }}
          projectId={Number(projectId)}
          docId={docId ? docId : 0}
        />
      )}
      <TableHeader>
        <Position>#</Position>
        <Name>Nome</Name>
        <DocType>Documento</DocType>
        <Valor>Valor</Valor>
        <ArqType>Arquivo</ArqType>
        <ArqSize>Tamanho</ArqSize>
        <LastModified>Última modificação</LastModified>
        <Editor>Editor</Editor>
        <Filtros
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <Primitives
            componentName='SelectFWO'
            selectFWOProps={{
              placeholder: "Filtrar por",
              options: [
                { value: "name", label: "Nome" },
                { value: "typeFile", label: "Tipo de Documento" },
                { value: "createdAt", label: "Data de Modificação" },
                { value: "cash", label: "Valor" },
              ],
              onChange: (selectedOption: any) => handleOrderByChange(selectedOption.value),
              menuWidth: "8.75rem",
              optionWidth: "9.75rem",
              id: "select-filter",
            }}
          />
          <div>
            <button onClick={handleToggleOrder}>
              <ArrowSwapVertical
                variant='Outline'
                color='#7841B0'
                style={{
                  transform: orderDirection === "ASC" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
          </div>
        </Filtros>
      </TableHeader>
      <Tbody>
        {sortedArchives.map((archive: Archives, index: number) => (
          <Projects key={archive.id}>
            <Position>{index + 1}</Position>
            <Name>
              <p>{archive.name}</p>
            </Name>
            <DocType>
              <p>{archive.typeFile}</p>
            </DocType>
            <Valor>
              <p>{utils.formatCurrency(archive.cash)}</p>
            </Valor>
            <ArqType>
              <p>{archive.mimeType}</p>
            </ArqType>
            <ArqSize>
              <p>{archive.size}</p>
            </ArqSize>
            <LastModified>
              <p>{utils.formatDateWithTimeZone(archive.createdAt)}</p>
            </LastModified>
            <Editor
              onMouseEnter={() => handleMouseEnter(archive.id.toString())}
              onMouseLeave={() => handleMouseLeave(archive.id.toString())}
            >
              <Image
                src={
                  archive.user?.avatarUrl ??
                  "https://comoequetala.com.br/images/com_vagasejobs/empresa/marca/95-fd774b66ded35144e6fc1cddfb13902c.png"
                }
                alt='user'
                width={480}
                height={480}
              />
              {hoveredEditors[archive.id.toString()] && (
                <span className='tooltip'>{archive.user?.nickName ?? "Sem editor"}</span>
              )}
            </Editor>
            <Filtros>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <a onClick={() => handleSearchArchive({ path: archive.path })}>
                  <span>
                    Visualizar <ArrowCircleRight variant='Outline' />
                  </span>
                </a>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    onClick={() => {
                      setEditPopUp(!editPopUp)
                      setDocId(archive.id)
                    }}
                  >
                    <Edit variant='Outline' color='#444444' />
                  </button>
                  <button onClick={() => handleDeleteArchive({ id: +archive.id })}>
                    <Trash variant='Outline' color='#DC2424' />
                  </button>
                </div>
              </div>
            </Filtros>
          </Projects>
        ))}
      </Tbody>
    </TableContainer>
  )
}
const ComponentAlert = ({ title, text }: { title: string; text: string }) => {
  Swal.fire({
    icon: "warning",
    title,
    text,
  })
}
export default Documentos
