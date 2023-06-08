import { useContext, useState } from "react";
import loginService from "./services/login";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Hi Mom!</h1>
      <div className="header">
        <img src="./design-files/TT-Logo.png" alt="Logo" />
      </div>
      <Login />
      {user !== null && (
        <h1>
          User is: {user.user.username} {user.access_token}{" "}
          {console.log("aa", user.user)}
        </h1>
      )}
    </>
  );
}

export default App;
