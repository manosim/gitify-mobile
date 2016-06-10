import { combineReducers } from 'redux';
import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';

import auth from './Auth';
import notifications from './Notifications';
import search from './Search';
import settings from './Settings';

export default storage.reducer(combineReducers({
  auth,
  notifications,
  search,
  settings
}), merger);
