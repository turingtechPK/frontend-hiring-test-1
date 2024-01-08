import { Typography } from "@mui/material";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";

import { stylesMui } from "./styles";

interface TextField {
  name: string;
  placeholder: string;
  label?: string;
  type: string;
  fullWidth?: boolean;
  multiline?: boolean;
  minRows?: number;
  inputAdornment?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField = ({
  name,
  placeholder,
  label,
  type,
  fullWidth,
  multiline,
  minRows,
  inputAdornment,
  onChange,
}: TextField) => {
  return (
    <>
      {label && (
        <Typography variant="h6" sx={stylesMui.formLabel}>
          {label}
        </Typography>
      )}
      <TextField
        margin="none"
        name={name}
        placeholder={placeholder}
        type={type}
        {...(multiline ? { multiline, minRows } : {})}
        {...(fullWidth ? { fullWidth } : {})}
        onChange={onChange}
        autoComplete="off"
        {...(fullWidth ? { fullWidth } : {})}
        sx={stylesMui.formField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{inputAdornment}</InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default InputField;
