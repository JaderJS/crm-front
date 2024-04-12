import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Colli from "@/assets/colli.webp"
export default function PageNotFound() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/")
    }, 6000)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <p style={{ color: "black" }}>
         <strong>
          404 | Page Not Found
         </strong>
      </p>
      {/* <Image src={Colli}
       alt="gif"
       width={600}
       height={400}
       /> */}
    </div>
  )
}
