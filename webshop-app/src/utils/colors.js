import { grey as materialGrey } from '@material-ui/core/colors';

const dark = {
  50: '#e3e6e8',
  100: '#bac0c5',
  150: '#ffffff',
  200: '#8c969f',
  250: '#000000',
  300: '#5e6c78',
  400: '#3c4d5b',
  500: '#192d3e',
  600: '#162838',
  700: '#122230',
  800: '#0e1c28',
  900: '#08111b',
  A100: '#5b9aff',
  A200: '#287bff',
  A400: '#005ef4',
  A700: '#0054da'
};
dark.main = dark['250'];

const skyBlue = {
  50: '#ecfbff',
  100: '#d0f4fe',
  200: '#b0edfd',
  300: '#90e5fc',
  400: '#79e0fc',
  500: '#61dafb',
  600: '#59d6fa',
  700: '#4fd0fa',
  800: '#45cbf9',
  900: '#33c2f8',
  A100: '#ffffff',
  A200: '#ffffff',
  A400: '#d7f3ff',
  A700: '#beecff'
};
skyBlue.main = skyBlue['200'];

const grey = {
  ...materialGrey,
  main: materialGrey[700]
};

export {
  dark,
  skyBlue,
  grey
};
