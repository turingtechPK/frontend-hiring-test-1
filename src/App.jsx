import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import store from "./redux/store";
import { refreshAccessToken, userInfo } from "./redux/actions/user";
import Spinner from "./components/UI/Spinner/Spinner";
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

axios.defaults.withCredentials = false;

function App() {
  const { userLoading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(userInfo())
  }, [])

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element= {!userLoading && (isAuthenticated ? <Navigate to="/" /> : <Login />)} />

      </Routes>
       </Suspense>
    </>
  )
}

export default App
