import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import MainPage from "./components/MainPage";
import AuthServer from "./service/AuthService";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <MainPage />
    </div>
  );
};

export default App;
