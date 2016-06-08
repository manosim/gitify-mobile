import { combineReducers } from 'redux';

import auth from './Auth';
import notifications from './Notifications';

export default combineReducers({
  auth,
  notifications
});
