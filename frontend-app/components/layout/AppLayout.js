import React from "react";
import { Navbar } from "../navbars/Navbar";

export default function AppLayout({ children }) {
  return (
    <React.Fragment>
      <Navbar />
      <main>{children}</main>
    </React.Fragment>
  );
}
