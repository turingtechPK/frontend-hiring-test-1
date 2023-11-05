import "./App.css";
import { Providers } from "./providers";
import Layout from "./containers/layout";

function App() {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
}

export default App;
