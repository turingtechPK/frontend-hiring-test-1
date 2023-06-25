import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header/header";
import Login from "./routes/login/login";
import Home from "./routes/home/home";
import { PrivateRoute } from "./Routing/Routing";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  document.title = "Turing Test";
  useEffect(() => {
    // Function to send the request and get a new access token
    const fetchNewAccessToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/refresh-token`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const newAccessToken = response.data.access_token;
        // Store the new access token in local storage
        localStorage.setItem("access_token", newAccessToken);
      } catch (error) {
        // Handle error
        console.error("Error refreshing access token:", error);
      }
    };

    // Call the function immediately
    fetchNewAccessToken();

    // Set an interval to call the function every 10 minutes
    const intervalId = setInterval(fetchNewAccessToken, 10 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
