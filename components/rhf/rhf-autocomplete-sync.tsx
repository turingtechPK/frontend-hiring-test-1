// react
import { useState } from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// mui icons
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Checkbox, Chip, FormLabel, Stack } from "@mui/material";

// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function RHFAutocompleteSync({
  name,
  options,
  variant = "outlined",
  multiple = false,
  getOptionLabel = (option: any) => option.name,
  outerLabel,
  StartIcon,
  EndIcon,
  placeholder,
  isOptionEqualToValue = (option: any, newValue: any) =>
    option.id === newValue.id,

  renderOption = (props, option: any, { selected }) => {
    return (
      <li {...props} key={option.id}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {getOptionLabel(option)}
      </li>
    );
  },

  renderTags = (tagValue, getTagProps) => {
    return tagValue.map((option: any, index) => (
      <Chip
        {...getTagProps({ index })}
        key={option.id}
        label={getOptionLabel(option)}
      />
    ));
  },
  ...other
}: any): JSX.Element {
  // states
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  // constants
  const label = other.label;

  // on changes
  const onChanged = (e: any, newValue: any, onChange: any): void => {
    onChange(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={(form) => (
        <Stack gap="0.6rem">
          {outerLabel && <FormLabel>{outerLabel}</FormLabel>}
          <Autocomplete
            {...form.field}
            id={name}
            multiple={multiple}
            options={options}
            getOptionLabel={getOptionLabel}
            autoComplete
            open={open}
            noOptionsText="No option"
            disableCloseOnSelect
            {...other}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={(e: React.SyntheticEvent, newValue: any) => {
              form.field.onChange(newValue);
              onChanged(e, newValue, form.field.onChange);
            }}
            renderOption={renderOption}
            renderTags={renderTags}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                variant={variant}
                error={Boolean(form.fieldState.error)}
                helperText={form.fieldState.error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>{EndIcon ?? params.InputProps.endAdornment}</>
                  ),
                  ...(StartIcon && { startAdornment: StartIcon }),
                }}
              />
            )}
          />
        </Stack>
      )}
    />
  );
}
