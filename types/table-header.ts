import type { SelectProps, TextFieldProps } from "@mui/material";

export interface ITableHeaderData {
  type: "search" | "select" | "multiselect" | "checkbox" | "date";
  FieldProps?: TextFieldProps | SelectProps;
  options?: {
    label?: string;
    value?: string;
  }[];
}
