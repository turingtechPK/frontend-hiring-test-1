"use client";

import { Button, Box, Typography } from "@mui/material";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useUser } from "@/lib/auth-utils";
import ThemeToggle from "./ThemeToggle";

export default function UserDetails() {
  const { isAuthenticated, logout } = useAuth();
  const user = useUser();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {/* Theme Toggle - Always visible */}
      <ThemeToggle />

      {/* User Details - Only show when authenticated */}
      {isAuthenticated && (
        <>
          {user?.username && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <User className="w-4 h-4 text-white" />
              </Box>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily:
                    '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {user.username}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            onClick={logout}
            startIcon={<LogOut className="w-4 h-4" />}
            sx={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              },
            }}
          >
            Log out
          </Button>
        </>
      )}
    </Box>
  );
}
