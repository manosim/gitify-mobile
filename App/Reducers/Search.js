import { Map } from 'immutable';

import {
  SEARCH_NOTIFICATIONS, CLEAR_SEARCH, FETCH_NOTIFICATIONS_REQUEST
} from '../Actions';

const initialState = Map({
  query: ''
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_NOTIFICATIONS:
      return state
        .set('query', action.query);
    case CLEAR_SEARCH:
    case FETCH_NOTIFICATIONS_REQUEST:
      return state
        .set('query', '');
    default:
      return state;
  }
}
