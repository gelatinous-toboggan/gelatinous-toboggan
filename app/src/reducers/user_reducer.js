import Immutable, { Map } from 'immutable';
import { SET_USER } from '../constants/ActionTypes';

export default function (state = Map(), action) {
  switch (action.type) {
    case SET_USER:
      return Immutable.fromJS(action.payload);
    default:
      return state;
  }
}
