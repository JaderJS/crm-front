import React, { useState, useEffect, useContext, SetStateAction, memo } from "react"
import { CalendarContainer, Container, HoverInfo, InputsContainer, SelectItem, UserContainer, UserName } from "./styles"
import { DefaultButton } from "../../DefaultButton"
import { DateRange, DefinedRangeProps } from "react-date-range" // Importe o DateRangePicker e DefinedRangeProps
import ptBR from "date-fns/locale/pt-BR" // Importe o locale em português
import { AddCircle, Calendar1, Eye, EyeSlash, FilterSquare, GalleryRemove, SearchNormal, Setting2 } from "iconsax-react"
import { BoardSelect } from "../../BoardSelect"
import { DefaultInputs } from "../../DefaultInputs"
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client"
import Router from "next/router"
import { Board, User } from "@/types"
import { AuthContext } from "@/contexts/AuthContext"
import Link from "next/link"
import { number, z } from "zod"
import { UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import { UserContext } from "@/contexts/UserContext"
import { searchInBoard } from "@/myHooks/Board/board"
import debounce from "lodash.debounce"
import { RotatingLines } from "react-loader-spinner"

// const GET_INFOS = gql`
//   query getTeams {
//     teams {
//       name
//     }
//     jobFunctions {
//       name
//     }
//     steps {
//       name
//     }
//     organizations {
//       name
//     }
//   }
// `

// const FIND_MANY_USERS_IN_BOARD_MENU = gql`
//   query findManyUsersInBoard {
//     users(where: { typeUser: { equals: invest } }) {
//       uuid
//       name
//     }
//   }
// `

const FIND_UNIQUE_BOARD_IN_BOARD_MENU = gql`
  query findUniqueBoardInBoardMenu(
    $where: BoardWhereUniqueInput!
    $whereColumn: ColumnWhereInput
    $whereCard: CardWhereInput
  ) {
    board(where: $where) {
      id
      title
      # tags {
      #   title
      # }
      isPublic
      authorizedCustom {
        isAuth
      }
      column(where: $whereColumn) {
        id
        order
        title
        card(where: $whereCard) {
          id
          name
          order
          tags
          priority
          appointment
     
          cardTags {
            tag {
              color
              title
            }
          }
          fieldValue(orderBy: { createdAt: desc },where: {field:{is:{showInCard:{equals:true}}}}) {
            id
            content 
            fieldType
            field (where: {showInCard:{equals:true}}){
              id
              name
              required
              showInCard
              fieldType
            }
          }
          column {
            id
            # fieldValue(orderBy: { fieldColumn: {order:asc}}) {
            #   fieldColumn {
            #     id
            #     name
            #     description
            #     required
            #     content
            #     FieldsValue( ,orderBy:{createdAt: desc}) {
            #       id
            #       cardId
            #       content
            #       fieldType
            #     }
            #   }
            # }
          }
          cardAssignment {
            user {
              avatarUrl
              nickName
              name
              uuid
            }
          }
        }
      }
    }
  }
`

// const EVENT_USER_UPDATE_KANBAN = gql`
//   subscription eventUserUpdateKanbanFilter {
//     eventUserUpdateKanban {
//       uuid
//       boardId
//       message
//     }
//   }
// `

// const USER_JOIN_BOARD = gql`
//   query userJoinBoard {
//     joinInKanban
//     joinInKanban
//   }
// `

// const USER_EXIT_BOARD = gql`
//   query userExitInBoard {
//     exitInKanban
//   }
// `

// const USERS_ON_BOARD = gql`
//   subscription usersOnBoard {
//     eventUsersInKanban {
//       users {
//         uuid
//         avatarUrl
//         nickName
//       }
//     }
//   }
// `

interface BoardData {
  board: Board
}

interface UserData {
  users: User[]
}

interface BoardMenuProps {
  setData: React.Dispatch<SetStateAction<Board | null>>
  boardId?: string
  refetch: boolean
  loadingFromMenu: (boolean: any) => any
}

const filterSchema = z.object({
  id: z.string(),
  titleColumnStartedWith: z.string().nullable().optional(),
  titleCardStartedWith: z.string().nullable().optional(),
  updatedByUsernameStartedWith: z.string().nullable().optional(),
  cardCreatedAt: z
    .object({
      startDate: z.date().nullish(),
      endDate: z.date().nullish(),
    })
    .nullish(),
  search: z.string().nullable().optional(),
  showOnlyCards: z.boolean(),
  order: z.enum(["asc", "desc"]).nullable().optional(),
  team: z.string().nullable().optional(),
})
type FilterData = z.infer<typeof filterSchema>

export function BoardMenu({ setData, boardId, refetch, loadingFromMenu }: BoardMenuProps) {
  const { userAllowed } = useContext(UserContext)

  const [numberOfCards, setNumberOfCard] = useState<number | undefined>(undefined)
  const {
    data: board,
    refetch: refetchBoard,
    loading,
    fetchMore,
  } = useQuery<BoardData>(FIND_UNIQUE_BOARD_IN_BOARD_MENU, {
    variables: { where: { id: boardId } },
    skip: boardId === undefined,
    refetchWritePolicy: "merge",
    fetchPolicy: "cache-and-network",
    returnPartialData: true,
    ssr: true,
    
  
    onCompleted: (data) => {
      setData(data.board)
    },

    partialRefetch: true,
  })
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FilterData>({
    resolver: zodResolver(filterSchema),
    defaultValues: { id: boardId, showOnlyCards: false },
  })

  // const { data: users } = useQuery<UserData>(FIND_MANY_USERS_IN_BOARD_MENU, {
  //   skip: boardId === undefined,
  //   fetchPolicy: "cache-and-network",
  // })


  // const { data: updateBoard } = useSubscription(EVENT_USER_UPDATE_KANBAN, { onComplete: () => refetchBoard() })

  const submit = async (filter: FilterData) => {

    refetchBoard({
      where: {
        id: filter.id,
      },
      whereCard: {
        OR: [
          {
            OR: [{
              createdAt: { gte: filter.cardCreatedAt?.startDate ?? new Date(1970), lte: filter.cardCreatedAt?.endDate ?? new Date() },
            }],
          },
        ],
      },
    }).then((res) => {
      const filtered = searchInBoard({
        board: res.data.board,
        text: filter.search?.toLocaleLowerCase(),
        showOnlyCards: filter.showOnlyCards,
        // users: users?.users,
      })
      const numberOfCards = filtered.column
        .filter((column, index) => index !== 0)
        .flatMap((column) => column.card).length
      setNumberOfCard(numberOfCards)
      setData(filtered)
    })
  }

  useEffect(() => {
    if(loading){
      loadingFromMenu(true)
    } else {
      loadingFromMenu(false)
    }
  }, [loading])



  return (
    <Container>
      <DefaultButton
        backgroundColor={"transparent"}
        color={"black"}
        hover={"Gray"}
        border={"gradientFwo"}
        style={{
          borderRadius: "30px",
          height: "3.1875rem",
          maxWidth: "12.5rem",
          width: "100%",
        }}
        onClick={() => {
          Router.push(`/Board/NewCard/${boardId}`)
        }}
      >
        <p>Adicionar Card</p>
        <AddCircle size='1rem' variant='Outline' />
      </DefaultButton>

      {/* <UsersOnBoard /> */}

      <InputsContainer>
        {/* <SelectFilter
          setValue={setValue}
          refetch={handleSubmit(submit)}
          watch={watch}
          defaultOptions={["asc", "desc"]}
        /> */}
        <RangeDate setValue={setValue} refetch={handleSubmit(submit)} />

        <Search
          setValue={setValue}
          refetch={handleSubmit(submit)}
          watch={watch}
          loading={loading}
          numberOfCards={numberOfCards}
        />
        {/* {numberOfCards && <span>{numberOfCards}</span>} */}

        {userAllowed && (
          <Link href={`/Board/Edit/${boardId}`}>
            <Setting2 color='#000' opacity={0.6} />
          </Link>
        )}
      </InputsContainer>
    </Container>
  )
}

interface RangeDateProps {
  setValue: UseFormSetValue<FilterData>
  refetch: Function
}

const RangeDate = ({ setValue, refetch }: RangeDateProps) => {
  const [calendar, setCalendar] = useState([
    {
      startDate: null,
      endDate: new Date(),
      key: "selection",
    },
  ] as any[])

  return (
    <>
      <CalendarContainer>
        <button>
          <Calendar1 variant='Outline' />
          <p>
            {calendar[0].startDate && calendar[0].endDate
              ? `${calendar[0].startDate.toLocaleDateString()} - ${calendar[0].endDate.toLocaleDateString()}`
              : "Todo o período"}
          </p>
        </button>
        <HoverInfo>
          <DateRange
            onChange={(ranges) => {
              setCalendar([ranges.selection])
              setValue("cardCreatedAt.endDate", dayjs(ranges?.selection?.endDate).toDate())
              setValue("cardCreatedAt.startDate", dayjs(ranges?.selection?.startDate).toDate())
              refetch()
            }}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={calendar}
            direction='horizontal'
            calendarFocus='backwards'
            locale={ptBR}
            rangeColors={["#7841B0"]}
            weekdayDisplayFormat='EEEEEE'
            fixedHeight={true}
            preventSnapRefocus={true}
            editableDateInputs={true}
            showPreview={true}
            dateDisplayFormat='dd/MM/yyyy'
            startDatePlaceholder='Data de início'
            endDatePlaceholder='Data de término'
            displayMode='date'
            showMonthAndYearPickers={true}
            showDateDisplay={true}
          />
          <button
            onClick={() => {
              setCalendar([{ startDate: null, endDate: null, key: "selection" }])
              setValue("cardCreatedAt.endDate", undefined)
              setValue("cardCreatedAt.startDate", undefined)
              refetch()
            }}
          >
            Limpar
          </button>
        </HoverInfo>
      </CalendarContainer>
    </>
  )
}

interface ISelectFilter {
  setValue: UseFormSetValue<FilterData>
  watch: UseFormWatch<FilterData>
  refetch: Function
  defaultOptions: string[]
}

const SelectFilter = ({ setValue, watch, refetch, defaultOptions }: ISelectFilter) => {
  const options = defaultOptions.map((option) => ({ value: option, label: option }))

  return (
    <SelectItem>
      <FilterSquare variant='Outline' />
      <p>Ordenar:</p>
      <BoardSelect
        isSearchable={false}
        isMulti={false}
        placeholder='Ordenar por'
        onChange={(event) => {
          setValue("order", event.value)
          refetch()
        }}
        options={options}
      />
    </SelectItem>
  )
}

interface SearchProps {
  setValue: UseFormSetValue<FilterData>
  watch: UseFormWatch<FilterData>
  refetch: any
  loading: boolean
  numberOfCards?: number
}

const Search = ({ watch, setValue, refetch, numberOfCards, loading }: SearchProps) => {
  const delayedRefetch = debounce(refetch, 1000)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
      }}
    >

      <DefaultInputs
        focusColor={"red"}
        hover={"red"}
        svgColor={"red"}
        icon={loading ? <RotatingLines width="0.8rem" strokeColor="red" /> : <SearchNormal size='32' variant='Outline' />}
        style={{
          width: "19rem",
          height: "1.85rem",
          gap: "0.5rem",
          borderRadius: "15px",
          border: "1px solid #A1A1A5",
          position: "relative",
          transition:"all ease-in-out 0.3s "
        }}
        input={{
          type: "text",
          placeholder: "Pesquisar",
          value: watch("search") || "",
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue("search", event.target.value)
            // Call the delayedRefetch function instead of directly calling refetch
            delayedRefetch()
          },
          onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" || event.key === "NumpadEnter" || event.key === "Backspace") {
              refetch()
            }
          },
        }}
      />
      {/* <label htmlFor="showOnlyCards" style={{ fontSize: "0.6rem" }} >Mostrar apenas os cards?</label> */}
      {/* <input id="showOnlyCards" type="checkbox" checked={watch("showOnlyCards")} onChange={() => setValue("showOnlyCards", !watch("showOnlyCards"))} /> */}
      <button
        id='showOnlyCards'
        onClick={() => {
          setValue("showOnlyCards", !watch("showOnlyCards"))
          setTimeout(() => refetch(), 300) as NodeJS.Timeout
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.5rem",
          border: "none",
          backgroundColor: "transparent",
          transition: "all 0.2s ease-in-out",
          position: "relative",
        }}
        title='Mostrar apenas os cards?'
      > {numberOfCards && watch("showOnlyCards") && numberOfCards > 0 &&
        <span
          style={{
            position: "absolute",
            top: "-0.5rem",
            right: "-0.5rem",
            backgroundColor: "#7841B0",
            color: "#fff",
            borderRadius: "50%",
            width: "1rem",
            height: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.5rem",

          }}
        >
          {numberOfCards}
        </span>
        }
        {watch("showOnlyCards") ? (
          <EyeSlash
            variant='Outline'
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "#7841B0",
            }}
          />
        ) : (
          <Eye
            size='32'
            variant='Outline'
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "#7841B0",
            }}
          />
        )}
      </button>
    </div>
  )
}

// const UsersOnBoard = () => {
//   // const { data: usersOnBoard } = useSubscription(USERS_ON_BOARD)

//   const [users, setUsers] = useState<{ uuid: string; avatarUrl: string; nickName: string }[] | undefined>([])
//   const { uuid } = useContext(AuthContext)

//   useEffect(() => {
//     if (usersOnBoard && usersOnBoard.eventUsersInKaban && usersOnBoard.eventUsersInKaban.users) {
//       const filteredUsers = usersOnBoard.eventUsersInKaban.users.filter((user: any) => user.uuid !== uuid)
//       setUsers(filteredUsers)
//     }
//   }, [usersOnBoard, uuid])

//   return (
//     <>
//       {users?.map((user: any) => (
//         <UserContainer key={user.uuid}>
//           <img src={user.avatarUrl} style={{ height: "2rem", width: "2rem" }} alt='imagem' />
//           <UserName>{user.nickName}</UserName>
//         </UserContainer>
//       ))}
//     </>
//   )
// }
