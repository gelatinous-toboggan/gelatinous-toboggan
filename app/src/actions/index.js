import {
  SET_USER,
  START_QUILT,
  REQUEST_FRIENDS,
  // RECEIVE_FRIENDS,
  // RECEIVE_QUILTS,
  REQUEST_QUILTS,
  RESPONSE_POST_QUILT,
  REQUEST_POST_QUILT
} from '../constants/ActionTypes';

let userId = 0; // for development, should be deleted once server implemented

// dispatched at login to set the current user of the app
export const setUser = (username) => ({
  type: SET_USER,
  payload: {
    id: userId++,
    username,
  },
});

// todo: make action creators more semantic

// dispatched when quilt initially started
export const startQuilt = (data) => ({
  type: START_QUILT,
  payload: data,
});

// begin post request to send quilt to server
const requestPostQuilt = () => ({
  type: REQUEST_POST_QUILT,
});

// receive response from the server relating to post request
// todo: format response data so that status code passed
const responsePostQuilt = (data) => ({
  type: RESPONSE_POST_QUILT,
  payload: data,
});

// todo: catch post request errors with additional action creator
// todo: ensure friends, title, theme data in post request
/*
data = {
  title: STRING,
  theme: STRING,
  friends: ARRAY,
  vid: STRING (base64 encoding),
}
*/
export function postQuilt(data) {
  return (dispatch) => {
    dispatch(requestPostQuilt());

    return fetch('/api/quilt', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(response => response.json())
      .then(data => dispatch(responsePostQuilt(data)));
  }
}


// get all users from server
const requestFriends = () => ({
  type: REQUEST_FRIENDS,
});

// uncommnet when not testing
// const receiveFriends = (friends) => ({
//   type: RECEIVE_FRIENDS,
//   payload: friends,
// });

export function fetchFriends() {
  return (dispatch) => {
    dispatch(requestFriends());

    // todo: hook up appropriately with server
    // todo: catch errors

    // return fetch('/api/friends')
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveFriends(json)));

    // for testing
    return new Promise((resolve) => {
      setTimeout(() => resolve(['joe', 'katy', 'kelly', 'griffin']), 100);
    });
  };
}

const requestQuilts = () => ({
  type: REQUEST_QUILTS,
});

// uncomment when done setting up/testing
// const receiveQuilts = (quilts) => ({
//   type: RECEIVE_QUILTS,
//   payload: quilts,
// });

export function fetchQuilts() {
  return (dispatch) => {
    dispatch(requestQuilts());

    // todo: hook up appropriately with server
    // todo: catch errors

    // return fetch('/api/friends')
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveFriends(json)));
    return new Promise((resolve) => {
      setTimeout(() => resolve(['gm758', 'tasiov', 'test1', 'test2']), 1000);
    });
  };
}
