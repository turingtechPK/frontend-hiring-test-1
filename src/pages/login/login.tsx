import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { TextField, Button, Box } from '@mui/material';

import { LoginStyled } from './login.style';
import { LoginApi } from '../../services/login/login.api';


export const Login = () =>{
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        try{ //Todo: Have to look at it again
            const response =await LoginApi(data);
            localStorage.setItem('jwtToken',response.access_token);
            navigate('/home')
        } catch(error) {
            console.log(error);
        }
    };

  return (
    <LoginStyled>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="input-fields">
                <TextField
                id="username"
                label="User Name"
                variant="outlined"
                fullWidth
                {...register('username', { required: 'Username is required' })}
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
