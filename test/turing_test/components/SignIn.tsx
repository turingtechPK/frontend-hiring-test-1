import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { refreshCall, siginCall } from "../utilities/api";
import { useRouter } from "next/router";
import Table from "./Table";

interface Props {
  setInterval: number;
}

function SignIn() {
  const router = useRouter();
  const ref = useRef();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [time, setTime] = useState(0);
  const [auth, setauth] = useState(false);
  useEffect(() => {
    const delay = time * 60000;
    if (localStorage.getItem("access_token")) {
      console.log(localStorage.getItem("access_token"));
      setauth(true);
    }
    if (time > 0) {
      var intervalId = setInterval(async () => {
        const res = await refreshCall();
        localStorage.setItem("access_token", res.data.access_token);
        console.log(res);
        setTime(1);
      }, delay);
    }

    return () => clearInterval(intervalId);
  }, [time]);
  return (
    <>
      <Navbar />
      {!auth ? (
        <div className="signIn-container">
          <div className="card card-custom">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await siginCall(userName, password);
                setTime(1);
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("refresh_token", res.data.refresh_token);
                console.log(res);
              }}
            >
              <div className="mb-4">
                <label className="form-label mb-3">
                  <span className="required">* </span>User Name
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => {
                    setUserName(e.target.value);
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
      ) : (
        <Table></Table>
      )}
    </>
  );
}

export default SignIn;
