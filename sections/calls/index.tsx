"use client";

import { Box, Paper, Typography } from "@mui/material";
import { CallsTable } from "./calls-table";

export function CallsSection(): JSX.Element {
  return (
    <Paper variant="elevation" elevation={1}>
      <Box py={1} px={2}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
            }}
          >
            Turning Technology Frontend Test
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              color: "text.secondary",
            }}
          >
            Manage your Calls
          </Typography>
        </Box>
        <Box mt={2}>
          <CallsTable />
        </Box>
      </Box>
    </Paper>
  );
}
