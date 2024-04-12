
import { Calendar1, Flag, Solana } from "iconsax-react"
import { Container, Flags, LT, Margem, Steps } from "./styles"
import { PopUpSelectInfos } from "../PopUpSelectInfos"
import { useContext, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import { Utils } from "@/utils/utils"
import { UserContext } from "@/contexts/UserContext"

interface SelectOptionsProps {
  projectId?: any
  showEdit?: boolean
  uuid: string
}

const FIND_ONE_PROJECT_SELECTINFOS = gql`
  query findOneProjectSelectInfos($id: Int!) {
    project(where: { id: $id }) {
      createdAt
      historyStep(orderBy: { transitionAt: desc }, take: 3) {
        id
        step
        createdAt
        transitionAt
      }
      HistoryFlag(orderBy:  { transitionAt: desc }, take: 3) {
        id
        flag
        createdAt
        transitionAt
      }
      historyMonthlyRecurringRevenue(orderBy: { transitionAt: desc }, take: 3) {
        id
        revenue
        createdAt
        transitionAt
      }
    }
  }
`;

const CREATE_ONE_HISTORY_FLAG_SELECTINFOS = gql`
  mutation createOneHistoryFlagSelectInfos($projectId: Int!, $flag: FieldFlags!, $transitionAt: DateTimeISO!) {
    createOneHistoryFlag(data: { projectId: $projectId, flag: $flag, transitionAt: $transitionAt }) {
      id
    }
  }
`;

const CREATE_ONE_HISTORY_STEP_SELECTINFOS = gql`
  mutation createOneHistoryFlagStepSelectInfos($projectId: Int!, $step: FieldSteps!, $transitionAt: DateTimeISO!) {
    createOneHistoryStep(data: { projectId: $projectId, step: $step, transitionAt: $transitionAt }) {
      id
    }
  }
`;

const CREATE_ONE_HISTORY_MONTHLY_RECURRING_REVENUE_SELECTINFOS = gql`
mutation createOneHistoryMonthlyRecurringRevenueSelectInfos($projectId: Int!, $revenue:Float!, $transitionAt: DateTimeISO!, $createdBy: String!) {
  createOneHistoryMonthlyRecurringRevenue(data: {projectId: $projectId, revenue: $revenue, transitionAt: $transitionAt,createdBy: $createdBy}) {
    id
  }
}
`;

const utils = new Utils()

export function SelectOptions({ projectId, showEdit,uuid}: SelectOptionsProps) {
  const { userAllowed } = useContext(UserContext);
  //================================================================
  // Integrations

  const { data: project, refetch: refetchProject } = useQuery(FIND_ONE_PROJECT_SELECTINFOS, {
    variables: { id: Number(projectId) },
    skip: projectId === undefined,
  })
  const [createOneFlag] = useMutation(CREATE_ONE_HISTORY_FLAG_SELECTINFOS)
  const [createOneStep] = useMutation(CREATE_ONE_HISTORY_STEP_SELECTINFOS)
  const [createOneMrr] = useMutation(CREATE_ONE_HISTORY_MONTHLY_RECURRING_REVENUE_SELECTINFOS)


  const arrayFlags = project?.project.HistoryFlag ?? []
  const arraySteps = project?.project.historyStep ?? []
  const arrayMrr = project?.project.historyMonthlyRecurringRevenue ?? []
  const createdAt = project?.project.createdAt ?? ""
  
  const handleCallBack = ({ data }: { data: any }) => {
    if (!data) {
      return
    }
    console.log(data)
    const { step, flag, mrr,flagTransitionAt,stepTransitionAt, mrrTransitionAt} = data
    try {
      if (flag) {
        createOneFlag({ variables: { projectId: +projectId, flag:flag, transitionAt: flagTransitionAt } })
      }
      if (step) {
        createOneStep({ variables: { projectId: +projectId, step: step, transitionAt: stepTransitionAt } })
      }
      if (mrr) {
        createOneMrr({ variables: { projectId: +projectId, revenue: Number.parseFloat(mrr), transitionAt: mrrTransitionAt , createdBy: uuid} })
      }
      refetchProject()
    } catch (error) {
      console.error(error)
    }
  }
  //================================================================

  const [showMrr, setShowMrr] = useState(false)
  const [showStep, setShowStep] = useState(false)
  const [showFlag, setShowFlag] = useState(false)

  function setFlagColor(flag: string) {
    switch (flag) {
      case "DANGER":
        return "#FF4D4D"
      case "CARE":
        return "#FFC107"
      case "SAFE":
        return "#00C689"
      case "ONBOARDING":
        return "#FFF"
      default:
        return "#FFF"
    }
  }

  return (
    <Container>
      <Margem
         onClick={() => {
          if (userAllowed) {
            setShowMrr(true);
          }
        }}
        style={{
          cursor: userAllowed ? "pointer" : "not-allowed",
        }}
      >
        {/* <p>Margem(24%)</p> */}
        <strong>
         R${arrayMrr.length > 0 ? (arrayMrr[0].revenue) : "0,00"}
        </strong>
      </Margem>

      <LT>
        <div>
          <Calendar1 variant='Outline' /> LT
        </div>
        <p>
          {arraySteps.length > 0 ? utils.projectLifeTimeInMonths(createdAt) : "0"} {arraySteps.length > 0 ? utils.projectLifeTimeInMonths(createdAt) > 1 ? "meses" : "mês" : "meses"}
        </p>

      </LT>

      <Steps
        onClick={() => {
          if(userAllowed){
          setShowStep(true)
          }
        }}
        style={{
          cursor: userAllowed ? "pointer" : "not-allowed",
        }}
      >
        <div>
          <Solana variant='Outline' /> Step
        </div>
        {arraySteps.length > 0 ? <p>{arraySteps[0].step}</p> : <p>Não atribuído</p>}
      </Steps>

      <Flags
        onClick={() => {
          if(userAllowed){
          setShowFlag(true)
          }
        }}
        style={{
          cursor: userAllowed ? "pointer" : "not-allowed",
        }}
      >
        <div>
          <Flag variant='Outline' color={arrayFlags.length > 0 ? setFlagColor(arrayFlags[0].flag) : "#FFF"} /> Flag
        </div>
        {arrayFlags.length > 0 ? <p>{arrayFlags[0].flag}</p> : <p>Não atribuído</p>}
      </Flags>

      <PopUpSelectInfos
        Mrr={showMrr}
        Step={showStep}
        Flag={showFlag}
        closePopUp={() => {
          setShowMrr(false)
          setShowStep(false)
          setShowFlag(false)
        }}
        historyFlags={arrayFlags}
        historySteps={arraySteps}
        historyMrr={arrayMrr}
        callBack={(data: any) => handleCallBack({ data })}
      />
    </Container>
  )
}