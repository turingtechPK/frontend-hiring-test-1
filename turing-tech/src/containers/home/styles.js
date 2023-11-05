import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledWrapper = styled(Box)({
  width: "100%",
  height: "92vh",
  display: "grid",
  placeItems: "center",
  paddingTop: "60px",
});

export const StyledContentContainer = styled(Box)({
  height: "90%",
  width: "90%",
  maxWidth: "1350px",
  display: "flex",
  flexDirection: "column",
  rowGap: "40px",
});
