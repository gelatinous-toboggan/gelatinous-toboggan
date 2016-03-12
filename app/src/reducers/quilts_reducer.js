import Immutable, { List } from 'immutable';
import { START_QUILT } from '../constants/ActionTypes';

export default function quilts(state = List(), action) {
  switch (action.type) {
    case START_QUILT:
      return state.push(Immutable.fromJS(action.payload));
    default:
      return state;
  }
}
