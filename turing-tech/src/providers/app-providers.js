import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "../context";
import { theme } from "../assets/theme";
import { client } from "../apollo-client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "../context/modal";

export const Providers = ({ children }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);
