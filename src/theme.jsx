import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard',
    fontSizeXs: '11px',
    fontSizeSm: '12px',
    fontSizeMd: '14px',
    fontSizeLg: '30px',
    fontWeightLighter: 300,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightBold: 700,
    lineHeightSm: '-1px',
    lineHeightMd: 1.24,
    letterSpacing: '-4%',

    h1: {
      color: 'rgb(255, 255, 255)',
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: '30px',
      lineHeight: -1,
      letterSpacing: 0,
      textAlign: 'left',
    },
  },
  palette: {
    background: {
      default: 'rgb(25,25,25)',
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

    body1: {
      textAlign: 'left',
      mt: '13px',
    },
    body2: {
      fontSize: '12px',
      fontWeight: '300',
      lineHeight: '15px',
      letterSpacing: '-4%',
      color: 'rgb(215, 215, 215)',
    },
    timeSincePost: {
      color: 'rgb(86,87,87)',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '-1px',
      letterSpacing: '-4%',
      textAlign: 'left',
      alignContent: 'center',
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
    MuiInput: {
      styleOverrides: {
        root: {
          border: '0px',
          borderRadius: '16px',
          outline: 'none',
          background: 'rgb(52,52,52)',
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
