import { SET_USER, START_QUILT, REQUEST_FRIENDS, RECEIVE_FRIENDS } from '../constants/ActionTypes';

let userId = 0; // for development, should be deleted once server implemented

// dispatched at login to set the current user of the app
export const setUser = (username) => ({
  type: SET_USER,
  payload: {
    id: userId++,
    username,
  },
});

// dispatched when quilt initially started
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

    // return fetch('/api/friends')
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveFriends(json)));
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(['joe', 'katy', 'kelly', 'griffin']), 100);
    })
  };
}

const requestQuilts = () => ({
  type: REQUEST_QUILTS,
})

const receiveQuilts = (quilts) => ({
  type: RECEIVE_QUILTS,
  payload: quilts,
});

export function fetchQuilts() {
  return (dispatch) => {
    dispatch(requestQuilts());

    // todo: hook up appropriately with server
    // todo: catch errors

    // return fetch('/api/friends')
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveFriends(json)));
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(['gm758', 'tasiov', 'test1', 'test2']), 1000);
    });
  }
}
