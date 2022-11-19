import { render } from "react-dom";
import Navbar from "./components/navigation/Navbar";
import SignIn from "./pages/sign.in.page";
import "bootstrap/dist/css/bootstrap.min.css";
import CallDetails from "./pages/call.details.page";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/details" element={<CallDetails />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

render(<App />, document.getElementById("root"));
