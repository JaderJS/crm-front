import { useContext, useEffect, useState } from "react"
import {
  AccordionItem,
  IconAndTitle,
  IsActive,
  LogOutButton,
  LogoAndButton,
  MenuContainer,
  MenuContainerBoard,
  StyledChevron,
  StyledContent,
  StyledTrigger,
} from "./styles"
import { styled, keyframes } from "@/styles"
import Image from "next/image"
import MenuLogo from "../../assets/logo-pirmrio.svg"
import MenuLogoClosed from "../../assets/logotipomenuclose.svg"
import * as Accordion from "@radix-ui/react-accordion"
import React from "react"
import {
  Activity,
  ArrowDown2,
  CloseCircle,
  DollarCircle,
  Home,
  Logout,
  People,
  Personalcard,
  Profile2User,
  ProfileCircle,
  Shop,
} from "iconsax-react"
import { useRouter } from "next/router"
import Link from "next/link"
import { AuthContext } from "@/contexts/AuthContext"
import { gql, useQuery } from "@apollo/client"

// const menuItemsLuis = [
//   {
//     id: "item-1",
//     title: "Perfil",
//     icon: <ProfileCircle color="#FFFFFF"variant="Outline" />,
//     links: [
//       { label: "Perfil", href: "/Perfil" },
//       { label: "Projetos", href: "/Perfil/Projetos" },
//       { label: "Informações", href: "/Perfil/Informacoes" },
//       { label: "Documentos", href: "/Perfil/Documentos" },
//     ],
//   },
//   {
//     id: "item-2",
//     title: "Home/Menu",
//     icon: <Home color="#FFFFFF" variant="Outline"/>,
//     links: [
//       { label: "Home", href: "/" },
//       { label: "Projetos", href: "/Projetos" },
//       { label: "Links de ativos", href: "/Projetos" },
//       { label: "Organograma", href: "/Organograma" },
//       { label: "Game Of Squads", href: "/GameOfSquads" },
//       { label: "Serviços Upsell", href: "/ServicosUpsell" },
//     ],
//   },
//   {
//     id: "item-3",
//     title: "Financeiro",
//     icon: <DollarCircle color="#ffffff" variant="Outline"/>,
//     links: [
//       { label: "Cadastro de projetos", href: "/Financeiro/CadastroDeProjetos" },
//       { label: "Projetos", href: "/Financeiro/Projetos" },
//       { label: "Solicitações", href: "/Financeiro/Solicitacoes" },
//       { label: "Investidores", href: "/Financeiro/Investidores" },
//     ],
//   },
//   {
//     id: "item-4",
//     title: "Atribuições",
//     icon: <People color="#ffffff" variant="Outline" />,
//     links: [
//       { label: "Atribuição de Clientes", href: "/Atribuicoes/AtribuicaoDeClientes" },
//       { label: "Wip Limit", href: "/Atribuicoes/WipLimit" },
//       { label: "Atividade Squad", href: "/Atribuicoes/AtividadeSquad" },
//       { label: "Atividade Pessoa", href: "/Atribuicoes/AtividadePessoa" },
//     ],
//   },
//   {
//     id: "item-5",
//     title: "P&P",
//     icon: <Profile2User color="#ffffff" variant="Outline" />,
//     links: [
//       { label: "Vagas", href: "/PP/Vagas" },
//       { label: "Investidores", href: "/PP/Investidores" },
//       { label: "Testes práticos", href: "/PP/TestesPraticos" },
//       { label: "Gestão de contratos", href: "/PP/GestaoDeContratos" },
//       { label: "Benefícios", href: "/PP/Beneficios" },
//     ],
//   },
//   {
//     id: "item-6",
//     title: "Vendas",
//     icon: <Shop color="#ffffff"  variant="Outline"/>,
//     links: [
//       { label: "Cadastro de Clientes", href: "/Vendas/CadastroDeClientes" },
//     ],
//   },
//   {
//     id: "item-7",
//     title: "Customer Success",
//     icon: <Personalcard color="#ffffff" variant='Outline'/>,
//     links: [
//       { label: "Cad QNP", href: "/CadastroClienteQnp" },
//     ],
//   }

