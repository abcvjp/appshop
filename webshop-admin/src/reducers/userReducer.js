import { SET_USER } from 'src/constants/actionTypes';

const initialState = {

};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload.user;
    default:
      return state;
  }
}
