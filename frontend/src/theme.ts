import { createTheme } from '@mui/material/styles';

// TODO Create a custom theme to use application wide.
// https://colorhunt.co/palettes/space  ???
const theme = createTheme({
  palette: {
    primary: {
      main: '#03045E',
    },
    secondary: {
      main: '#00B4D8',
    },
    error: {
      main: '#FF0000',
    },
    warning: {
      main: '#FFA500',
    },
    success: {
      main: '#008000',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#C0C0C0',
    },
  },
});
export default theme;
