import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
const Home = () => {
  const [calls, setCalls] = useState("");

  useEffect(() => {
    AuthService.login().then((response) => {
      console.log("USER LOGGED!");
    });
    UserService.getCalls().then(
      (response) => {
        setCalls(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setCalls(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{calls}</h3>
      </header>
    </div>
  );
};

export default Home;
