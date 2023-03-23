import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { refreshToken } from "modules/auth/_redux/authActions";
import { useEffect } from "react";

export const AuthInit = ({ children }) => {
  const { access_token } = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;
    if (access_token) {
      intervalId = setInterval(() => {
        console.log("Called after 8 minutes");
        dispatch(refreshToken());
      }, 480000);
    }

    return () => clearInterval(intervalId);
  }, []);

  return children;
};
