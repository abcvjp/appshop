import { createTheme } from '@material-ui/core/styles';
import { lightBlue, red } from '@material-ui/core/colors';
import { dark, grey } from 'src/utils/colors';

const theme = createTheme({
  palette: {
    secondary: {
      main: lightBlue[500]
    },
    primary: dark,
    error: red,
    status: {
      danger: 'orange',
      warning: 'orange'
    },
    white: 'white',
    grey
  },
  typography: {
    fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    h6: {
      fontWeight: 400
    }
  }
});

export default theme;
