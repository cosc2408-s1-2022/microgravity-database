import { createTheme } from '@mui/material/styles';

// TODO Create a custom theme to use application wide.
// https://colorhunt.co/palettes/space  ???
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: '#81c784',
    },
    error: {
      main: '#f44336',
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
