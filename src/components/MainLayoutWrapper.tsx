'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../AuthenticationContext';
import theme from '../theme';
import MenuAppBar from './common/Header/Header';

export default function MainLayoutWrapper({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <MenuAppBar />
          {children}
        </CssBaseline>
      </ThemeProvider>
    </AuthProvider>
  );
}
