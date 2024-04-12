import { useState, useEffect } from "react"
import { ArrowRight, CloseCircle, Trash } from "iconsax-react"
import { Backdrop, ButtonsContainer, CloseButton, Container } from "./styles"
import { DefaultButton } from "@/components/DefaultButton"
import { Utils } from "@/utils/utils"
import { FieldSteps, FieldFlags, HistoryFlag, HistoryStep, HistoryMonthlyRecurringRevenue } from "@/types"
import { Primitives } from "@/components/Primitives"
import { PrimitivesCashInput } from "@/components/BoardComponents/primitivesBoard/components/PrimitivesCashInput"
import { gql, useMutation } from "@apollo/client"
import Swal from "sweetalert2"

const DELETE_ONE_HISTORY_FLAG = gql`
  mutation DeleteOneHistoryFlag($where: HistoryFlagWhereUniqueInput!) {
    deleteOneHistoryFlag(where: $where) {
      id
    }
  }
`
const DELETE_ONE_HISTORY_STEP = gql`
  mutation DeleteOneHistoryStep($where: HistoryStepWhereUniqueInput!) {
    deleteOneHistoryStep(where: $where) {
      id
    }
  }
`

const DELETE_ONE_HISTORY_MRR = gql`
mutation DeleteOneHistoryMonthlyRecurringRevenue ($where: HistoryMonthlyRecurringRevenueWhereUniqueInput!) {
 deleteOneHistoryMonthlyRecurringRevenue(where: $where) {
    id
 }
}
`

interface PopUpSelectInfosProps {
  Mrr: boolean
  Step: boolean
  Flag: boolean
  closePopUp: () => void
  callBack: (data: any) => any
  historyFlags: HistoryFlag[]
  historySteps: HistoryStep[]
  historyMrr: HistoryMonthlyRecurringRevenue[]
  callBackProjectPage?: (data: any) => any
  userRoot?: boolean
  refetch?: Function
}

interface IselectInfosProps {
  step: string
  flag: string
  mrr: number
  stepTransitionAt: Date
  flagTransitionAt: Date
  mrrTransitionAt: Date
}

const utils = new Utils()

