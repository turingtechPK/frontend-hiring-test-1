import { Controller, useFormContext } from 'react-hook-form';
import { LoginFormData } from '@/models';
import { FormControl, FormLabel, InputAdornment, TextField } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

export function PasswordField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<LoginFormData>();

  return (
    <FormControl>
      <FormLabel sx={{ mb: 2, color: 'black', '& > span': { color: 'red' } }}>
        <span>*</span> Password
      </FormLabel>

      <Controller
        control={control}
        name="password"
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            fullWidth
            inputRef={ref}
            size="small"
            hiddenLabel
            variant="outlined"
            placeholder="Password"
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
}
