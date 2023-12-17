"use client";

import { Box } from "@mui/material";

interface PageNumProps {
  firstIndex: number;
  lastIndex: number;
  totalIndex: number;
}

const PageNumber: React.FC<PageNumProps> = ({
  firstIndex,
  lastIndex,
  totalIndex,
}) => {
  return (
    <Box
      style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize:"11.5px" }}
      marginTop="10px" marginBottom="50px"
    >
      {firstIndex} - {lastIndex} of {totalIndex} results
    </Box>
  );
};

export default PageNumber;
