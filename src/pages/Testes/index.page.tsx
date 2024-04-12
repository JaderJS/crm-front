import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { PrimitivesBigText } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesBigText"
import { PrimitivesInvesters } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesInvesters"
import { PrimitivesProjects } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesProjects"
import { PrimitivesState } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesState"
import { PrimitivesHours } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesTimeInput"
import { gql } from "@apollo/client"
import { ToastContainer, toast } from "react-toastify"


export default function Testes() {
  const notify = () => toast("Wow so easy !")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        width: "97vw",
        backgroundColor: "#f5f5f5",
        overflow: "auto",
        padding: "1.25rem",
      }}
    >
    {/* <PrimitivesProjects 
      onChange={(values) => console.log(values)}
    /> */}
  <PrimitivesBigText 
    onChange={(e: any) => console.log(e.target.value)}
  />
    </div>
  )
}
