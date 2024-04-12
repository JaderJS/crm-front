import React, { useEffect, useState } from "react"

import * as Progress from "@radix-ui/react-progress"
import { styled } from "@stitches/react"

interface CustomProgressProps {
  progress: number
  maxProgress?: number
  label?: string
  height?: string
  width?: string
  showPercentage?: boolean
  secundaryColor?: string
}

export function CustomProgress({
  showPercentage,
  secundaryColor,
  progress,
  height,
  width,
  label,
  maxProgress
}: CustomProgressProps) {
  const [progressState, setProgressState] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressState(parseFloat(progress.toFixed(2))) // Formata o progress para 2 casas decimais e converte para número
    }, 1000)
    return () => clearTimeout(timer)
  }, [progress])

    // Calculate the percentage completion only when maxProgress is provided
	const percentage = maxProgress ? (progress / maxProgress) * 100 : 0;
	const transformValue = maxProgress ? `translateX(-${100 - percentage}%)` : `translateX(-${100 - progress}%)`;
	return (
    <ProgressRoot
      value={maxProgress ? percentage : progress}
      style={{
        height: height,
        width: width,
      }}
    >
      {label && <p>{label}</p>}
      <ProgressIndicator style={{ transform: transformValue }} /> {/* Use the calculated transform value */}
      {showPercentage && (
        <span
          style={{
            color: progressState < 90 ? "#7841B0" : secundaryColor ? secundaryColor : "#eee",
          }}
        >
          {progressState.toFixed(2)}%
        </span>
      )}
    </ProgressRoot>
  )
}

const ProgressRoot = styled(Progress.Root, {
  position: "relative",
  overflow: "hidden",
  background: "#EEEEEE",
  borderRadius: "99999px",
  width: "100%",
  height: "1.65rem",
  transform: "translateZ(0)",
  "& p": {
    position: "absolute",
    top: "50%",
    left: "1rem",
    transform: "translateY(-50%)",
    fontSize: "0.75rem",
    fontFamily: "DM Sans",
    fontWeight: 600,
    zIndex: 1,
    color: "#EEE",
  },
  "& span": {
    position: "absolute",
    top: "50%",
    right: "1rem",
    transform: "translateY(-50%)",
    fontSize: "0.75rem",
    fontFamily: "DM Sans",
    fontWeight: 600,
    zIndex: 1,
    color: "#7841B0",
  },
})

const ProgressIndicator = styled(Progress.Indicator, {
  backgroundColor: "#7841B0",
  width: "100%",
  height: "100%",
  transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
})
