import { AppBar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const AppBarStyles = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  position: "static",
  height: theme.spacing(10),
}));

export const BoxStyles = styled(Box)(() => ({
  flexGrow: 1,
  position: "relative",
  top: "50%",
  transform: "translate(0, -50%)",
}));

export const LogoStyles = styled(Link)(({ theme }) => ({
  "& > img": {
    width: theme.spacing(39),
    height: theme.spacing(4.6),
  },
  marginLeft: theme.spacing(5),
}));
