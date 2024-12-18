import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import BlueButton from "./BlueButton";
import Box from "@mui/material/Box";
import { getAccessToken } from "../utils/authUtils";
import { Typography } from "@mui/material";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: "white",
            boxShadow: 3,
            padding: "10px 20px",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="TT Logo.png"
                alt="Logo"
                style={{
                  height: "40px",
                  width: "auto",
                  marginRight: "10px",
                }}
              />
            </Box>
            {getAccessToken() && (
              <BlueButton
                text="Logout"
                sx={{
                  padding: "8px 20px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  borderRadius: "6px",
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  },
                }}
              />
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
