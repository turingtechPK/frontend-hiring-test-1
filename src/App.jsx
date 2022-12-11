import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "./components/RootRouter";

const App = () => {
  return (
    <CssBaseline>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </CssBaseline>
  );
};

export default App;
