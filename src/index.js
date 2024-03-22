import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthenticationContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
    <App />
    </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
