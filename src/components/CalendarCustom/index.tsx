import { ArrowLeft2, ArrowRight, ArrowRight2, Calendar } from "iconsax-react"
import { getWeekDays } from "@/utils/get-week-days"
import { useEffect, useMemo, useState } from "react"
import dayjs from "dayjs"
import {
  Container,
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarBody,
  CalendarDay,
  TimePicker,
  TimePickerHeader,
  TimePickerList,
  TimePickerItem,
  SvgIcon,
  Button,
} from "./styles"
import { gql, useQuery } from "@apollo/client"
import Skeleton from "react-loading-skeleton"
import { DefaultButton } from "../DefaultButton"
import { Router, useRouter } from "next/router"

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
    today?: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

const GET_EVENTS_BY_DATE = gql`
  query getEventsByDate($date: DateTimeISO!) {
    calendar(data: $date) {
      date
      title
      link
    }
  }
`

const GET_EVENTS_BY_MONTH = gql`
  query getEventsByMonth($date: DateTimeISO!) {
    monthCalendar(data: $date) {
      date
    }
  }
`

interface events {
  date: string
  title: string
  link: string
}

export function CalendarCustom() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1)
  })

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, "month")

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, "month")

    setCurrentDate(nextMonth)
  }
  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format("MMMM")
  const currentYear = currentDate.format("YYYY")

  const [selectedDate, setSelectedDate] = useState(dayjs())
  const {
    loading: loadingMonth,
    error: errorMonth,
    data: dataMonth,
  } = useQuery(GET_EVENTS_BY_MONTH, {
    variables: {
      date: currentDate.toISOString(),
    },
  })
  const eventsMonth: events[] = dataMonth?.monthCalendar || []

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set("date", i + 1)
    })

    const firstWeekDay = currentDate.get("day")

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, "day")
      })
      .reverse()
    const lastDayInCurrentMonth = currentDate.set("date", currentDate.daysInMonth())
    const lastWeekDay = lastDayInCurrentMonth.get("day")

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, "day")
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return { date, disabled: false }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>((weeks, _, i, original) => {
      const isNewWeek = i % 7 === 0

      if (isNewWeek) {
        weeks.push({
          week: i / 7 + 1,
          days: original.slice(i, i + 7),
        })
      }

      return weeks
    }, [])

    return calendarWeeks
  }, [currentDate])

  const {
    loading,
    error,
    data: DayQuery,
  } = useQuery(GET_EVENTS_BY_DATE, {
    variables: {
      date: selectedDate.toISOString(),
    },
  })
  // useEffect(() => {
  // 	setSelectedDate(dayjs(currentDate.toISOString()));
  // }, [currentDate]);
  const events: events[] = DayQuery?.calendar || []

  function Loading() {
    return (
      <>
        <TimePickerItem>
          <SvgIcon>
            <Skeleton width={32} height={32} baseColor='#e2e2e2' highlightColor='#f2f2f2' duration={2} />
          </SvgIcon>
          <Skeleton width='100%' count={3} inline baseColor='#e2e2e2' highlightColor='#f2f2f2' duration={2} />
        </TimePickerItem>
        <TimePickerItem>
          <SvgIcon>
            <Skeleton width={32} height={32} baseColor='#e2e2e2' highlightColor='#f2f2f2' duration={2} />
          </SvgIcon>
          <Skeleton width='100%' count={3} inline baseColor='#e2e2e2' highlightColor='#f2f2f2' duration={2} />
        </TimePickerItem>
      </>
    )
  }

  return (
    <Container>
      <CalendarContainer>
        <CalendarHeader>
          <button onClick={handlePreviousMonth}>
            <ArrowLeft2 />
          </button>
          <CalendarTitle>
            {currentDate.format("MMMM")} <span>{currentDate.format("YYYY")}</span>
          </CalendarTitle>
          <button onClick={handleNextMonth}>
            <ArrowRight2 />
          </button>
        </CalendarHeader>

        <CalendarBody>
          <thead>
            <tr>
              {shortWeekDays.map((weekDay) => (
                <th key={weekDay}>{weekDay}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarWeeks.map(({ week, days }) => {
              return (
                <tr key={week}>
                  {days.map(({ date, disabled }) => {
                    const hasEvent = eventsMonth.some((event) => dayjs(event.date).isSame(date, "day"))

                    return (
                      <td key={date.toString()}>
                        <CalendarDay
                          className={hasEvent ? "has-event" : ""}
                          disabled={disabled}
                          selected={date.isSame(selectedDate, "day")}
                          onClick={() => {
                            if (disabled) return
                            setSelectedDate(date)
                          }}
                        >
                          {date.get("date")}
                        </CalendarDay>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </CalendarBody>
      </CalendarContainer>
      <TimePicker>
        <TimePickerHeader>
          <span>Próximos eventos</span>
        </TimePickerHeader>
        <TimePickerList>
          {error ? ( // Display error message when an error occurs
            <>
              <TimePickerItem>
                <span>Error: Não foi possível verificar a data selecionada.</span>
              </TimePickerItem>
              <TimePickerItem>
                <span>Error: Não foi possível verificar a data selecionada.</span>
              </TimePickerItem>
            </>
          ) : loading ? ( // Display loading placeholder when loading is true
            <Loading />
          ) : (
            events.map((event, index) => (
              <TimePickerItem key={index}>
                <SvgIcon>
                  <Calendar variant='Bold' />
                </SvgIcon>
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    router.push(event.link)
                  }}
                >
                  {event.title}
                  <div>{dayjs(event.date).format("DD/MM/YYYY")}</div>
                </span>
              </TimePickerItem>
            ))
          )}
        </TimePickerList>
      </TimePicker>
      <Button
        style={{
          height: "2.375rem",
          width: "11.31rem",
          borderRadius: "0.625rem",
          fontSize: "0.75rem",
        }}
      >
        Ver todos <ArrowRight variant='Outline' width={5} height={5} />
      </Button>
    </Container>
  )
}
