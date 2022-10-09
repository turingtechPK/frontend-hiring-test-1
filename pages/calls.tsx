import CallsTable from "../collection/Menu/menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchMyAPI } from "./api/api";
import Navbar from "../collection/navbar/nav";

export default function calls() {

  return (
    <>
      <Navbar />
      <div style={{ padding: 40 }}>
        <h2 style={{ margin: 0.5 }}>Turing Technologies Frontend Test</h2>
        <CallsTable/>
      </div>
    </>
  );
}
