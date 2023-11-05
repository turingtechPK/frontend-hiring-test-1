/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useLocalStorage } from "../hooks";

export const WithAuth = () => (Component) => {
  const { userData, userLoading } = useAuth();
  const [storedUserData] = useLocalStorage("user-data");

  if ((userData && !userLoading) || storedUserData) {
    return Component;
  } else {
    return <Navigate to="/login" />;
  }
};
