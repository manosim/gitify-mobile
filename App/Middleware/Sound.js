import { FETCH_NOTIFICATIONS_SUCCESS } from '../Actions';
import SoundHelper from '../Utils/Sound';

export default store => next => action => {

  switch (action.type) {

    case FETCH_NOTIFICATIONS_SUCCESS:
      const playSound = store.getState().settings.get('playSound');
      const previousNotifications = store.getState().notifications.get('response').map(obj => obj.get('id'));
      const newNotifications = action.payload.filter((obj) => previousNotifications.includes(obj.get('id')));

      if (newNotifications.length && playSound) {
        SoundHelper.play();
      }
      break;

  }

  return next(action);
};
