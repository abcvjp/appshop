import {
  useRoutes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import { setCart } from 'src/actions/cartActions';
import routes from 'src/routes';

import { Container } from '@material-ui/core';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';
import AlertMessage from './components/AlertMessage';

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
  const routing = useRoutes(routes);
  const dispatch = useDispatch();
  const cartData = window.localStorage.getItem('cart');
  if (cartData) {
    dispatch(setCart({ cart: JSON.parse(cartData) }));
  }

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <Container maxWidth="lg">
        {routing}
      </Container>
      <Footer />
      <AlertMessage />
    </ThemeProvider>
  );
}

export default App;
