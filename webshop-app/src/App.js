import HeaderBar from './components/HeaderBar'
import Footer from './components/Footer'
import AlertMessage from './components/AlertMessage'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <HeaderBar />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
        <AlertMessage />
      </Router>
    </Provider>
  );
}

export default App;
