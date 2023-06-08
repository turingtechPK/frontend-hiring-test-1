import React, { useContext } from "react";
import Login from "./Login";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import Dashboard from "./Dashboard";

const Layout = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Header />

      {user === null && (
        <>
          <h1>Login {console.log("initial", user)}</h1>
          <Login />
        </>
      )}

      {user !== null && (
        <>
          <Dashboard />
        </>
      )}
    </>
  );
};

export default Layout;
