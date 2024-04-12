import { Container, Content } from "./styles"
import Image from "next/image"
import backgroundLogo from "@/assets/qnplogofundo.svg"
import logov4 from "@/assets/logov4.svg"

export default function ThanksQnp() {
  return (
    <Container>
      <Image
        src={backgroundLogo}
        width={200}
        height={200}
        alt='back'
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "16.6875rem",
          height: "100%",
        }}
      />

      <Content>
        <p>
          <h2>Obrigado por responder!</h2>
          <br /> Nosso time irá estudar as informações e voltamos a nos reunir para o kickoff!
        </p>
        <Image
          src={logov4}
          width={174}
          height={100}
          alt='logov4'
          style={{
            width: "10.875rem",
            height: "3.375rem",
          }}
        />
      </Content>
    </Container>
  )
}
