"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(username, password);

    if (result.success) {
      router.push("/");
      router.refresh();
    } else {
      setError(result.error || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            padding: "48px 40px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              marginBottom: "32px",
              color: "#111827",
              fontSize: "28px",
              fontWeight: 900,
              textAlign: "center",
              fontFamily: '"AvenirLTStd-Black", "Avenir LT Std", sans-serif',
              letterSpacing: "-0.025em",
            }}
          >
            Log in
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography
                variant="body2"
                sx={{
                  marginBottom: "8px",
                  color: "#374151",
                  fontFamily: '"AvenirLTStd-Book", "Avenir LT Std", sans-serif',
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                <span style={{ color: "#ef4444", fontWeight: 600 }}>*</span>{" "}
                User Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: <Person className="text-gray-400 mr-2" />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily:
                      '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                    transition: "all 0.2s ease",
                    "& fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9ca3af",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                      borderWidth: "2px",
                    },
                  },
                }}
                required
              />
            </div>

            <div>
              <Typography
                variant="body2"
                sx={{
                  marginBottom: "8px",
                  color: "#374151",
                  fontFamily: '"AvenirLTStd-Book", "Avenir LT Std", sans-serif',
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                <span style={{ color: "#ef4444", fontWeight: 600 }}>*</span>{" "}
                Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <Lock className="text-gray-400 mr-2" />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily:
                      '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                    transition: "all 0.2s ease",
                    "& fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9ca3af",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                      borderWidth: "2px",
                    },
                  },
                }}
                required
              />
            </div>

            {error && (
              <Alert severity="error" sx={{ marginTop: "16px" }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: "#6366f1",
                color: "white",
                padding: "14px",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                textTransform: "none",
                fontFamily: '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.3)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#5855eb",
                  boxShadow: "0 6px 8px -1px rgba(99, 102, 241, 0.4)",
                  transform: "translateY(-1px)",
                },
                "&:disabled": {
                  backgroundColor: "#9ca3af",
                  boxShadow: "none",
                  transform: "none",
                },
              }}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
