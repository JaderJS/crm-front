import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { Container } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface Props {
  icon: any;
  title: string;
  link: string;
  subText?: string;
}

export function AdminCard({ icon, title, link,subText}: Props) {
  return (
    <Link href={link}
    title={subText}
    >
      <Container>
    
          {icon}
          <h3>{title}</h3>

      </Container>
    </Link>
  );
}
