"use client";

import type React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from "@/lib/theme-context";

function MaterialUIThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#8b5cf6" : "#6366f1",
        light: mode === "dark" ? "#a78bfa" : "#818cf8",
        dark: mode === "dark" ? "#7c3aed" : "#4f46e5",
      },
      secondary: {
        main: mode === "dark" ? "#06d6a0" : "#10b981",
        light: mode === "dark" ? "#34d399" : "#34d399",
        dark: mode === "dark" ? "#059669" : "#047857",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f9fafb",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#f8fafc" : "#111827",
        secondary: mode === "dark" ? "#cbd5e1" : "#6b7280",
      },
      divider: mode === "dark" ? "#334155" : "#e5e7eb",
      action: {
        hover:
          mode === "dark" ? "rgba(148, 163, 184, 0.08)" : "rgba(0, 0, 0, 0.04)",
        selected:
          mode === "dark" ? "rgba(148, 163, 184, 0.12)" : "rgba(0, 0, 0, 0.08)",
      },
    },
    typography: {
      fontFamily:
        '"Avenir LT Std", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "6px",
            fontFamily: '"Avenir LT Std", sans-serif',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              fontFamily: '"Avenir LT Std", sans-serif',
              backgroundColor:
                mode === "dark"
                  ? "rgba(30, 41, 59, 0.5)"
                  : "rgba(249, 250, 251, 0.8)",
              "& fieldset": {
                borderColor: mode === "dark" ? "#475569" : "#cbd5e1",
              },
              "&:hover fieldset": {
                borderColor: mode === "dark" ? "#64748b" : "#94a3b8",
              },
              "&.Mui-focused fieldset": {
                borderColor: mode === "dark" ? "#8b5cf6" : "#6366f1",
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: mode === "dark" ? "#1e293b" : "#ffffff",
            border: mode === "dark" ? "1px solid #334155" : "1px solid #e5e7eb",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom:
              mode === "dark" ? "1px solid #334155" : "1px solid #e5e7eb",
            fontFamily: '"Avenir LT Std", sans-serif',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor:
                mode === "dark" ? "rgba(30, 41, 59, 0.5)" : "#f9fafb",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

export default function ClientThemeProvider({
  children,
}: ClientThemeProviderProps) {
  return (
    <CustomThemeProvider>
      <MaterialUIThemeProvider>{children}</MaterialUIThemeProvider>
    </CustomThemeProvider>
  );
}
