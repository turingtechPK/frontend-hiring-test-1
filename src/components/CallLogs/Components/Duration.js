import { Box, Typography } from "@mui/material";
import React from "react";

const Duration = ({ timeDuration, component }) => {
  const seconds = timeDuration % 60;
  const minutes = (timeDuration - seconds) / 60;
  return (
    <Box>
      <Typography variant="subtitle2">
        {minutes} Minutes {seconds} Second
      </Typography>
      {!component === "notes" ? (
        <Typography variant="subtitle2">{timeDuration} seconds</Typography>
      ) : null}
    </Box>
  );
};

export default Duration;
