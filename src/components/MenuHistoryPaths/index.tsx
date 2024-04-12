import Link from "next/link"
import { Container, Links } from "./styles"
import { AvatarDropDownMenu } from "../AvatarDropDownMenu"
import  Router  from "next/router"
import { CloseCircle } from "iconsax-react"
interface Links {
  path?: string
  name: string
  onClick?: () => void // Adicionando a propriedade onClick opcional
  active?: boolean
}
interface MenuHistoryPathsProps {
  items?: Links[]
  loading: boolean
  closeButton?: boolean

}
export function MenuHistoryPaths({ items,loading,closeButton}: MenuHistoryPathsProps) {
  if(loading) return <p>Carregando...</p>
  return (
    <Container>
      <Links>
      {closeButton && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "1rem",
            height: "1rem",
            marginRight: "1rem",
          }}
        >
          <button onClick={() => Router.back()}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#000",
              fontSize: "1rem",
              fontWeight: "bold",
            
            }}
          >
            <CloseCircle 
              style={{
                width: "1rem",
                height: "1rem",
                color: "#7841B0",
              }}
            />
          </button>
        </div>
      )}
        {items?.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <div key={item.name} style={{ display: "inline-block"}}>
              {!isLast ? (
                item.onClick ? (
                  <a onClick={item.onClick} style={{ cursor: "pointer" }}>
                    {item.name}
                    {!isLast && " > "}
                  </a>
                ) : (
                  item.path && (
                    <Link href={item.path}>
                      {item.name} {!isLast && " > "}
                    </Link>
                  )
                )
              ) : (
                <span>
                  <p
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      wordWrap: "break-word",
                      whiteSpace: "nowrap",
                      fontSize: "1rem",
                    }}
                    title={item.name}
                  >
                    {item.name}
                  </p>
                </span>
              )}
            </div>
          )
        })}
      </Links>
      <div
      // style={{
      //   marginRight: "1rem",
      // }}
      >
        <AvatarDropDownMenu />
      </div>
    </Container>
  )
}
