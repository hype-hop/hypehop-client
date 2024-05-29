import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthenticationContext';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
reportWebVitals();
