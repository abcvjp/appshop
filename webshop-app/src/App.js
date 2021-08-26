import {
  BrowserRouter
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import { setCart } from 'src/actions/cartActions';

import { Container } from '@material-ui/core';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';
import Routing from './components/Routing';
import GlobalComponents from './components/global';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#E33E7F',
    },
    primary: {
      main: blue[700],
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const cartData = window.localStorage.getItem('cart');
  if (cartData) {
    dispatch(setCart({ cart: JSON.parse(cartData) }));
  }
  console.log('app rerender');
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <HeaderBar />
        <Container maxWidth="lg">
          <Routing />
        </Container>
        <Footer />
        <GlobalComponents />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
