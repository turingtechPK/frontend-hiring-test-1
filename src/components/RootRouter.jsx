import { Navigate, Route, Routes } from "react-router-dom";
import { HOME_URL, LOGIN_URL } from "../constants/pageUrls";
import Login from "../pages/Login";

const RootRouter = () => {
  return (
    <Routes>
      <Route path={HOME_URL}>
        <Route index exact element={<Navigate to={LOGIN_URL} replace />} />
        <Route exact path={LOGIN_URL} element={<Login />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
