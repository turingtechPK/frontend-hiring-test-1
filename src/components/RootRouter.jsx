import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { HOME_URL, LOGIN_URL, DASHBOARD_URL } from "../constants/pageUrls";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { loginSelector } from "../store/slices/loginSlice";
import PrivateRoute from "./common/PrivateRoute";

const RootRouter = () => {
  const { isAuthed } = useSelector(loginSelector);
  return (
    <Routes>
      <Route path={HOME_URL}>
        <Route index exact element={<Navigate to={DASHBOARD_URL} replace />} />
        <Route
          exact
          path={DASHBOARD_URL}
          element={
            <PrivateRoute isAuthed={isAuthed} component={<Dashboard />} />
          }
        />
        <Route exact path={LOGIN_URL} element={<Login />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
