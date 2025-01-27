import './App.css';

import { BaseModalBackground, ModalProvider } from 'styled-react-modal';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import { AppRoutes } from './routes/routes';
import Content from './layouts/content';
import { useThemeChooser } from './contexts/theme-chooser';
import ErrorBoundary from './ErrorBoundaries/global-error-boundary';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Helvetica, Roboto, Arial, sans-serif;
    transition: all 0.50s linear;
  }
  `;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FadingBackground: any = styled(BaseModalBackground)`
  opacity: ${(props) => props.theme.opacity};
  transition: all 0.3s ease-in-out;
`;

function App() {
  const { themeConfig } = useThemeChooser();
  return (
    <ThemeProvider theme={themeConfig}>
      <ModalProvider backgroundComponent={FadingBackground}>
        <GlobalStyles />
        <ErrorBoundary>
          <Content>
            <AppRoutes />
          </Content>
        </ErrorBoundary>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
