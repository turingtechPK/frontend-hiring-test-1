import { Box, Typography } from "@mui/material";
import React from "react";

const CallType = ({ type }) => {
  return (
    <Box>
      {type === "voicemail" ? (
        <Typography variant="subtitle2" style={styles.voicemail}>
          Voice Mail
        </Typography>
      ) : type === "answered" ? (
        <Typography variant="subtitle2" style={styles.answered}>
          Answered
        </Typography>
      ) : type === "missed" ? (
        <Typography variant="subtitle2" style={styles.missed}>
          Missed
        </Typography>
      ) : null}
    </Box>
  );
};

export default CallType;

const styles = {
  voicemail: { color: "#325ae7" },
  answered: { color: "#1dc9b7" },
  missed: { color: "#c91d3e" },
};
