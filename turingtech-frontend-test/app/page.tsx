"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import CallsTable from "./components/CallsTable";
import { CircularProgress, Box } from "@mui/material";

export default function HomePage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    isAuthenticated,
    makeAuthenticatedRequest,
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const loadCalls = async () => {
      try {
        const response = await makeAuthenticatedRequest(
          "/calls?offset=0&limit=10"
        );
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error("Error loading calls:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, [isAuthenticated, makeAuthenticatedRequest]);

  if (loading) {
    return (
      <Box
        className="min-h-screen flex items-center justify-center"
        sx={{ backgroundColor: "background.default" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !initialData) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--mui-palette-background-default)" }}
    >
      <CallsTable initialData={initialData} />
    </div>
  );
}
