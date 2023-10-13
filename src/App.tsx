import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import ListPage from "./pages/ListPage"
import RequireAuth from "./auth/RequireAuth"; 

const App = () => {
  return (
    <Routes>
        <Route element={<RequireAuth />}>
          <Route index element={<ListPage />} />
        </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
