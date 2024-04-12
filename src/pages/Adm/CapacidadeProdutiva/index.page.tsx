import { SelectedUserContainer } from "@/components/CapacidadeProdutivaComponents/SelectedUserContainer"
import { SquadContainer } from "@/components/CapacidadeProdutivaComponents/SquadContainer"
import { gql, useQuery } from "@apollo/client"
import { useState } from "react"
import { Container } from "./styles"
import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"

//  const UPSERT_CAPACIDADE_PRODUTIVA_MUTATION = gql`
//     mutation UpsertCapacidadeProdutiva($id:number) {
//        upsertOneInvest(
//            where: {id: $id},

//        ) {
//         user {
//             uuid
//         }
//        }
//     }
//     `;

export default function CapacidadeProdutiva() {
  const [selectedUuid, setSelectedUuid] = useState<string | undefined>(undefined)
  console.log(selectedUuid, "selectedUuid")
  return (
    <Container>
      <MenuHistoryPaths items={[{ name: "Capacidade Produtiva" }]} loading={false} closeButton={false} />
      <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: "100vh",
        gap: "1rem",
      }}
      >

      <SquadContainer selectedUuid={(uuid: string) => setSelectedUuid(uuid)} />
      {selectedUuid && <SelectedUserContainer uuid={selectedUuid} />}
      </div>
    </Container>
  )
}
