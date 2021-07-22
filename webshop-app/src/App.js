import HeaderBar from './components/HeaderBar'
import Footer from './components/Footer'
import AlertMessage from './components/AlertMessage'
import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Container } from '@material-ui/core'

import CategoryPage from './pages/CategoryPage'

function App() {

  return (

    <Router>
      <HeaderBar />
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/:categorySlug">
            <CategoryPage />
          </Route>
        </Switch>
      </Container>
      <Footer />
      <AlertMessage />

    </Router>
  );
}

export default App;
