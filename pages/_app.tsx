import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import type { AppProps } from "next/app"
import { Toaster, ToastOptions } from "react-hot-toast"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Loader } from "../components/Loader"
import { Layout } from "../layouts"
import { persistor, store } from "../redux"
import "../styles/globals.css"
import "../styles/index.scss"
import { theme } from "../styles/MuiTheme"

const toastOption: ToastOptions = {
  position: "top-right",
  duration: 3000,
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="min-h-screen bg-body">
            <Loader />
          </div>
        }
        persistor={persistor}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>

          <Toaster {...toastOption} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
