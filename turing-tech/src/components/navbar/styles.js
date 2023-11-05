import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const StyledAppBar = styled(AppBar)({
  backgroundColor: "white",
  zIndex: "10",
  boxShadow: "none",
  borderBottom: "2px solid rgb(216, 216, 216)",
  position: "fixed",
  top: "0",
});

export const StyledButton = styled(Button)({
  backgroundColor: "#4f46f8",
  color: "white",
  fontSize: "12px",
  paddingLeft: "20px",
  paddingRight: "20px",
  textTransform: "initial",
});
