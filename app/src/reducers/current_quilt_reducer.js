/* eslint-disable new-cap */
import { Map, List } from 'immutable';
import {
  CREATE_QUILT,
  ADD_TO_QUILT,
  SELECT_WATCH_QUILT,
  REVIEW_QUILT,
  INVITE_FRIENDS,
} from '../constants/ActionTypes';

const initialState = Map({
  id: null,
  theme: '',
  users: List(),
  file: null,
  status: null, // create, add, watch
});

export default function currentQuilt(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUILT:
      return state.merge(action.payload).set('status', 'create');
    case ADD_TO_QUILT:
      return state.merge(action.payload);
    case SELECT_WATCH_QUILT:
      return state.merge(action.payload);
    case REVIEW_QUILT:
      return state.set('file', action.payload);
    case INVITE_FRIENDS:
      return state.set('users', List(action.payload));
    default:
      return state;
  }
}
