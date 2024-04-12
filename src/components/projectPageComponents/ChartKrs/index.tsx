import { OkrProject, OkrProjectHistory } from "@/types"
import React, { useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import dayjs from "dayjs"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export interface ChartKrsProps {
  krs: OkrProject
}

const ChartKrs = ({ krs }: ChartKrsProps) => {
  const historyKrs = krs.kr.sort((a: OkrProjectHistory, b: OkrProjectHistory) =>
    dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1,
  )

  const labels = historyKrs.map((kr: OkrProjectHistory) => dayjs(kr.createdAt).format("DD [de] MMM"))

  // Valor do progresso
  const valuesXProgress = historyKrs.map((kr: OkrProjectHistory) => kr.progress)

  // Valor do alvo (target)
  const valuesXTarget = historyKrs.map((kr: OkrProjectHistory) => kr.target)

  const data = {
    labels,
    datasets: [
      {
        label: "PROGRESSO",
        data: valuesXTarget,
       
        borderColor: "rgb(152, 2, 252)",
        backgroundColor: "rgba(152, 2, 252, 0.5)",
        fill: false,
        

      },
      {
        label: "ALVO",
        data: valuesXProgress,
        borderColor: "#26C666", 
        backgroundColor: "rgba(38, 198, 102, 0.5)", 
       
        borderDash: [2, 2], // Linha pontilhada para diferenciar
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Mostra a legenda para diferenciar as linhas
      },
    },
  }

  return <Line options={options} data={data} />
}

export default ChartKrs
