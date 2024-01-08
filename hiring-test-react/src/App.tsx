import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./components/Header";
import AppRoutes from "./routes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedIsLoggedIn);

    if (!storedIsLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <AppRoutes />
    </>
  );
}

export default App;
