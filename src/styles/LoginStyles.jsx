import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormStyles = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  justifyContent: "space-between",
  width: theme.spacing(50),
  height: theme.spacing(30),
  background: "white",
  padding: theme.spacing(1.2),
}));