export function PopUpSelectInfos({
  Mrr,
  Step,
  Flag,
  closePopUp,
  callBack,
  callBackProjectPage,
  historyFlags,
  historySteps,
  historyMrr,
  userRoot,
  refetch,
}: PopUpSelectInfosProps) {
  console.log("historyFlags", historyFlags)
  console.log("historySteps", historySteps)
  console.log("historyMrr", historyMrr)
  //================================================================
  // Integrations
  const [data, setData] = useState<IselectInfosProps>()
  const defaultSteps = Object.entries(FieldSteps).map(([key, value]) => ({
    value: value,
    label: key.toUpperCase(),
  }))

  const defaultFlags = Object.entries(FieldFlags).map(([key, value]) => ({
    value: value,
    label: key.toUpperCase(),
  }))
  useEffect(() => {
    callBack(data)
  }, [data])

  let content = null
  const [selectedData, setSelectedData] = useState<IselectInfosProps>()

  const [deleteFlag] = useMutation(DELETE_ONE_HISTORY_FLAG)
  const [deleteStep] = useMutation(DELETE_ONE_HISTORY_STEP)
  const [deleteMrr] = useMutation(DELETE_ONE_HISTORY_MRR)
  switch (true) {
    case Mrr:
      content = (
        <Backdrop>
          <Container>
            <CloseButton onClick={closePopUp}>
              <CloseCircle variant='Outline' />
            </CloseButton>
            <h2>Atualize o MRR </h2>
            {historyMrr.map((mrr: HistoryMonthlyRecurringRevenue) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                key={mrr.id}
              >
                <p>{utils.formatCurrency(mrr.revenue)}</p>
                <p>{utils.formatToDDMMAAAA(mrr.transitionAt)}</p>
                {userRoot && (
                  <span>
                    <button
                           onClick={() => {
                            Swal.fire({
                              title: "Você tem certeza?",
                              text: "Você não será capaz de reverter isso!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#7841B0",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Sim, deletar!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteMrr({ variables: { where: { id: mrr.id } } })
                                refetch && refetch()
                                Swal.fire("Deletado!", "Seu MRR foi deletado.", "success")
                              }
                            })
                          }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#FF0000",
                      }}
                    >
                      <Trash
                        style={{
                          width: "1rem",
                          height: "1rem",
                        }}
                      />
                    </button>
                  </span>
                )}
              </div>
            ))}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1.37rem",
                width: "100%",
              }}
            >
              <PrimitivesCashInput
                onBlur={(e: any) => {
                  setSelectedData((prev: any) => ({ ...prev, mrr: e }))
                }}
              />

              <Primitives
                componentName='DateInput'
                dateInputProps={{
                  name: "date",
                  label: "Data de alteração*",
                  onChange: (date) => {
                    setSelectedData((prev: any) => ({ ...prev, mrrTransitionAt: date }))
                  },
                }}
              />
            </div>

            <ButtonsContainer>
              <DefaultButton
                onClick={() => {
                  closePopUp()
                }}
              >
                Cancelar
              </DefaultButton>
              <DefaultButton
                onClick={() => {
                  setData(selectedData)
                  callBackProjectPage && callBackProjectPage(selectedData)
                }}
                svgSize={"small"}
                animationSvg={"arrowRight"}
              >
                Alterar <ArrowRight />
              </DefaultButton>
            </ButtonsContainer>
          </Container>
        </Backdrop>
      )
      break

    case Step:
      content = (
        <Backdrop>
          <Container>
            <CloseButton onClick={closePopUp}>
              <CloseCircle variant='Outline' />
            </CloseButton>
            <h2>Steps</h2>
            {historySteps.map((step: HistoryStep) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                key={step.id}
              >
                <p>{step.step}</p>
                <p>{utils.formatToDDMMAAAA(step.transitionAt)}</p>
                {userRoot && (
                  <span>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Você tem certeza?",
                          text: "Você não será capaz de reverter isso!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#7841B0",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sim, deletar!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteStep({ variables: { where: { id: step.id } } })
                            refetch && refetch()
                            Swal.fire("Deletado!", "Seu step foi deletado.", "success")
                          }
                        })
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#FF0000",
                      }}
                    >
                      <Trash
                        style={{
                          width: "1rem",
                          height: "1rem",
                        }}
                      />
                    </button>
                  </span>
                )}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1.37rem",
                width: "100%",
              }}
            >
              <Primitives
                componentName='SelectFWOWhite'
                selectPropsWhite={{
                  placeholder: "Selecione o step atual do projeto",
                  options: defaultSteps,
                  onChange: ({ value }) => {
                    setSelectedData((prev: any) => ({ ...prev, step: value }))
                  },
                  menuWidth: "100%",
                }}
              />
              <Primitives
                componentName='DateInput'
                dateInputProps={{
                  name: "date",
                  label: "Data de alteração*",
                  onChange: (date) => {
                    setSelectedData((prev: any) => ({ ...prev, stepTransitionAt: date }))
                  },
                }}
              />
            </div>
            <ButtonsContainer>
              <DefaultButton
                onClick={() => {
                  closePopUp()
                }}
              >
                Cancelar
              </DefaultButton>
              <DefaultButton
                onClick={() => {
                  setData(selectedData)
                  callBackProjectPage && callBackProjectPage(selectedData)

                }}
                svgSize={"small"}
                animationSvg={"arrowRight"}
              >
                Alterar <ArrowRight />
              </DefaultButton>
            </ButtonsContainer>
          </Container>
        </Backdrop>
      )
      break

    case Flag:
      content = (
        <Backdrop>
          <Container>
            <CloseButton onClick={closePopUp}>
              <CloseCircle variant='Outline' />
            </CloseButton>

            <h1>Flags</h1>
            {historyFlags.map((flag: HistoryFlag) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                key={flag.id}
              >
                <p>{flag.flag}</p>
                <p>{utils.formatToDDMMAAAA(flag.transitionAt)}</p>
                {userRoot && (
                  <span>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Você tem certeza?",
                          text: "Você não será capaz de reverter isso!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#7841B0",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sim, deletar!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteFlag({ variables: { where: { id: flag.id } } })
                            refetch && refetch()
                            Swal.fire("Deletado!", "Sua flag foi deletada.", "success")
                          }
                        })
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#FF0000",
                      }}
                    >
                      <Trash
                        style={{
                          width: "1rem",
                          height: "1rem",
                        }}
                      />
                    </button>
                  </span>
                )}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1.37rem",
                width: "100%",
              }}
            >
              <Primitives
                componentName='SelectFWOWhite'
                selectPropsWhite={{
                  placeholder: "Seleciona a flag atual do projeto",
                  options: defaultFlags,
                  onChange: ({ value }) => {
                    setSelectedData((prev: any) => ({ ...prev, flag: value }))
                  },
                  menuWidth: "100%",
                }}
              />
              <Primitives
                componentName='DateInput'
                dateInputProps={{
                  name: "date",
                  label: "Data de alteração*",
                  onChange: (date) => {
                    setSelectedData((prev: any) => ({ ...prev, flagTransitionAt: date }))
                  },
                }}
              />
            </div>
            <ButtonsContainer>
              <DefaultButton
                onClick={() => {
                  closePopUp()
                }}
              >
                Cancelar
              </DefaultButton>
              <DefaultButton
                onClick={() => {
                  setData(selectedData)
                  callBackProjectPage && callBackProjectPage(selectedData)

                }}
                svgSize={"small"}
                animationSvg={"arrowRight"}
              >
                Alterar <ArrowRight />
              </DefaultButton>
            </ButtonsContainer>
          </Container>
        </Backdrop>
      )
      break

    default:
      break
  }

  return content
}
