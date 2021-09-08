import {
  BrowserRouter
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'src/theme';

import { setCart } from 'src/actions/cartActions';

import { Container } from '@material-ui/core';
import HeaderBar from 'src/components/HeaderBar';
import Footer from 'src/components/Footer';
import Routing from 'src/components/Routing';
import GlobalComponents from 'src/components/global';
import GlobalStyles from 'src/components/GlobalStyles';

function App() {
  const dispatch = useDispatch();
  const cartData = window.localStorage.getItem('cart');
  if (cartData) {
    dispatch(setCart({ cart: JSON.parse(cartData) }));
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <HeaderBar />
        <Container maxWidth="lg" style={{ minHeight: '80%' }}>
          <Routing />
        </Container>
      </BrowserRouter>
      <Footer />
      <GlobalComponents />
    </ThemeProvider>
  );
}

export default App;
