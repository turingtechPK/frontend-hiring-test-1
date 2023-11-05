import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledModalHeader = styled(Box)({
  width: "100%",
  height: "110px",
  borderBottom: "1px solid rgb(178, 178, 178)",
  display: "grid",
  placeItems: "center",
});

export const StyledModalHeaderContent = styled(Box)({
  width: "90%",
  height: "75%",
  display: "flex",
  placeItems: "row",
});

export const StyledHeaderLeft = styled(Box)({
  width: "95%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "2px",
  justifyContent: "center",
});

export const StyledHeaderRight = styled(Box)({
  width: "10%",
  height: "100%",
  display: "flex",
  placeItems: "row",
  alignItems: "center",
  justifyContent: "center",
});

export const ModalHeaderHeading = styled(Typography)({
  fontSize: "25px",
  color: "black",
});
export const ModalHeaderSubheading = styled(Typography)({
  fontSize: "18px",
  color: "#4f46f8",
});

export const StyledModalBody = styled(Box)({
  width: "100%",
  height: "fit-content",
  display: "grid",
  placeItems: "center",
});

export const StyledModalBodyContent = styled(Box)({
  width: "90%",
  height: "75%",
  display: "flex",
  flexDirection: "column",
  rowGap: "8px",
});

export const SingleRow = styled(Box)({
  width: "80%",
  height: "fit-content",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  placeItems: "center",
});

export const Label = styled(Typography)({
  fontSize: "18px",
  color: "black",
  width: "100%",
});

export const Value = styled(Typography)({
  fontSize: "18px",
  color: "black",
  width: "100%",
});

export const NotesInputContainer = styled(Box)({
  width: "100%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  rowGap: "8px",
  marginTop: "15px",
});

export const NotesInputField = styled(TextField)({
  width: "100%",
  height: "350px",
  borderRadius: "5px",
  border: "1px solid rgb(178, 178, 178)",
});
