import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { authLogin } from '../../api/api_handler';
import { useDispatch } from 'react-redux';
import { setAuthenticationStatus } from '../../redux/actions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loginHandler = () => {
    dispatch(setAuthenticationStatus('loading'));
    authLogin(email, password)
      .then(({ data: { access_token, refresh_token } }) => {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        dispatch(setAuthenticationStatus('authenticated'));
      })
      .catch(() => {
        alert('error');
      });
  };
  return (
    <div className="m-auto shadow-sm p-3 bg-white rounded col-md-8 col-lg-6 col-sm-12">
      <Form className="p-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="mb-4">
            <span className="text-tt-danger mr-2">*</span>Email address
          </Form.Label>
          <Form.Control
            className="mb-4"
            type="email"
            placeholder="Enter email"
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="mb-4">
            <span className="text-tt-danger mr-2">*</span>Password
          </Form.Label>
          <Form.Control
            className="mb-4"
            type="password"
            placeholder="Password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </Form.Group>
        <button
          className="btn-tt btn-tt-login"
          type="button"
          disabled={!email || !password}
          onClick={() => loginHandler()}
        >
          Log in
        </button>
      </Form>
    </div>
  );
}
