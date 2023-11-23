import { styled } from "@mui/material/styles";
import Link from "next/link";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.dark,
  padding: "0px 5px",
}));
