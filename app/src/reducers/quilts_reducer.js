import Immutable, { List, Map } from 'immutable';
import { ADD_QUILT } from '../constants/ActionTypes';

export default function quilts(state = List(), action) {
  switch (action.type) {
    case ADD_QUILT:
      return state.push(Immutable.fromJS(action.payload));
    default:
      return state;
  }
}
