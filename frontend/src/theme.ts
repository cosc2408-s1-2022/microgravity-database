import { createTheme } from '@mui/material/styles'; // TODO Create a custom theme to use application wide.

// TODO Create a custom theme to use application wide.
// https://colorhunt.co/palettes/space  ???
// This is where you change the colours for the whole project
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
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
      primary: '#f44336',
    },
  },

  typography: {
    fontSize: 18,
    body2: {
      fontWeight: 300,
    },
    fontFamily: 'Roboto Slab',
  },
});
export default theme;
