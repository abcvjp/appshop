import { Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Footer from 'src/components/Footer';
import { useDispatch } from 'react-redux';
import HeaderBar from 'src/components/HeaderBar';
import AlertMessage from 'src/components/AlertMessage';

import HomePage from 'src/pages/HomePage';
import CategoryPage from 'src/pages/CategoryPage';
import CartPage from 'src/pages/CartPage';

import { setCart } from 'src/actions/cartActions';

import CheckoutPage from 'src/pages/CheckoutPage';
import ProductPage from 'src/pages/ProductPage';
import SearchPage from 'src/pages/SearchPage';

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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/">
            <HeaderBar />
            <Container maxWidth="lg">
              <Switch>
                <Route path="/" exact>
                  <HomePage />
                </Route>
                <Route path="/cart" exact>
                  <CartPage />
                </Route>
                <Route path="/search">
                  <SearchPage />
                </Route>
                <Route path="/product/:productSlug">
                  <ProductPage />
                </Route>
                <Route path="/:categorySlug">
                  <CategoryPage />
                </Route>
              </Switch>
            </Container>
            <Footer />
            <AlertMessage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
