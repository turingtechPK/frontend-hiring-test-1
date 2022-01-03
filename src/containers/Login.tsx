import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { BaseAPIURL } from "./common";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleValidation = (event?: any) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Alphabets and length must be of min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
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
    sessionStorage.setItem("userName", email);
    sessionStorage.setItem("password", password);
    if (handleValidation()) {
      axios
        .post(BaseAPIURL + "auth/login", userObject)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.access_token);
          localStorage.setItem("token", res.data.access_token);
          setRedirect(true);
        })
        .catch((error) => {
          console.log(error);
          setRedirect(false);
        });
    }
  };

  if (redirect) {
    return <Navigate to="/Calls" />;
  }

  return (
    <div className="login-parent">
      <div className="login">
        <h3>Sign In</h3>
        <div className="row">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <br />

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
