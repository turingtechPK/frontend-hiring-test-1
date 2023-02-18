import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Shadows, createTheme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4f46f8",
    },
    success: {
      main: "#46f85a",
    },
  },
  shadows: shadows.map(() => "none") as Shadows,
  typography: {
    fontFamily: "Avenir",
    button: {
      textTransform: "none",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);
