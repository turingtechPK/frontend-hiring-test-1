import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DialogStyles = styled(Dialog)(() => ({
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "& .MuiPaper-root": {
    width: "300px",
  },
}));

export const DialogTitleStyles = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  // color: theme.palette.primary.main,
  // backgroundColor: theme.palette.backgroundColor,
}));

export const IconButtonStyles = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: theme.palette.primary.main,
}));

export const FilterStyles = styled(Box)(() => ({
  position: "relative",
  padding: "5%",
}));
