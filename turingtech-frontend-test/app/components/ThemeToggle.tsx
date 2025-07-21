"use client"

import { IconButton, Box, Tooltip } from "@mui/material"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme()

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(10px)",
          color: "white",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)",
            transform: "translateY(-1px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease",
            transform: mode === "dark" ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          {mode === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Box>
      </IconButton>
    </Tooltip>
  )
}
