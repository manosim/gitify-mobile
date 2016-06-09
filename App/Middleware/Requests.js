import { CALL_API, isRSAA } from 'redux-api-middleware';

import {
  FETCH_NOTIFICATIONS_REQUEST,
  MARK_NOTIFICATION_REQUEST,
  MARK_REPO_NOTIFICATION_REQUEST
} from '../Actions';

export default store => next => action => {
  if (!isRSAA(action)) {
    return next(action);
  }

  switch (action[CALL_API].types[0].type) {

    // case FETCH_NOTIFICATIONS_REQUEST:
    //   const settings = store.getState().settings;
    //   const endpoint = action[CALL_API].endpoint + '?participating=';
    //   action[CALL_API].endpoint = endpoint + (settings.participating ? 'true' : 'false');

    case FETCH_NOTIFICATIONS_REQUEST:
    case MARK_NOTIFICATION_REQUEST:
    case MARK_REPO_NOTIFICATION_REQUEST:
      const token = 'token ' + store.getState().auth.get('token');
      action[CALL_API].headers['Authorization'] = token;
  }

  return next(action);
};