// ];

const MENUITEMS = gql`
  query menu {
    selfTemplate {
      sideBar
    }
  }
`

export function MenuBar() {
  const { data } = useQuery(MENUITEMS, {
    fetchPolicy: "cache-and-network",
    ssr: false,
  })
  const router = useRouter()

  const currentUrl = router.pathname
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const { signOut } = useContext(AuthContext)
  const [isLinksVisible, setIsLinksVisible] = useState(false)
  async function handleSignOut() {
    await signOut()
  }

  const [menuItems, setMenuItems] = useState(data?.selfTemplate?.sideBar || [])
  useEffect(() => {
    if (data) {
      const menu = data.selfTemplate.sideBar
      setMenuItems(menu)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      const menu = data.selfTemplate.sideBar.map((item: any) => ({
        ...item,
        links: item.links.filter((link: any, index: number, self: any) => 
          index === self.findIndex((t: { href: any }) => t.href === link.href)
        )
      }));
      setMenuItems(menu);
    }
  }, [data]);

  function isItemActive(item: { links: { href: string }[] }) {
    return item.links.some((link: { href: string }) => {
      // Verifique se a URL atual corresponde ao href do link ou começa com o href seguido de uma barra adicional
      return router.pathname === link.href || router.pathname.startsWith(link.href + "/")
    })
  }

  const activeAccordionItem = menuItems.find((item: { links: { href: string }[] }) =>
    item.links.some((link: { href: string }) => {
      const linkParts = link.href.split("/").filter((part) => part.length > 0)
      const routeParts = router.pathname.split("/").filter((part) => part.length > 0)

      if (linkParts.length > routeParts.length) {
        return false
      }

      // Verifica se a rota atual começa com a URL do link e se as partes correspondentes são iguais
      return linkParts.every((part, index) => {
        // Se a parte do link for um marcador dinâmico (números entre colchetes), considere como correspondente
        if (part.startsWith("[") && part.endsWith("]")) {
          return true
        }
        return routeParts[index] === part
      })
    }),
  )

  function isAccordionItemActive(item: { links: { href: string; label: string }[] }, currentUrl: string) {
    return item.links.map((link) => {
      // Divide a rota atual em partes
      const routeParts = currentUrl.split("/").filter((part) => part.length > 0)

      // Divide a URL do link em partes
      const linkParts = link.href.split("/").filter((part) => part.length > 0)

      if (routeParts.length !== linkParts.length) {
        return ""
      }

      const isActive = routeParts.every((part, index) => {
        if (linkParts[index].startsWith("[") && linkParts[index].endsWith("]")) {
          // Se a parte do link for um marcador dinâmico (números entre colchetes), considere como correspondente
          return true
        }
        return linkParts[index] === part
      })

      // Verifica se o link está ativo e retorna "active" ou uma string vazia
      return isActive ? "active" : ""
    })
  }

  // useEffect(() => {
  //   if (activeAccordionItem) {
  //     setIsMenuOpen(true)

  //     setTimeout(() => {
  //       setIsLinksVisible(true)
  //     }, 650)
  //   }
  // }, [activeAccordionItem])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [router])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function getIconByTitle(title: any) {
    switch (title) {
      case "Perfil":
        return <ProfileCircle color='#FFFFFF' variant='Outline' />
      case "Home":
        return <Home color='#FFFFFF' variant='Outline' />
      case "Financeiro":
        return <DollarCircle color='#ffffff' variant='Outline' />
      case "Operação":
        return <People color='#ffffff' variant='Outline' />
      case "P&P":
        return <Profile2User color='#ffffff' variant='Outline' />
      case "Vendas":
        return <Shop color='#ffffff' variant='Outline' />
      case "Customer Success":
        return <Personalcard color='#ffffff' variant='Outline' />
      case "Gestão":
        return <Activity color='#ffffff' variant='Outline' />
      case "CS":
        return <Personalcard color='#ffffff' variant='Outline' />
      case "ADM":
        return <Activity color='#ffffff' variant='Outline' />
      default:
        return null
    }
  }

  if (router.pathname.includes("Board")) {
    return (
      <MenuContainerBoard
        open={isMenuOpen}
        onClick={() => {
          if (isMenuOpen) {
            return
          }
          setIsMenuOpen(!isMenuOpen)
        }}
        style={{
          cursor: isMenuOpen ? "default" : "pointer",
        }}
      >
        <LogoAndButton open={isMenuOpen}>
          <Image src={isMenuOpen ? MenuLogo : MenuLogoClosed} alt='Logo' width={91} height={33} quality={100} />
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
            }}
            style={{
              display: isMenuOpen ? "flex" : "none",
            }}
          >
            <CloseCircle size='32' color='#FFFFFF' />
          </button>
        </LogoAndButton>
        <Accordion.Root
          type='single'
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
          defaultValue={activeAccordionItem?.id}
        >
          {menuItems
            .filter((item: { links: string | any[] }) => item.links.length > 0)
            .map((item: { id?: any; title?: any; links: any }) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                onClick={() => {
                  if (!isMenuOpen) {
                    setIsMenuOpen(true)
                  }
                }}
              >
                <StyledTrigger>
                  <IconAndTitle open={isMenuOpen}>
                    <IsActive active={isItemActive(item)} />
                    {getIconByTitle(item.title)}
                    <span>{item.title}</span>
                  </IconAndTitle>
                  <StyledChevron open={isMenuOpen}>
                    <ArrowDown2 color='#FFFFFF' />
                  </StyledChevron>
                </StyledTrigger>
                <StyledContent open={isMenuOpen}>
                  {item.links.map((link: any, index: number) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={isAccordionItemActive(item, router.pathname)[index]}
                      prefetch={true}

                    >
                      {link.label}
                    </Link>
                  ))}
                </StyledContent>
              </AccordionItem>
            ))}
        </Accordion.Root>
        <LogOutButton
          onClick={() => {
            handleSignOut()
          }}
          open={isMenuOpen}
        >
          <Logout size='32' color='#ffffff' />
          <span>Sair</span>
        </LogOutButton>
      </MenuContainerBoard>
    )
  }

  return (
    <MenuContainer
      open={isMenuOpen}
      onClick={() => {
        if (isMenuOpen) {
          return
        }
        setIsMenuOpen(!isMenuOpen)
      }}
      style={{
        cursor: isMenuOpen ? "default" : "pointer",
      }}
    >
      <LogoAndButton open={isMenuOpen}>
        <Image src={isMenuOpen ? MenuLogo : MenuLogoClosed} alt='Logo' width={91} height={33} quality={100} />
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
          }}
          style={{
            display: isMenuOpen ? "flex" : "none",
          }}
        >
          <CloseCircle size='32' color='#FFFFFF' />
        </button>
      </LogoAndButton>
      <Accordion.Root
        type='single'
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
        defaultValue={activeAccordionItem?.id}
      >
        {menuItems
          .filter((item: { links: string | any[] }) => item.links.length > 0)
          .map((item: { id?: any; title?: any; links: any }) => (
            <AccordionItem
              key={item.id}
              value={item.id + Math.random()}
              onClick={() => {
                if (!isMenuOpen) {
                  setIsMenuOpen(true)
                }
              }}
            >
              <StyledTrigger>
                <IconAndTitle open={isMenuOpen}>
                  <IsActive active={isItemActive(item)} />
                  {getIconByTitle(item.title)}
                  <span>{item.title}</span>
                </IconAndTitle>
                <StyledChevron open={isMenuOpen}>
                  <ArrowDown2 color='#FFFFFF' />
                </StyledChevron>
              </StyledTrigger>
              <StyledContent open={isMenuOpen}>
                {item.links.map((link: any, index: number) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={isAccordionItemActive(item, router.pathname)[index]}
                    prefetch={true}
                  >
                    {link.label}
                  </Link>
                ))}
              </StyledContent>
            </AccordionItem>
          ))}
      </Accordion.Root>
      <LogOutButton
        onClick={() => {
          handleSignOut()
        }}
        open={isMenuOpen}
      >
        <Logout size='32' color='#ffffff' />
        <span>Sair</span>
      </LogOutButton>
    </MenuContainer>
  )
}
