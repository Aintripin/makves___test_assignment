import React from 'react';
import Sidebar from "./components/Sidebar";
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }
`;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.div`
  flex: 1;
  position: relative;
`;

const ThemeToggle = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background-color: ${({ theme }) => theme.toggleBackground};
  color: ${({ theme }) => theme.toggleText};
  border: none;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

function App() {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppContainer>
        <Sidebar />
        <MainContent>
          <ThemeToggle onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </ThemeToggle>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
