import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { setCookie, parseCookies } from "nookies"
import { ApolloError, gql, useQuery } from "@apollo/client"
import { User } from "@/types"
import { Router, useRouter } from "next/router"

const GET_USER_INFO_CONTEXT = gql`
  query getUserInfoContext($uuid: String!) {
    findFirstUser(where: { uuid: { equals: $uuid } }) {
      uuid
      name
      avatarUrl
      userJobFunction {
        jobFunction {
          name
        }
      }
      userSteps {
        step {
          name
        }
      }
      role
      typeUser
      userTeam {
        team {
          name
        }
      }
    }
  }
`

interface UserContextProviderProps {
  children: ReactNode
}

export interface UserContextProviderData {
  uuid: string
  name: string
  jobFunction: string
  step: string
  role: string
  typeUser: string
  userAllowed?: boolean
  userRoot: boolean
  avatarUrl?: string
}

export const UserContext = createContext<UserContextProviderData>({
  uuid: "",
  name: "",
  jobFunction: "",
  step: "",
  role: "",
  typeUser: "",
  userRoot: false,
  avatarUrl: "",
})

export function UserContextProvider({ children }: UserContextProviderProps) {
  const router = useRouter()
  const rotaAtual = router.pathname
  const [userData, setUserData] = useState<UserContextProviderData>({
    uuid: "",
    name: "",
    jobFunction: "",
    step: "",
    role: "",
    typeUser: "",
    userAllowed: false,
    userRoot: false,
    avatarUrl: "",
  })

  const rootUserRole = "root"
  const allowedJobFunctionsAndRole = ["heads", "gestor de projeto", "sub head", "account manager", "admin", "root"]

  const cookies = parseCookies()
  const uuidCookie = cookies["fwo.uuid"]

  const { data, error, loading, refetch } = useQuery(GET_USER_INFO_CONTEXT, {
    variables: {
      uuid: uuidCookie,
    },
    skip: uuidCookie === undefined || uuidCookie === null || uuidCookie === "" || !uuidCookie,
  })

  useEffect(() => {
    if (data && data.findFirstUser) {
      const user = data.findFirstUser
      const userRole = user.role
      const userJobFunction = user.userJobFunction[0]?.jobFunction.name || ""

      // Atualizando userData incluindo userAllowed
      const isUserAllowed =
        allowedJobFunctionsAndRole.includes(userRole) || allowedJobFunctionsAndRole.includes(userJobFunction)
      setUserData({
        uuid: user.uuid,
        name: user.name,
        jobFunction: userJobFunction,
        step: user.userSteps[0]?.step.name || "",
        role: userRole,
        typeUser: user.typeUser,
        userAllowed: isUserAllowed, // Atualize aqui
        userRoot: userRole === rootUserRole,
        avatarUrl: user.avatarUrl,
      })
    }
  }, [data])


  // useEffect(() => {
  //   refetch();

  // }, [rotaAtual]);

  const userContextValue = useMemo(() => userData, [userData])

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>
}
