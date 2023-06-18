import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { LoginStyled } from './login.style';

export const Login = () =>{
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data:any) => {
    console.log(data); // You can replace this with your desired logic for handling form submission
  };

  return (
    <LoginStyled>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="input-fields">
                <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                error={errors.email ? true : false}
                />
                <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password', { required: 'Password is required' })}
                error={errors.password ? true : false}
                />
        </Box>
      <Button type="submit" variant="contained" color="primary">Login</Button>
    </form>
    </LoginStyled>
  );
}
