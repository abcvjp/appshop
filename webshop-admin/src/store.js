import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {
  ui: {
    alertMessage: {
      isShown: false,
      type: '',
      content: ''
    },
    confirmDialog: {
      isOpen: false,
      message: '',
      onConfirm: () => {},
      onCancel: () => {}
    }
  }
};

const store = createStore(rootReducer, initialState);

export default store;
