import { useState, useEffect } from "react";

import Header from "./components/Header";

import LoginForm from "./components/LoginForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedIsLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn ? <p>asdas</p> : <LoginForm />}
    </>
  );
}

export default App;
