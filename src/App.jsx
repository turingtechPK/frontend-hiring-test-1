import { Route, Routes } from "react-router-dom";
import TTAppBar from "./Components/AppBar/AppBar";
import Login from "./Pages/Authentication/Login";
import Calls from "./Pages/Calls/Calls";
import NotFound from "./Pages/NotFoundPage/NotFound";
import "./App.css";

function App() {
  return (
    <>
      <TTAppBar />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/calls" exact element={<Calls />} />
        <Route path="*" exact element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
