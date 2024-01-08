import { Navigate, Outlet } from "react-router-dom";
import {useSelector } from "react-redux";



export const PrivateRoute = () => {
  const { userLoading, isAuthenticated } = useSelector((state) => state.user);

    if (userLoading === false) {
      return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />
    }

  }
