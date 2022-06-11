import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { LOGIN_USER } from '../../../graphql/mutation/authentication';
import { Button, Form } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const [signIn, { loading } ] = useMutation(LOGIN_USER);

  const onSubmit = async () => {
    try {
      const { data: { login: { access_token } } } = await signIn({
        variables: {   
          username: values.username, 
          password: values.password
        }
      });

     localStorage.setItem('access_token', access_token);
     localStorage.setItem('token_created_at', new Date().toString())
     navigate('/calls');
    } catch (error) {
      console.log({error})
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ width: '350px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: '32px', borderRadius: '20px' }}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={({ target }) => setValues({ ...values, username: target.value })} type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={({ target }) => setValues({ ...values, password: target.value })} autoComplete='current-password' type="password" placeholder="Enter Password" />
        </Form.Group>
        <Button disabled={loading} onClick={onSubmit} style={{ width: '100%' }} variant="primary">
          Sign In
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default Login;
