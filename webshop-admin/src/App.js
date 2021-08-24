import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import store from './store';
import routes from './routes';
import GlobalComponents from './components/global';
import { setUser } from './actions/user';

const App = () => {
  const routing = useRoutes(routes);
  const savedUser = sessionStorage.getItem('user');
  if (savedUser) {
    store.dispatch(setUser(JSON.parse(savedUser)));
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        {routing}
        <GlobalComponents />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
