import {
  FETCH_NOTIFICATIONS_REQUEST,
  MARK_NOTIFICATION_REQUEST,
  MARK_REPO_NOTIFICATION_REQUEST
} from '../Actions';

export default store => next => action => {
  switch (action.type) {

  //   case FETCH_NOTIFICATIONS_REQUEST:
  //     const settings = store.getState().settings;
  //     const endpoint = action[CALL_API].endpoint + '?participating=';
  //     action[CALL_API].endpoint = endpoint + (settings.get('participating') ? 'true' : 'false');

    // case FETCH_NOTIFICATIONS_REQUEST:
    // case MARK_NOTIFICATION_REQUEST:
    // case MARK_REPO_NOTIFICATION_REQUEST:
    //   const token = 'token ' + store.getState().auth.get('token');
    //   // action[CALL_API].headers['Authorization'] = token;

    //   console.log('-----');
    //   console.log(action);
    //   console.log('-----');
  }

  return next(action);
};
