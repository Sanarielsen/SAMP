import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#973C00',
      main: '#973C00',
      dark: '#7A3000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#894B00',
      main: '#894B00',
      dark: '#894B00',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F4',
    },
    success: {
      main: '#016630',
    },
    error: {
      main: '#9F0712',
    },
    warning: {
      main: '#F0B100',
    },
    info: {
      main: '#00598A',
    },
    common: {
      white: '#F5F5F4',
      black: '#000000',
    },
    grey: {
      800: '#ABA09C' 
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#973C00',
      main: '#973C00',
      dark: '#973C00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#894B00',
      main: '#fff',
      dark: '#894B00',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F4',
    },
    success: {
      main: '#016630',
    },
    error: {
      main: '#9F0712',
    },
    warning: {
      main: '#F0B100',
    },
    info: {
      main: '#00598A',
    },
    common: {
      white: '#F5F5F4',
      black: '#000000',
    },
    grey: {
      800: '#ABA09C' 
    }
  },
});