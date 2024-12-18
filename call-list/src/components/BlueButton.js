import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BlueButton(props) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" sx={{ textTransform: "none" }}>
        {props.text}
      </Button>
    </Stack>
  );
}
