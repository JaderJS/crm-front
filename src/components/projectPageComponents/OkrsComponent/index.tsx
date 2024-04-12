import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { ArrowButton, Container } from "./styles"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { ArrowDown2, ArrowLeft2, ArrowRight, ArrowRight2 } from "iconsax-react"
import { OkrObjectiveProject, OkrProject } from "@/types"
import router from "next/router"
import Link from "next/link"
import { DefaultButton } from "@/components/DefaultButton"
import { Utils } from "@/utils/utils"
const utils = new Utils()

export function Okrs({ OkrObjectiveProject }: { OkrObjectiveProject?: OkrObjectiveProject[] }) {
  const [clientSide, setClientSide] = useState(false)
  const params = router.query
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "snap",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    slides: {
      perView: .8, // Apenas um slide visível de cada vez
      // spacing: 30, // Ajuste o espaçamento conforme necessário
    },

  })
  function slideNext() {
    instanceRef.current?.next()
  }
  function slidePrev() {
    instanceRef.current?.prev()
  }

  useEffect(() => {
    setClientSide(true)
  }, [])

  if (!clientSide) {
    return <></>
  }


  if (!OkrObjectiveProject || OkrObjectiveProject.length === 0 || OkrObjectiveProject?.[0]?.okr?.length === 0) {
    return (
      <Container>
        {OkrObjectiveProject?.length === 0 ? <h4>Nenhum Objetivo definido</h4> : <h4>Nenhum Key Result definido</h4>}
        <Link href={`/Perfil/Projeto/Okrs/${params.id}`}>
          <DefaultButton>
            {OkrObjectiveProject?.length === 0 ? <p>Definição de Objetivos</p> : <p>Definição de Key Results</p>}
            <ArrowRight variant='Outline' width={"1rem"} height={"1rem"} />
          </DefaultButton>
        </Link>
      </Container>
    )
  }
  if (OkrObjectiveProject[0].okr.length === 1) {
    return (
      <Container>
        <div
          className='content'
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "left",
              width: "100%",
              gap: "2.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                height: "100%",
                gap: "0.5rem",
                textAlign: "left",
                maxWidth: "19.875rem",
                width: "100%",
              }}
            >
              <h4
                style={{
                  textOverflow: "ellipsis",
                  maxWidth: "19.875rem",
                  textAlign: "left",
                }}
              >
                {OkrObjectiveProject[0].okr[0].title}
              </h4>
              {/* <p
                style={{
                  textOverflow: "ellipsis",
                  maxWidth: "19.875rem",
                  width: "100%",
                  height: "4.1875rem",
                  overflow: "hidden",
                  textAlign: "center",
                  wordWrap: "break-word",
                }}
              >
                {OkrObjectiveProject[0].okr[0].title}
              </p> */}
            </div>
            <div
              className='progress-bar'
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
                minWidth: "6.375rem",
              }}
            >
              <CircularProgressbar
                value={utils.calcProgressOkr(OkrObjectiveProject[0].okr[0])}
                text={`${utils.calcProgressOkr(OkrObjectiveProject[0].okr[0])}%`}
                styles={{
                  root: {
                    width: "6.375rem",
                    minWidth: "6.375rem",
                    maxHeight: "6.375rem",
                  },
                  path: {
                    stroke: "#7841B0",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    transform: "rotate(1turn)",
                    transformOrigin: "center center",
                  },
                  trail: {
                    stroke: "#444444",
                    strokeLinecap: "butt",
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                  text: {
                    fill: "#202128",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                }}
              />
            </div>
          </div>
          <Link href={`/Perfil/Projeto/Okrs/${params.id}`}>
            <DefaultButton
              style={{
                width: "11.3125rem",
                height: "2.375rem",
              }}
            >
              Ver mais
              <ArrowRight variant='Outline' width={"1rem"} height={"1rem"} />
            </DefaultButton>
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      {OkrObjectiveProject && (
        <div
          className='navigation-wrapper'
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <ArrowButton onClick={slidePrev} className='arrow-left'>
            <ArrowLeft2 variant='Outline' width={"3rem"} height={"3rem"} />
          </ArrowButton>

          <div ref={sliderRef} className='keen-slider'>
            {OkrObjectiveProject?.[0]?.okr.map((kr: OkrProject, index) => {
              const mostRecentOkrHistory = kr.kr[kr.kr.length - 1]

              return (
                <div
                  key={kr.id}
                  className='keen-slider__slide'
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    
                  }}
                >
                  <div
                    className='content'
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      // width: "100%",
                      height: "100%",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        textAlign: "left",
                        width: "100%",
                        gap: "2.5rem",
                      }}
                    >
                     
                        <h4
                          style={{
                            textOverflow: "ellipsis",
                            maxWidth: "19.875rem",
                            textAlign: "left",
                          }}
                        >
                          {kr?.title}
                        </h4>
                      <div
                        className='progress-bar'
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          height: "100%",
                          minWidth: "6.375rem",
                          maxWidth: "6.375rem",
                        }}
                      >
                        <CircularProgressbar
                          value={utils.calcProgressOkr(kr)}
                          text={`${utils.calcProgressOkr(kr)}%`}
                          styles={{
                            root: {
                              width: "6.375rem",
                              minWidth: "6.375rem",
                              maxHeight: "6.375rem",
                            },
                            path: {
                              stroke: "#7841B0",
                              strokeLinecap: "butt",
                              transition: "stroke-dashoffset 0.5s ease 0s",
                              transform: "rotate(1turn)",
                              transformOrigin: "center center",
                            },
                            trail: {
                              stroke: "#444444",
                              strokeLinecap: "butt",
                              transform: "rotate(0.25turn)",
                              transformOrigin: "center center",
                            },
                            text: {
                              fill: "#202128",
                              fontSize: "1rem",
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </div>
                    </div>
                    <Link href={`/Perfil/Projeto/Okrs/${params.id}`}>
                      <DefaultButton
                        style={{
                          width: "11.3125rem",
                          height: "2.375rem",
                        }}
                      >
                        Ver mais
                        <ArrowRight variant='Outline' width={"1rem"} height={"1rem"} />
                      </DefaultButton>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <ArrowButton onClick={slideNext} className='arrow-right'>
            <ArrowRight2 variant='Outline' width={"3rem"} height={"3rem"} />
          </ArrowButton>
        </div>
      )}
    </Container>
  )
}
