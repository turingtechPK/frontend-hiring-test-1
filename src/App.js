import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("us", username, "ps", password);
    alert(`use ${username} pass: ${password}`);
  };
  return (
    <>
      <h1>Hi Mom!</h1>
      <div className="header">
        <img src="./design-files/TT-Logo.png" alt="Logo" />
      </div>
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
}

export default App;
