import { ArrowRight, DocumentCopy } from "iconsax-react"
import { Card, SvgAndTittle } from "./styles"
import { DefaultButton } from "@/components/DefaultButton"
import router from "next/router"
import Link from "next/link"

interface CardProjectProps {
  link: string
  text: string
}

export function CardProject({ link, text }: CardProjectProps) {
  return (
    <Card>
      <SvgAndTittle>
        <DocumentCopy variant='Outline' />
        <h3>{text}</h3>
      </SvgAndTittle>
      <Link href={link}>
        <DefaultButton
          style={{
            width: "100%",
            height: "2.375rem",
            minHeight: "2.375rem",
            fontSize: "0.75rem",
            borderRadius: "10px",
          }}
          backgroundColor={"purple"}
          svgSize={"small"}
          animationSvg={"arrowRight"}
        >
          Ver tudo <ArrowRight variant='Outline' />
        </DefaultButton>
      </Link>
    </Card>
  )
}
