import Immutable, { List, Map } from 'immutable';
import { ADD_FRIENDS } from '../constants/ActionTypes';

export default function friends(state = List(), action) {
  switch (action.type) {
    case ADD_FRIENDS:
      return state.push(Immutable.fromJS(action.payload));
    default:
      return state;
  }
}
