import * as Icons from "iconsax-react" // Certifique-se de importar todos os ícones que deseja usar
import Skeleton from "react-loading-skeleton"

import { Button, Container, ContainerLoading, Description, ImageOrIcon, Title } from "./styles"
import Image from "next/image"
import Link from "next/link"
import router from "next/dist/client/router"
interface CardProps {
  id?: number
  title?: string
  description?: string
  icon?: any
  image?: string
  link?: string
  buttonTitle?: string
  backgroundVariant?: "white" | "black" | "purple"
  enable: boolean
  loading?: boolean
}

export function HomeCard({
  id,
  backgroundVariant = "white",
  title,
  description,
  icon,
  image,
  link,
  buttonTitle,
  enable,
  loading,
}: CardProps) {
  type IconType = keyof typeof Icons

  interface CardProps {
    id: number
    title: string
    description: string
    icon?: IconType
    image?: string
    link: string
    buttonTitle: string
    backgroundVariant?: "white" | "black" | "purple"
    loading?: boolean
  }

  const IconComponent = icon ? (Icons[icon as IconType] as React.FC<any>) : null

  if (loading) {
    return (
      <ContainerLoading className='Disabled'>
        <ImageOrIcon>
          <Skeleton width={32} height={32} />
        </ImageOrIcon>
        <Title>
          <Skeleton width={60} />
        </Title>
        <Description>
          <Skeleton width='100%' count={3} inline />
        </Description>

        <Skeleton width={100} />
      </ContainerLoading>
    )
  }

  return (
    <Container key={id} background={backgroundVariant as "white" | "black" | "purple" | undefined} enable={enable}
      // onClick={() => {link ? router.push(link) : null}}
      onClick={enable ? () => {link ? router.push(link) : null} : undefined}
      style={enable ? {cursor: "pointer"} : {cursor: "default"}}
    >
      {enable && (
        <>
          <ImageOrIcon>
            {IconComponent ? (
              <IconComponent />
            ) : (
              <Image src={image!} alt={title!} width={100} height={100} quality={90} priority={true} />
            )}
          </ImageOrIcon>
          <Title color={backgroundVariant}>{title}</Title>
          <Description color={backgroundVariant}>{description}</Description>
          {/* <Link href={link!}>
            <Button>
              {buttonTitle}
              <Icons.ArrowRight variant='Outline' />
            </Button>
          </Link> */}
        </>
     
      )}
    </Container>
  )
}
