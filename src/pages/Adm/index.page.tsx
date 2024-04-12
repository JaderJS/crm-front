import { AdminCard } from "@/components/AdmComponents/CardsOptions"
import { Kanban, OceanProtocol, UserEdit } from "iconsax-react"
import Router from "next/router"

export default function Adm() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        gap: "1rem",
      }}
    >
      <h1>Adm</h1>
      <div
        style={{
          width: "60%",
          height: "60%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <AdminCard
          icon={<UserEdit />}
          title='Gestão de
        Usuários'
          subText='
          Aqui você pode editar,excluir e aprovar usuários.
        '
          link='/Adm/Profiles'
        />
        <AdminCard
          icon={<Kanban />}
          title='Kanban
        Criar/Editar'
          subText='
          Aqui você pode criar e editar os processos.'
          link='/Adm/Boards'
        />
         <AdminCard
          icon={<OceanProtocol/> }
          title='Criar Projeto'
          subText='Aqui você pode criar um novo projeto.'
          link='/Adm/NewProject'
        />
        <AdminCard
          icon={<OceanProtocol/> }
          title='Capacidade Produtiva'
          // subText='Aqui você pode criar um novo projeto.'
          link='/Adm/CapacidadeProdutiva'
        />
      </div>
    </div>
  )
}
