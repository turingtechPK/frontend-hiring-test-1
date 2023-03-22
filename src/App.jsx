import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { CallList, Login } from "./views";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { TokenContext } from "./context/tokenContext";
import "antd/dist/reset.css";
import { useEffect } from "react";
import { API_URL } from "./config";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    //set a timeout to check if the token is still valid
    setTimeout(() => {
      if (token) {
        const fetchToken = async () => {
          try {
            const response = await fetch(API_URL.REFRESH_TOKEN, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });

            const data = await response.json();
            console.log(data.access_token);
            setToken(data.access_token);
          } catch (error) {
            console.error(error);
          }
        };
        fetchToken();
      }
    }, 1000 * 60 * 10);
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/calls" element={<CallList />} />
        </Routes>
      </Router>
    </TokenContext.Provider>
  );
}

export default App;
