import { client } from "@/lib/apollo"
import { ApolloProvider } from "@apollo/client"
import type { AppProps } from "next/app"
import { globalStyles } from "@/styles/global"
import { AuthProvider } from "@/contexts/AuthContext"
import { useRouter } from "next/router"
import { MenuBar } from "@/components/MenuBar"
import { checkIsPublicRoute } from "@/utils/check-is-public-route"
import { PrivateRoute } from "@/utils/PrivateRoute"
import { UserContextProvider } from "@/contexts/UserContext"
import { GoogleAnalytics } from "@next/third-parties/google"
import Head from "next/head"
import { ToastContainer } from "react-toastify"
import { Analytics } from "@vercel/analytics/react"

import "react-toastify/dist/ReactToastify.css"
import "react-loading-skeleton/dist/skeleton.css"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import "../lib/dayjs"
import { useEffect } from "react"
globalStyles()

// if (typeof window !== "undefined" && "serviceWorker" in navigator) {
//   navigator.serviceWorker.register("service-worker.js")
// }


export default function App({ Component, pageProps }: AppProps) {

  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker.register("/service-worker.js")
  //   }
  // }, [])

  const router = useRouter()

  const isPublicPage = checkIsPublicRoute(router.pathname)
  const shouldRenderMenuBar = !isPublicPage

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <UserContextProvider>
          <ToastContainer />

          {isPublicPage && <Component {...pageProps} />}
          {!isPublicPage && (
            <PrivateRoute>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  width: "100vw",
                  height: "100vh",
                  margin: 0,
                  padding: 0,
                  outline: 0,
                  boxSizing: "border-box",
                  overflow: "hidden",
                  backgroundColor: "transparent !important",
                }}
              >
                <Head>
                  <title>
                    {router.pathname.split("/")[1]} {router.pathname.split("/")[2]}
                  </title>
                  <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                  <meta name='description' content='FWO - Framework Operacional By V4Company' />
                  <meta name='keywords' content='FWO, V4Company, Framework Operacional, Colli&Co,gestão de projetos, gestão de pessoas' />
                  <meta name='author' content='V4Company Colli&Co' />
                  <meta name='robots' content='index, follow' />
                  <meta name='googlebot' content='index, follow' />
                </Head>
                {shouldRenderMenuBar && <MenuBar />}

                <Component {...pageProps} />
              </div>
            </PrivateRoute>
          )}
          <GoogleAnalytics gaId='G-1B0S36NCSX' />
          <Analytics />

        </UserContextProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
