import { createTheme } from '@mui/material/styles';

// TODO Create a custom theme to use application wide.
// https://colorhunt.co/palettes/space  ???
const theme = createTheme({
  palette: {
    primary: {
      main: '#F7F5F8',
      light: '#FAFAFA',
      dark: '#F0F0F0',
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
    fontFamily: 'Roboto',
  },
});
export default theme;
