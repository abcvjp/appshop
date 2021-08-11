import { combineReducers } from 'redux';
import alertMessageReducer from './alertMessageReducer';
import confirmDialogReducer from './confirmDialogReducer';
import fullscreenLoadingReducer from './fullscreenLoading';

export default combineReducers({
  ui: combineReducers({
    alertMessage: alertMessageReducer,
    confirmDialog: confirmDialogReducer,
    fullscreenLoading: fullscreenLoadingReducer
  })
});
