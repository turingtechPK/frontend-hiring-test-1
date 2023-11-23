"use client";

import { Box } from "@mui/material";
import { NoContent } from "@assets";

export function NoContentFound(): JSX.Element {
  return (
    <Box display="flex">
      <NoContent />
    </Box>
  );
}
