import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginContainer } from "../login/login-container";
import { HomeContainer } from "../home";
import { WithAuth } from "../../hoc";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={WithAuth()(<HomeContainer />)} />
      <Route path="/login" element={<LoginContainer />} />
    </Routes>
  );
};
