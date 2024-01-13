import "./App.css";
import { useEffect } from "react";
import { login } from "./services/auth";
import Layout from "./layout/Layout";
import Calls from "./pages/Calls/Calls";

function App() {
  useEffect(() => {
    login();
  }, []);

  return (
    <Layout>
      <Calls />
    </Layout>
  );
}

export default App;
