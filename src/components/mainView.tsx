import React, { useEffect, useState } from "react";
import { fetchCalls } from "../state/ducks/calls/callActions";
import { CallResponse, CallState } from "../state/types";
import { ActionType } from "typesafe-actions";
import SignInPage from "../pages/signin";
import CallTable from "./table";
import Navbar from "./Navbar";
import TableViewPage from "../pages/TableViewPage";
import TableViewContainer from "../container/tableViewContainer";

interface IProps {
  fetchCalls: (offset: Number, limit: Number) => Promise<void>;
  // tableData: CallResponse;
  isAuth: boolean;
}

const MainView: React.FC<IProps> = ({ fetchCalls, isAuth }) => {
  useEffect(() => {
    isAuth && fetchCalls(0, 10);
  }, [isAuth]);

  const handleLoginClick = () => {
    console.log("Login button clicked");
  };
  return (
    <>
      <Navbar onLoginClick={handleLoginClick}/>

      {!isAuth && <SignInPage />}
      
      <TableViewContainer/>
      {/* <TableViewPage tableData={tableData}/> */}

      {/* <CallTable data={tableData}/> */}
    </>
  );
};

export default MainView;
