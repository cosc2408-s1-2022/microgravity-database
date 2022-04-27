import { createTheme } from '@mui/material/styles'; // TODO Create a custom theme to use application wide.

// TODO Create a custom theme to use application wide.
// https://colorhunt.co/palettes/space  ???
// This is where you change the colours for the whole project
const theme = createTheme({
  palette: {
    primary: {
      main: '#F7F5F8',
      light: '#FAFAFA',
      dark: '#000000',
    },
    secondary: {
      main: '#f44336',
    },
    info: {
      main: '#81c784',
    },
    error: {
      main: '#f44336',
    },
    text: {
      primary: '#000000',
    },
    success: {
      main: '#4B878BFF',
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Roboto',
    body2: {
      fontWeight: 300,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: '#f44336',
        },
        text: {
          color: '#f44336',
          background: 'transparent',
          padding: 0,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});
export default theme;
