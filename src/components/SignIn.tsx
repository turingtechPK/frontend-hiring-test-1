import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { BaseURL } from '../utils/BaseURL';
import { Form, Button } from 'react-bootstrap';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [emailError, setemailError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleValidation = (event?: any) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError('Email Not Valid');
      return false;
    } else {
      setemailError('');
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        'Only Alphabets and length must be of min 8 Chracters and Max 22 Chracters'
      );
      return false;
    } else {
      setpasswordError('');
      formIsValid = true;
    }

    return formIsValid;
  };

  const userObject = {
    username: email,
    password: password,
  };

  const loginSubmit = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem('userName', email);
    sessionStorage.setItem('password', password);
    if (handleValidation()) {
      axios
        .post(BaseURL + 'auth/login', userObject)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.access_token);
          localStorage.setItem('token', res.data.access_token);
          setRedirect(true);
        })
        .catch((error) => {
          console.log(error);
          setRedirect(false);
        });
    }
  };

  if (redirect) {
    return <Navigate to='/Calls' />;
  }

  return (
    <div className='login-parent'>
      <div className='login'>
        <h3><i className="fas fa-user"></i></h3>
        <div className='row'>
          <div className='col-md-4'>
            <Form id='loginform' onSubmit={loginSubmit}>
              <div className='form-group'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  className='form-control'
                  id='EmailInput'
                  name='EmailInput'
                  aria-describedby='emailHelp'
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
                <small id='emailHelp' className='text-danger form-text'>
                  {emailError}
                </small>
              </div>
              <div className='form-group'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  className='form-control'
                  id='exampleInputPassword1'
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id='passworderror' className='text-danger form-text'>
                  {passwordError}
                </small>
              </div>
              <br />
              <Button variant='primary' type='submit'>
                Sign In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
