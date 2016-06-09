import _ from 'underscore';
import { Map } from 'immutable';
import * as actions from '../Actions';

const initialState = Map({
  isFetching: false,
  isReFetching: false,
  errored: false,
  response: []
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_NOTIFICATIONS_REQUEST:
      if (action.meta.isReFetching) {
        return state
          .set('errored', false)
          .set('isReFetching', true);
      } else {
        return state
          .set('errored', false)
          .set('isFetching', true)
          .set('response', []);
      }
    case actions.FETCH_NOTIFICATIONS_SUCCESS:
      return state
        .set('errored', false)
        .set('isFetching', false)
        .set('isReFetching', false)
        .set('response', action.payload);
    case actions.FETCH_NOTIFICATIONS_FAILURE:
      return state
        .set('errored', true)
        .set('isFetching', false)
        .set('isReFetching', false);
    case actions.MARK_NOTIFICATION_SUCCESS:
      const id = action.meta.id;
      return state
        .set('response', _.without(state.get('response'), _.findWhere(state.get('response'), {id})));
    default:
      return state;
  }
};
