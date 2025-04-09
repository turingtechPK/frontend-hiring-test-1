import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        padding: "10px",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Link href="/" passHref>
            <Image
              src={isSmallScreen ? "/TTLogoMob.png" : "/TTLogo.png"}
              alt="Logo"
              width={isSmallScreen ? 50 : 400}
              height={isSmallScreen ? 40 : 50}
            />
          </Link>
        </Box>

        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : user ? (
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#4F46F8",
              color: "white",
              borderRadius: "4px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#3e3bbf",
              },
              fontSize: "16px",
            }}
          >
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
