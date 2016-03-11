import { Map } from 'immutable';
import { ADD_USER } from '../constants/ActionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    default:
      return state;
  }
}
