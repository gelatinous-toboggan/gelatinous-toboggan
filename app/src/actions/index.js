import { SET_USER, START_QUILT, REQUEST_FRIENDS, RECEIVE_FRIENDS } from '../constants/ActionTypes';

let userId = 0; // for development, should be deleted once server implemented

export const setUser = (username) => ({
  type: SET_USER,
  payload: {
    id: userId++,
    username,
  },
});

export const startQuilt = (data) => ({
  type: START_QUILT,
  payload: data,
});

// get all users from server
const requestFriends = () => ({
  type: REQUEST_FRIENDS,
});

const receiveFriends = (friends) => ({
  type: RECEIVE_FRIENDS,
  payload: friends,
});

export function fetchFriends() {
  return (dispatch) => {
    dispatch(requestFriends());

    // todo: hook up appropriately with server
    // todo: catch errors
    return fetch('/api/friends')
      .then(response => response.json())
      .then(json => dispatch(receiveFriends(json)));
  };
}
