import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import { selectUser, setUser } from "../feature/userSlice";

const RequireAuth = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!user && localStorage.getItem("user")) {
    dispatch(setUser(JSON.parse(localStorage.getItem("user") as any)));
  }
  return (
    <div>
      {user || localStorage.getItem("user") ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </div>
  );
};
export default RequireAuth;
