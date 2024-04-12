import { Backdrop, Container } from "./styles"


interface IPopUpChildrenProps {
    children: any
    }

export function PopUpChildren({ children }: IPopUpChildrenProps) {
  return (
    <Backdrop>
      <Container>{children}</Container>
    </Backdrop>
  )
}
