import Immutable, { Map } from 'immutable';
import { ADD_USER } from '../constants/ActionTypes';

export default function(state = Map(), action) {
  switch (action.type) {
    case ADD_USER:
      return Immutable.fromJS(action.payload);
    default:
      return state;
  }
}
