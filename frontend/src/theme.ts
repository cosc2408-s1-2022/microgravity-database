import { createTheme } from '@mui/material/styles'; // TODO Create a custom theme to use application wide.

// TODO Create a custom theme to use application wide.
// https://colorhunt.co/palettes/space  ???
// This is where you change the colours for the whole project
const theme = createTheme({
  palette: {
    primary: {
      main: '#f7f5f8',
      light: '#fafafa',
      dark: '#2368de',
    },
    secondary: {
      main: '#f44336',
      light: '#f7f5f8',
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
      main: '#4b878bff',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: 'Roboto',
    allVariants: {
      color: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: '#cc0808',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: 70,
          minHeight: 40,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: 70,
          minHeight: 40,
        },
      },
    },
  },
});
export default theme;
