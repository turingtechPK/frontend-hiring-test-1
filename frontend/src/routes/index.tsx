import { Navigate, Route, Routes } from "react-router-dom";
import Calls from "../pages/Calls/index";
import Call from "../pages/Call/index";
import Login from "../pages/Login/index";
import { useSelector } from "react-redux";

export default function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Calls />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

const PrivateRoute = ({ children }: any) => {
  const token = useSelector((state: any) => state.auth.accessToken);
  const isLoggedIn = token.length > 0;

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/login" />;
};
