import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    font-family: AvenirLTStd-Roman, sans-serif;
    font-weight: 300;
  }
  .main-layout{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  body{
    padding: 0;
    margin: 0;
  }
`;
export default GlobalStyle;
