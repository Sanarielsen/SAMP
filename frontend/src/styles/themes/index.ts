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
      200: "#bbf7d0",
    },
    error: {
      main: '#9F0712',
      50:  "#fdf2f2",
      100: "#fde8e8",
      200: "#fbd5d5",
      300: "#f8b4b4",
      400: "#f98080",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#9F0712",
      900: "#7a0610",
    },
    warning: {
      main: '#F0B100',
      50:  "#fffdf2",
      100: "#fff8db",
      200: "#feefb3",
      300: "#fde27a",
      400: "#f7cb33",
      500: "#F0B100",
      600: "#d89e00",
      700: "#b88400",
      800: "#966b00",
      900: "#755300",
    },
    info: {
      main: '#00598A',
    },
    common: {
      white: '#F5F5F4',
      black: '#000000',
    },
    grey: {
      800: '#ABA09C',
      400: '#99a1af',
      100: '#f3f4f6'
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
      800: '#ABA09C',
      400: '#99a1af',
      100: '#f3f4f6'
    }
  },
});