import { Typography, Box } from "@mui/material";

import { styled } from "@mui/material/styles";

export const TypographyCapitalizeStyles = styled(Typography)(() => ({
  textTransform: "capitalize",
}));

export const TablePaginationStyles = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: theme.spacing(2.5),
}));
