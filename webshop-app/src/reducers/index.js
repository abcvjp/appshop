import { combineReducers } from 'redux';
import cartReducer from './cartReducers';
import alertMessageReducer from './alertMessageReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  categories: categoryReducer,
  cart: cartReducer,
  ui: combineReducers({
    alertMessage: alertMessageReducer
  })
});
