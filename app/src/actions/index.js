import { SET_USER } from '../constants/ActionTypes';

let userId = 0;

export const setUser = (username) => ({
  type: SET_USER,
  payload: {
    id: userId++,
    username,
  },
});
