import { Navigate, Route, Routes } from "react-router-dom";
import { HOME_URL, LOGIN_URL, DASHBOARD_URL } from "../constants/pageUrls";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

const RootRouter = () => {
  return (
    <Routes>
      <Route path={HOME_URL}>
        <Route index exact element={<Navigate to={DASHBOARD_URL} replace />} />
        <Route exact path={DASHBOARD_URL} element={<Dashboard />} />
        <Route exact path={LOGIN_URL} element={<Login />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
