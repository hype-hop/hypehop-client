import { createTheme, responsiveFontSizes, Theme } from '@mui/material';
import { CSSProperties } from 'react';
import { typography } from './constants/themeValue';

declare module '@mui/material' {
  interface Color {
    dark: string;
    main: string;
    light: string;
  }

  interface PaletteOptions {
    white: Partial<Color>;
    star: Partial<Color>;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    timeSincePost: CSSProperties;
  }

  interface TypographyVariantsOptions {
    timeSincePost?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    timeSincePost: true;
  }
}

const theme: Theme = createTheme({
  typography: {
    fontFamily: 'Pretendard',
    fontSize: 11,
    fontWeightLight: typography.weight.light,
    fontWeightRegular: typography.weight.regular,
    fontWeightMedium: typography.weight.medium,
    fontWeightBold: typography.weight.bold,
    h1: {
      color: 'rgb(255, 255, 255)',
      fontFamily: 'Pretendard',
      fontWeight: typography.weight.bold,
      fontSize: '30px',
      lineHeight: -1,
      letterSpacing: 0,
      textAlign: 'left',
    },
    timeSincePost: {
      color: 'rgb(86,87,87)',
      fontSize: typography.size.lg,
      fontWeight: typography.weight.light,
      lineHeight: typography.lineHeight.sm,
      letterSpacing: '-4%',
      textAlign: 'left',
      alignContent: 'center',
    },
  },
  palette: {
    background: {
      default: 'rgb(14, 14, 14)',
    },
    text: {
      primary: 'rgb(255,255,255)',
    },
    primary: {
      main: 'rgb(255,255,255)',
    },
    white: {
      main: 'rgb(255,255,255)',
    },
    grey: {
      main: 'rgb(168,168,168)',
      light: 'rgb(215,215,215)',
      dark: 'rgb(86,87,87)',
    },
    star: {
      main: 'rgb(255, 196, 3)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: 'rgb(52, 52, 52)',
          borderRadius: '16px',
          outline: 'none',
          background: 'rgb(22, 22, 22)',
          color: 'white',
          padding: '15px',
          '&::before': {
            content: 'none',
          },
          '&::after': {
            content: 'none',
          },
          fontSize: '14px',
        },
        input: { padding: '0px', lineHeight: '1', '&::placeholder': { color: 'white' } },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconEmpty: {
          color: 'rgb(255, 196, 3)',
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
