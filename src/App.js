import "./App.css";
import { Typography, Box } from "@mui/material";
import Header from "./Header/Header";
import { useState, useEffect } from "react";
import BasicTable from "./Table/Table";
import Dropdown from "./Dropdown/Dropdown";
import Cookies from "js-cookie";
import { refreshTokenService } from "./Service/Service";

function App() {
  const isAuth = Cookies.get("jwt_token");
  const [status, setStatus] = useState("");

  // Function to refresh the authentication token
  const refreshAuthToken = async () => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const response = await refreshTokenService(jwtToken);
      const newAuthToken = response.data.access_token;
      Cookies.remove("jwt_token");
      Cookies.set("jwt_token", newAuthToken);
    } catch (error) {
      console.log("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    //This is called after every 9 minutes
    const tokenRefreshInterval = setInterval(refreshAuthToken, 540000);
    // Clean up the interval on component unmount
    return () => {
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  //If token doesn't exists redirect to login
  if (!isAuth) {
    window.location.href = "/";
  }

  return (
    <div className="App">
      <Header />
      <Box m={4}>
        <Typography variant="h4" textAlign="left">
          Turing Technologies Frontend Test
        </Typography>
      </Box>
      <Box m={5}>
        <Dropdown setStatus2={setStatus} />
      </Box>
      <Box textAlign="center" m={3}>
        <BasicTable status={status} />
      </Box>
    </div>
  );
}

export default App;
