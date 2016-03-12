import { ADD_USER } from '../constants/ActionTypes';

let userId = 0;
export const addUser = (username) => ({
  type: ADD_USER,
  payload: {
    id: userId++,
    username,
  },
});
