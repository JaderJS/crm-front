import Select from "react-select"
import { keyframes, styled } from "@/styles"
import { useEffect, useMemo, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { InputContainer, OptionContainer, OptionContent } from "./styles"
import Image from "next/image"
import { Slash, CopySuccess } from "iconsax-react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Project } from "@/types"
import { InView } from "react-intersection-observer";

import { RotatingLines } from "react-loader-spinner"
const FIND_MANY_PROJECTS_IN_PRIMITIVESELECTPROJECTS = gql`
  query findManyProjectsInPrimitiveSelectProjects {
    projects {
      historyMonthlyRecurringRevenue(orderBy: { transitionAt: asc }, take: 1) {
        createdAt
        id
        revenue
      }
      historyStep(orderBy: { transitionAt: desc }, take: 1) {
        id
        step
      }
      HistoryFlag(orderBy: { transitionAt: desc }, take: 1) {
        id
        flag
      }
      invest {
        id
        user {
          uuid
          userJobFunction {
            jobFunctionId
            jobFunction {
              id
              name
            }
          }
          userTeam {
            teamId
            team {
              id
              name
            }
          }
        }
      }
      id
      name
      profileUrl
      enable
    }
  }
`

export interface SelectPropsWhite {
  defaultValue?: string | string[] | any
  value?: { value: any; label: any }
  isClearable?: boolean
  id?: string
  isSearchable?: boolean

  onChange?: (selectedOption: any) => void
  isMulti?: boolean
  // styles?: any
  label?: string
  description?: string
  successBoolean?: boolean | null
  errorBoolean?: boolean | null
  modified?: { name?: string; updatedAt: any; uuid: string }
  disabled?: boolean
}

export interface OptionType {
  value: number
  label: string
  avatarUrl: string
  mrr: number
  step: string
  flag: string
  enable: boolean
  team: string
}

interface ProjectsData {
  projects: Project[]
}

export function PrimitivesProjects({
  id,
  onChange,
  defaultValue,
  value,
  label,
  description,
  successBoolean = false,
  errorBoolean = false,
  disabled,
  ...props
}: SelectPropsWhite) {
  const [selectedValue, setSelectedValue] = useState<any>(defaultValue ? defaultValue : null)
  const [isIntersecting, setIsIntersecting] = useState(false);

  const { data: findManyProjects, loading } = useQuery<ProjectsData>(FIND_MANY_PROJECTS_IN_PRIMITIVESELECTPROJECTS, {
    fetchPolicy: "cache-and-network",
    skip: !isIntersecting,
  })

  // const options = findManyProjects?.projects?.map((project: any) => ({
  //   value: project.id,
  //   label: project.name,
  //   avatarUrl: project.profileUrl,
  //   mrr: project.historyMonthlyRecurringRevenue[0]?.revenue,
  //   step: project.historyStep[0]?.step,
  //   flag: project.HistoryFlag[0]?.flag,
  // }))

  const memoizedOptions = useMemo(() => {
    return findManyProjects?.projects?.map((project: any) => ({
      value: project.id,
      label: project.name,
      avatarUrl: project.profileUrl,
      mrr: project.historyMonthlyRecurringRevenue[0]?.revenue,
      step: project.historyStep[0]?.step,
      flag: project.HistoryFlag[0]?.flag,
      enable: project.enable,
      team: Array.from(
        new Set(project.invest.flatMap((invest: any) => invest.user.userTeam.map((team: any) => team.team.name))),
      ).join(", "),
    }))
  }, [findManyProjects])

  const findOptions = (defaultValue: any[]) => {
    if (Array.isArray(defaultValue) && memoizedOptions) {
      return defaultValue
        .map((val) => memoizedOptions.find((memoizedOptions) => memoizedOptions.value === val))
        .filter(Boolean) // This filter removes any undefined entries if a match isn't found
    }
    return null
  }

  // useEffect(() => {
  //   if (memoizedOptions && memoizedOptions.length > 0) {
  //     const foundOptions = findOptions(defaultValue)

  //     if (JSON.stringify(foundOptions) !== JSON.stringify(selectedValue)) {
  //       setSelectedValue(foundOptions)
  //     }
  //   }
  // }, [defaultValue, memoizedOptions])

  const handleChange = (selectedOption: any) => {
    if (disabled) return
    setSelectedValue(selectedOption)
    const values = Array.isArray(selectedOption)
      ? selectedOption.map((option: { value: any }) => option)
      : selectedOption
        ? [selectedOption.value]
        : []
    if (onChange) {
      onChange(values)
    }
  }

  function setBorderSwitch(enable: boolean, flag: string) {
    if (enable) {
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
    } else {
      return "1px solid #E0465C"
    }
  }

  const formatOptionLabel = ({ value, label, mrr, step, flag, enable, team }: OptionType) => (
    <OptionContainer
      style={{
        backgroundColor: "#fff",
        border: `2px solid ${setBorderSwitch(enable, flag)}`,
        display: !value || !label ? "none" : "flex",
      }}
      onDoubleClick={() => {
        window.open(`/Perfil/Projeto/${value}`)
      }}
      title='Clique duas vezes para abrir o projeto'
    >
      <OptionContent>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "#000",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "90%",
          }}
        >
          {label}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            marginTop: "0.25rem",
          }}
        >
          {flag && (
            <span style={{ fontSize: ".75rem", fontWeight: 700, color: `${setBorderSwitch(enable, flag)}` }}>
              {flag}
            </span>
          )}
          {step && <span style={{ fontSize: ".75rem", fontWeight: 400, color: "#000" }}>{step}</span>}
          {!enable && (
            <span style={{ fontSize: ".75rem", fontWeight: 400, color: "#000" }}>
              <b>CHURN🔥</b>
            </span>
          )}
          {mrr && (
            <span style={{ fontSize: ".75rem", fontWeight: 400, color: "#000", textDecoration: "underline" }}>
              <b> MRR: </b>
              R${mrr}
            </span>
          )}
          {team && (
            <span style={{ fontSize: ".75rem", fontWeight: 400, color: "#000", textDecoration: "underline" }}>
              {team.toUpperCase()}
            </span>
          )}
        </div>
      </OptionContent>
    </OptionContainer>
  )




  return (
    <InView
      as="div"
      onChange={(inView: any) => setIsIntersecting(inView)}
    >

      <InputContainer>
        <SuccessAndErrorSvgContainer>
          {errorBoolean && <Slash color='#E0465C' />}
          {successBoolean && <CopySuccess color='#00C48C' />}

          <RotatingLines
            strokeColor='#7841b0'
            strokeWidth='5'
            animationDuration='0.75'
            ariaLabel='rotating-lines-loading'
            visible={loading}
          />
        </SuccessAndErrorSvgContainer>
        {label && <label>{label}</label>}
        {description && <span>{description}</span>}
        {memoizedOptions && (
          <Select
            menuPlacement={"auto"}
            options={memoizedOptions}
            id={id}
            isClearable={true}
            isSearchable={true}
            isMulti={true}
            placeholder={"Escolher Projeto"}
            onChange={handleChange}
            defaultValue={defaultValue}
            // value={value ? value : selectedValue}
            formatOptionLabel={formatOptionLabel as any}
            isDisabled={disabled}
            filterOption={(
              memoizedOptions: { data: { label: string; flag: string; step: string; mrr: string; team: string } },
              rawInput: string,
            ) => {
              const words = rawInput.split(" ")
              return words.every((word) => {
                const regex = new RegExp(word, "i")
                return (
                  regex.test(memoizedOptions.data.label) ||
                  regex.test(memoizedOptions.data.flag) ||
                  regex.test(memoizedOptions.data.step) ||
                  regex.test(memoizedOptions.data.mrr) ||
                  regex.test(memoizedOptions.data.team)
                )
              })
            }}
            loadingMessage={() => "Carregando..."}
            styles={{
              menuList: (provided) => ({
                ...provided,
                // scrollbarColor: "#7841b0 #d9d9d9",

                width: "100%",
                height: "100%",
              }),
              control: (provided, { menuIsOpen }) => ({
                ...provided,
                width: "100%",
                height: "100%",
                minHeight: "2.8125rem",
                borderRadius: menuIsOpen ? "0.25rem 0.25rem 0 0" : "0.9375rem",
                border: "transparent",
                borderBottom: menuIsOpen ? "1px solid transparent" : "1px solid #d9d9d9",
                fontFamily: "DM Sans",
                backgroundColor: "#FFF",
                fontSize: ".75rem",
                fontWeight: 400,
                transition: "all ease 0.2s",
                svg: {
                  color: "#7841b0",
                  transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "all ease 0.2s",
                },
                "&:hover": { borderBottom: "1px solid #7841b0" },
                "&:focus": { borderBottom: "1px solid #7841b0" },
                "&:active": { borderBottom: "1px solid #7841b0" },
                "&:disabled": { borderBottom: "1px solid #d9d9d9" },
                boxShadow: "none",
                outline: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                zIndex: 0,
              }),
              menu: (provided) => ({
                ...provided,
                position: "absolute", // Use absolute positioning
                width: "100%",
                height: "auto",
                border: "1px solid transparent",
                overflow: "hidden",
                backgroundColor: "#fff",
                zIndex: 100,
                fontSize: ".75rem",
                fontWeight: 400,
                transition: "all 0.2s",
                fontFamily: "DM Sans",
                marginTop: "0rem",

                "&:hover": {
                  //   border: "1px solid #7841b0",
                },
                "&:focus": {
                  border: "1px solid #7841b0",
                  boxShadow: "0 0 0 1px #7841b0",
                },
                "&:active": {
                  border: "1px solid #7841b0",
                  boxShadow: "0 0 0 1px #7841b0",
                },
                // "&:disabled": {
                //   border: "1px solid #d9d9d9",
                //   boxShadow: "0 0 0 1px #d9d9d9",
              }),

              option: (provided, state) => ({
                ...provided,

                backgroundColor: state.isSelected ? "#7841b09d" : "#fff",
                padding: "0.5rem 1rem",
                "&:hover": {
                  backgroundColor: "#7841b0",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.2s",
                },
                "&:focus": {
                  backgroundColor: "#7841b0",
                  color: "#fff",
                  border: "1px solid #7841b0",
                },

                "&:active": {
                  backgroundColor: "#7841b0",
                },
                "&:disabled": {
                  backgroundColor: "#d9d9d9",
                  border: "1px solid #d9d9d9",
                },
              }),
              singleValue: (provided) => ({
                ...provided,
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none", // Isso irá remover o separador
                backgroundColor: "transparent", // Isso irá tornar o separador transparente
              }),
            }}
          />
        )}
        {props.modified && props.modified.name && (
          <span style={{ fontSize: ".65rem" }}>
            Modificado por: {props.modified.name} {format(new Date(props.modified.updatedAt), "PPp", { locale: ptBR })}
          </span>
        )}
      </InputContainer>
    </InView >
  )
}
