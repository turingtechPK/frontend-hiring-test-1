import React from "react";
import Routing from "./routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { refreshToken } from "./common/auth";

function App() {
  const access_token = useSelector((state: any) => state.auth.accessToken);

  useEffect(() => {
    let tokenTimer: NodeJS.Timer | undefined;
    if (access_token.length > 0) {
      tokenTimer = setInterval(() => refreshToken(), 400000);
    }
    return () => {
      clearInterval(tokenTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Routing />;
}

export default App;
