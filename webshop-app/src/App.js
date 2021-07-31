import HeaderBar from './components/HeaderBar'
import Footer from './components/Footer'
import AlertMessage from './components/AlertMessage'
import { Container } from '@material-ui/core'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { setCart } from './actions/cartActions'

import { useDispatch } from 'react-redux'
import CheckoutPage from './pages/CheckoutPage'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#E33E7F'
    },
    primary: {
      main: blue[700]
    }
  }
})

function App() {
  const dispatch = useDispatch()
  const cartData = window.localStorage.getItem('cart')
  if (cartData) {
    dispatch(setCart({ cart: JSON.parse(cartData) }))
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
