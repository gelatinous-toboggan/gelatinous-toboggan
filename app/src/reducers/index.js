import { combineReducers } from 'redux-immutable';
import user from './user_reducer';
import friends from './friends_reducer';
import quilts from './quilts_reducer';

const rootReducer = combineReducers({
  user,
});

export default rootReducer
