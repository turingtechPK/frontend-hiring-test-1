import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

export const ControlledTextField = ({
  name,
  label,
  width,
  height,
  size,
  disabled,
  type,
  variant,
}) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
  });

  return (
    <>
      <TextField
        name={name}
        size={size}
        id="outlined-basic"
        disabled={disabled}
        label={label}
        inputProps={{
          style: {
            height: height ?? "10px",
            width: width ?? "500px",
          },
        }}
        InputLabelProps={{ shrink: true }}
        value={value ? (typeof value === "object" ? value?.label : value) : ""}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        variant={variant ?? "outlined"}
      />
    </>
  );
};
