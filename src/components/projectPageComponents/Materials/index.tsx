import { ArrowRight, Diagram, Edit, ElementPlus, Gallery, MessageTick, PathTool, Setting2 } from "iconsax-react"
import { AjustarLinks, Container, Item, ItemHeader, ItemsContainer } from "./styles"
import { DefaultButton } from "@/components/DefaultButton"
import { useEffect } from "react"

interface pathsUrl {
  copys: string
  designs: string
  plannings: string
  archives: string
}

interface MaterialsProps {
  defaultData: pathsUrl
  clickShowPopUp: () => void
}

export function Materials({ clickShowPopUp, defaultData }: MaterialsProps) {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h3>Materiais</h3>
        <AjustarLinks onClick={clickShowPopUp}>
          Ajustar links <Setting2 variant='Outline' />
        </AjustarLinks>
      </div>
      <ItemsContainer>
        <Item>
          <ItemHeader>
            <Edit variant='Outline' />
            <div>
              <h3>Copys</h3>
              <p>Confira todas as copys produzidas</p>
            </div>
          </ItemHeader>
          <a href={defaultData?.copys} target='_blank' rel='noopener noreferrer'>
            <DefaultButton svgSize={"small"} animationSvg={"arrowRight"} disabled={defaultData?.copys ? false : true}>
              Conferir <ArrowRight variant='Outline' />
            </DefaultButton>
          </a>
        </Item>

        <Item>
          <ItemHeader>
            <PathTool variant='Outline' />
            <div>
              <h3>Designs</h3>
              <p>Confira todos os criativos produzidos</p>
            </div>
          </ItemHeader>
          <a href={defaultData?.designs} target='_blank' rel='noopener noreferrer'>
            <DefaultButton svgSize={"small"} animationSvg={"arrowRight"} disabled={defaultData?.designs ? false : true}>
              Conferir <ArrowRight variant='Outline' />
            </DefaultButton>
          </a>
        </Item>
        <Item>
          <ItemHeader>
            <ElementPlus variant='Outline' />
            <div>
              <h3>Planejamento</h3>
              <p>Confira o planejamento do projeto</p>
            </div>
          </ItemHeader>
          <a href={defaultData?.plannings} target='_blank' rel='noopener noreferrer'>
            <DefaultButton
              svgSize={"small"}
              animationSvg={"arrowRight"}
              disabled={defaultData?.plannings ? false : true}
            >
              Conferir <ArrowRight variant='Outline' />
            </DefaultButton>
          </a>
        </Item>
        <Item>
          <ItemHeader>
            <Diagram variant='Outline' />
            <div>
              <h3>Power Bi</h3>
              <p>Confira o BI do projeto</p>
            </div>
          </ItemHeader>
          <a href={defaultData?.copys} target='_blank' rel='noopener noreferrer'>
            <DefaultButton svgSize={"small"} animationSvg={"arrowRight"} disabled={true}>
              Conferir <ArrowRight variant='Outline' />
            </DefaultButton>
          </a>
        </Item>
        <Item>
          <ItemHeader>
            <MessageTick variant='Outline' />
            <div>
              <h3>CRM</h3>
              <p>Confira o CRM do projeto</p>
            </div>
          </ItemHeader>
          <a href={defaultData?.copys}>
            <DefaultButton svgSize={"small"} animationSvg={"arrowRight"} disabled={true}>
              Conferir <ArrowRight variant='Outline' />
            </DefaultButton>
          </a>
        </Item>
        <Item>
          <ItemHeader>
            <Gallery variant='Outline' />
            <div>
              <h3>Pasta do cliente</h3>
              <p>Confira os Arquivos</p>
            </div>
          </ItemHeader>
          <a href={defaultData?.archives} target='_blank' rel='noopener noreferrer'>
            <DefaultButton
              svgSize={"small"}
              animationSvg={"arrowRight"}
              disabled={defaultData?.archives ? false : true}
            >
              Conferir <ArrowRight variant='Outline' />
            </DefaultButton>
          </a>
        </Item>
      </ItemsContainer>
    </Container>
  )
}
