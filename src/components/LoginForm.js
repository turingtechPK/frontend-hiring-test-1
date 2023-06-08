import React from "react";

const LoginForm = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  return (
    <>
      <div className="auth">
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input type="text" value={username} onChange={handleUsername} />
          <label>Password</label>
          <input type="text" value={password} onChange={handlePassword} />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
