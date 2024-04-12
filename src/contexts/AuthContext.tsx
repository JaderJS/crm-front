import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { setCookie, parseCookies } from "nookies"
import { ApolloError, gql, useQuery } from "@apollo/client"
import { client } from "@/lib/apollo"
import { useRouter } from "next/router"
import jwt from "jsonwebtoken"

interface TokenData {
  create_on: string
  name: string
  nickname: string
  uuid: string
  id: number
  iat: number
  exp: number
}

export interface User {
  id: number
  username: string
  email: string
  confirmed: boolean
  blocked: boolean
  role: {
    id: number
    name: string
    description: string
    type: string
  }
}

interface SignInCredentials {
  email: string
  password: string
  remember: boolean
}

interface AuthContextData {
  //   user: User | null;
  //   isAuthenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>
  signInMindForge(credentials: SignInCredentials): Promise<void>
  signOut(): void
  //   getToken(): string | undefined;
  loginError: string | null
  //   getUserId(): string | undefined;
  uuid: string | undefined
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const isAuthenticated = !!user
  const [loginError, setLoginError] = useState<string | null>(null)
  const [token, setToken] = useState<string | undefined>(undefined)
  const [uuid, setUuid] = useState<string | undefined>(undefined)
  const signIn = useCallback(async ({ email, password, remember }: SignInCredentials) => {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation Login($identifier: String!, $password: String!) {
            login(data: { email: $identifier, password: $password }) {
              token
            }
          }
        `,
        variables: {
          identifier: email,
          password,
        },
      });
  
      if (!data.login || !data.login.token) {
        return;
      }
  
      const token = data.login.token;
      const decodedToken = jwt.decode(token) as TokenData;
      const oneDayInSeconds = 24 * 60 * 60; // Um dia em segundos
      const maxAge = remember ? (decodedToken.exp - decodedToken.iat - oneDayInSeconds) : undefined;
  
      setCookie(undefined, "fwo.token", token, {
        maxAge: maxAge,
        path: "/",
        secure: false,
        sameSite: "strict",
      });
  
      setToken(token);
  
      const uuidContent = decodedToken.uuid;
      setCookie(undefined, "fwo.uuid", uuidContent, {
        maxAge: maxAge,
        path: "/",
        secure: false,
        sameSite: "strict",
      });
      setUuid(uuidContent);
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors[0]) {
        const message = error.graphQLErrors[0].message;
        setLoginError(message);
      }
    }
  }, []);

  const signInMindForge = useCallback(async ({ email, password, remember }: SignInCredentials) => {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation LoginMindForge($identifier: String!, $password: String!) {
            loginMindforge(data: { email: $identifier, password: $password }) {
              token
            }
          }
        `,
        variables: {
          identifier: email,
          password,
        },
      });
  
      if (!data.loginMindforge || !data.loginMindforge.token) {
        console.error("Erro ao logar")
        return;
      }
  
      const token = data.loginMindforge.token; // Certifique-se de usar o token correto
      const decodedToken = jwt.decode(token) as TokenData;
      const oneDayInSeconds = 24 * 60 * 60; // Um dia em segundos
      const maxAge = remember ? (decodedToken.exp - decodedToken.iat - oneDayInSeconds) : undefined;
  
      setCookie(undefined, "fwo.token", token, {
        maxAge: maxAge,
        path: "/",
        secure: false,
        sameSite: "strict",
      });
  
      setToken(token);
  
      const uuidContent = decodedToken.uuid;
      setCookie(undefined, "fwo.uuid", uuidContent, {
        maxAge: maxAge,
        path: "/",
        secure: false,
        sameSite: "strict",
      });
      setUuid(uuidContent);
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors[0]) {
        const message = error.graphQLErrors[0].message;
        setLoginError(message);
        
      }
      console.error(error)
    }
  }, []);
  

  const signOut = useCallback(() => {
    setCookie(undefined, "fwo.token", "", {
      maxAge: -1,
      path: "/",
      secure: false,
    })
    setCookie(undefined, "fwo.uuid", "", {
      maxAge: -1,
      path: "/",
      secure: false,
    })

    setUser(null)
    setToken(undefined)
    setUuid(undefined)

    new Promise((resolve) => setTimeout(resolve))
      .then(() => {
        router.push("/Login")
      })
      .catch((error) => {
        console.error("Error during sign out:", error)
      })
  }, [router])

  useEffect(() => {
    const { "fwo.uuid": uuidCookie } = parseCookies()
    if (uuidCookie) {
      setUuid(uuidCookie)
    }
  }, [])

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const { "fwo.token": tokenCookie } = parseCookies();
      
      if (tokenCookie) {
        const decodedToken = jwt.decode(tokenCookie) as TokenData;
        const isTokenExpired = decodedToken.exp < Date.now() / 1000; // 
  
        if (isTokenExpired) {
          await signOut();
        }
      }
    };
  
    checkTokenExpiration();
  }, [router.pathname]); // Dependendo do router para reagir a mudanças de rota

  
  const authContextValue = useMemo(
    () => ({
      signIn,
      signOut,
      loginError,
      uuid,
      signInMindForge,
    }),
    [signIn, signOut, loginError, uuid, signInMindForge],
  )

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
