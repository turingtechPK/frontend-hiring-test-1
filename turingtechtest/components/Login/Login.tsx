import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { siginCall } from "../../utilities/api";
import TableData from "../DataDisplay/TableData";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [authenticated, setAuthenticated] = useState(false);

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await siginCall(username, password);
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh_token);
    setAuthenticated(true);
  }

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      setAuthenticated(true);
    }
  }, []);

  function renderSignInForm() {
    return (
      <div className="signIn-container">
        <div className="card card-custom">
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="form-label mb-3">
                <span className="required">* </span>User Name
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label mb-3">
                <span className="required">* </span>Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => {
                  console.log("password", e.target.value);
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-login">
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      {!authenticated ? (
        renderSignInForm()
      ) : (
        <>
          <Navbar />
          <TableData />
        </>
      )}
    </>
  );
}

export default Login;
