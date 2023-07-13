import React, { useState } from "react";

const Form = () => {
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const Submit=()=>
  
  return (
    <div className="signIn-container">
      <div className="card card-custom">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await siginCall(userName, password);
            setTime(7);
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
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
  );
};

export default Form;
