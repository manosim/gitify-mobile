import _ from 'underscore';

import { FETCH_NOTIFICATIONS_SUCCESS } from '../Actions';
import SoundHelper from '../Utils/Sound';

export default store => next => action => {

  switch (action.type) {

    case FETCH_NOTIFICATIONS_SUCCESS:
      const playSound = store.getState().settings.get('playSound');
      const previousNotifications = store.getState().notifications.get('response').map(obj => obj.id);
      const newNotifications = _.filter(action.payload, (obj) => !_.contains(previousNotifications, obj.id));

      if (newNotifications.length && playSound) {
        SoundHelper.play();
      }
      break;

  }

  return next(action);
};
