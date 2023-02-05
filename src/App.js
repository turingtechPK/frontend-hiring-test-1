// import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CallLogs from "./components/CallLogs/CallLogs";
import Login from "./components/Login/Login";
import { Box } from "@mui/system";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const baseApi = "https://frontend-test-api.aircall.io";

  setInterval(() => {
    if (accessToken) {
      axios
        .post(
          "https://frontend-test-api.aircall.io/auth/refresh-token",
          refreshToken,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          setAccessToken(response.data.access_token);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [599000]);
  return (
    <div className="App">
      {accessToken ? (
        <Box style={{ width: "100%", height: "100vh" }}>
          <CallLogs
            accessToken={accessToken}
            baseApi={baseApi}
            setAccessToken={setAccessToken}
          />
        </Box>
      ) : (
        <Box style={{ width: "100%", height: "100vh" }}>
          <Login
            setAccessToken={setAccessToken}
            setRefreshToken={setRefreshToken}
          />
        </Box>
      )}
    </div>
  );
}

export default App;
