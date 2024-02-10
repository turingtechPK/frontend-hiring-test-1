import { Controller, useFormContext } from 'react-hook-form';
import { LoginFormData } from '@/models';
import { FormControl, FormLabel, InputAdornment, TextField } from '@mui/material';
import { PersonOutlined } from '@mui/icons-material';

export function UsernameField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<LoginFormData>();

  return (
    <FormControl>
      <FormLabel sx={{ mb: 2, color: 'black', '& > span': { color: 'red' } }}>
        <span>*</span> User Name
      </FormLabel>

      <Controller
        control={control}
        name="username"
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            inputRef={ref}
            fullWidth
            size="small"
            hiddenLabel
            variant="outlined"
            placeholder="Email"
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlined />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
}
