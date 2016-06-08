import { List, Map} from 'immutable';
import * as actions from '../Actions';

const initialState = Map({
  isFetching: false,
  errored: false,
  response: List()
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_NOTIFICATIONS_REQUEST:
      return state
        .set('errored', false)
        .set('isFetching', true)
        .set('response', List());
    case actions.FETCH_NOTIFICATIONS_SUCCESS:
      console.log('-------');
      console.log(action.payload);
      console.log('-------');
      return state
        .set('errored', false)
        .set('isFetching', false)
        .set('response', action.payload.notifications);
    case actions.FETCH_NOTIFICATIONS_FAILURE:
      return state
        .set('errored', true)
        .set('isFetching', false);
    default:
      return state;
  }
};
