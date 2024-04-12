import router from "next/router"
import { ButtonContainer, SvgContainer } from "./styles"
import { ArrowLeft } from "iconsax-react"

interface ButtonBackPageProps {
  path?: string
}
export function ButtonBackPage({ path }: ButtonBackPageProps) {
  return (
    <ButtonContainer onClick={() => path? router.push(path) : router.back()
    }>
      <SvgContainer>
        <ArrowLeft variant='Outline' />
      </SvgContainer>
      <p>Voltar</p>
    </ButtonContainer>
  )
}
