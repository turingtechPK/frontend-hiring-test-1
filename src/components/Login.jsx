import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";

const Login = () => {
  const { setAuth, username, setUsername, password, setPassword } =
    useContext(UserContext);
  const { login } = AuthService;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = TokenService.getLocalAccessToken();
    if (token) {
      const decodedJwt = TokenService.parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        navigate("/");
        TokenService.removeUser();
        return
      }
    }

    const res = await login(username, password);
    console.log(res);
    setAuth(true);
    if (res) {
      navigate("/calls");
    }
  }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center m-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
          />
          <Form.Text className="text-muted">
            We will never share your username with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
