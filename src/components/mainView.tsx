import React, { useEffect } from "react";
import SignInPage from "../pages/signin";
import TableViewContainer from "../container/tableViewContainer";
import Navbar from "./Navbar";

interface IProps {
  fetchCalls: (currentPage: number) => Promise<void>;
  userLogout: () => Promise<void>;
  isAuth: boolean;
}

const MainView: React.FC<IProps> = ({ fetchCalls, isAuth, userLogout }) => {
  useEffect(() => {
    isAuth && fetchCalls(0);
  }, [isAuth]);

  const handleLogout = () => {
    userLogout();
  };
  return (
    <>
      <Navbar onLoginClick={handleLogout} isAuth={isAuth}/>
      {isAuth ? <TableViewContainer /> : <SignInPage />}
    </>
  );
};

export default MainView;
