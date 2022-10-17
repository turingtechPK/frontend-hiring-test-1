import { createTheme, ThemeOptions } from "@mui/material"

export const themeColor = {
  primary: {
    main: "#0106e4",
    light: "#6165FE",
    dark: "#0105AC",
    "50": "#9EA0FF",
    "100": "#8A8CFE",
    "200": "#6165FE",
    "300": "#383DFE",
    "400": "#1015FE",
    "500": "#0106E4",
    "600": "#0105AC",
    "700": "#010374",
    "800": "#00023C",
    "900": "#000005",
  },
}

export const theme: ThemeOptions = createTheme({
  palette: themeColor,
  typography: {
    fontSize: 14,
    fontFamily: [
      "AvenirLTStd",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "none", borderWidth: "2px", padding: "1rem" },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: { fontSize: "inherit" },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        adornedStart: { paddingLeft: ".5rem !important", "& svg": { marginRight: ".25rem" } },
        adornedEnd: { paddingRight: ".5rem !important", "& svg": { marginLeft: ".25rem" } },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minWidth: "unset",
          textTransform: "inherit",
          boxShadow: "none",
          ":hover": { boxShadow: "none" },
        },
      },
    },
  },
} as ThemeOptions)
