/* eslint-disable global-require */
/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthenticationContext';
import theme from './theme';

// Ensure this is the correct root element ID from your HTML
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const renderApp = (Component) => {
  if (rootElement.hasChildNodes()) {
    hydrateRoot(
      rootElement,
      <React.StrictMode>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <HelmetProvider>
              <Component />
            </HelmetProvider>
          </ThemeProvider>
        </AuthProvider>
      </React.StrictMode>,
    );
  } else {
    createRoot(rootElement).render(
      <React.StrictMode>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <HelmetProvider>
              <Component />
            </HelmetProvider>
          </ThemeProvider>
        </AuthProvider>
      </React.StrictMode>,
    );
  }
};

renderApp(App);

reportWebVitals();
