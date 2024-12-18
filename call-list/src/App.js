import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import HideAppBar from "./components/HideAppBar";
import ReactVirtualizedTable from "./pages/HomePage";
import CallDetail from "./pages/CallDetail";
import AboutMe from "./pages/AboutMe";
import NotFound from "./components/NotFound";

import "./App.css";

const AppLayout = ({ children }) => (
  <div>
    <HideAppBar />
    {children}
  </div>
);

const App = () => (
  <BrowserRouter>
    <AppLayout>
      <Routes>
        <Route path="/login/" element={<SignIn />} />
        <Route path="/" element={<ReactVirtualizedTable />} />
        <Route path="/calls/:uuid" element={<CallDetail />} />
        <Route path="/me" element={<AboutMe />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  </BrowserRouter>
);

export default App;
