import { combineReducers } from 'redux';
import alertMessageReducer from './alertMessageReducer';
import confirmDialogReducer from './confirmDialogReducer';

export default combineReducers({
  ui: combineReducers({
    alertMessage: alertMessageReducer,
    confirmDialog: confirmDialogReducer
  })
});
