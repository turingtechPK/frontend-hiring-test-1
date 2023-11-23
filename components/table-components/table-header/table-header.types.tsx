import type { ButtonProps, SelectProps, TextFieldProps } from "@mui/material";

interface tableHeaderData {
  type: "search" | "select" | "multiselect" | "checkbox" | "date"; 
  FieldProps?: TextFieldProps | SelectProps;
  options?: {
    label?: string;
    value?: string;
  }[];
}

export interface TableHeaderProps {
  tableHeaderData: tableHeaderData[];
  onChanged?: (e: any) => void;
  showClearFilterButton?: boolean;
  debounceTimeout?: number;
  filterButtonShow?: boolean;
  filterButtonLabel?: string;
  filterButtonProps?: ButtonProps;
}
