import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshAccessToken } from "../../redux/actions/user";


export const PrivateRoute = () => {
  const { userLoading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

    
  useEffect(() => {
  const checkAndRefreshToken = async () => {
    const storedExpTime = localStorage.getItem("exp_time");

    const fiveMinutesInMillis = 5 * 60 * 1000;

    if (Date.now() - storedExpTime > fiveMinutesInMillis) {
      console.log("Attempting to Refresh Token after five minutes ");
      await dispatch(refreshAccessToken());
    }
  };

  const refreshTokenInterval = setInterval(checkAndRefreshToken, 5 * 60 * 1000);
  return () => clearInterval(refreshTokenInterval);
}, [dispatch]);

    if (userLoading === false) {
      return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />
    }

  }
