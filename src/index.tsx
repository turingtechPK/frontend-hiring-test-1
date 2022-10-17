import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import ReactDOM from "react-dom/client"
import { Toaster, ToastOptions } from "react-hot-toast"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Loader } from "./components/Loader"
import { persistor, store } from "./redux"
import reportWebVitals from "./reportWebVitals"
import { Router } from "./router"
import "./styles/index.scss"
import { theme } from "./styles/MuiTheme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const toastOption: ToastOptions = {
  position: "top-right",
  duration: 3000,
}

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
        <Toaster {...toastOption} />
      </ThemeProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
