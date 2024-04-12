import * as Dialog from "@radix-ui/react-dialog"
import { CloseCircle } from "iconsax-react"
import { useEffect, useState } from "react"
import { HeaderContainer } from "../AtribuiçãoComponents/Squad/styles"
import { PopUpChildren } from "../BoardComponents/primitivesBoard/PopUpComponents/PopUpChildren"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { Project } from "@/types"
import { Container } from "./styles"

export function ProjectGraph() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <button onClick={() => setIsDialogOpen(true)}>
          <p>Ver gráfico</p>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Container
           
          >
        <iframe
          title="[LM] V4 Company Colli & Associados"
          width="100%"
          height="100%"
          src="https://bi.collieassociados.com/tv1"
          allowFullScreen
        ></iframe>
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
