import { Outlet } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme";
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BobaesumJindoTTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/BobaesumJindoTTF.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
    background-color: ${(props) => props.theme.black.lighter};
  }
`;

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
