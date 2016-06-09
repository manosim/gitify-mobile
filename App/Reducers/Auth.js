import immutable from 'immutable';
import * as actions from '../Actions';

const initialState = immutable.Map({
  isFetching: false,
  errored: false,
  token: null
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TOKEN_REQUEST:
      return state
        .set('errored', false)
        .set('isFetching', true);
    case actions.FETCH_TOKEN_SUCCESS:
      return state
        .set('errored', false)
        .set('isFetching', false)
        .set('token', action.payload.access_token);
    case actions.FETCH_TOKEN_FAILURE:
      return state
        .set('errored', true)
        .set('isFetching', false)
        .set('token', null);
    case actions.LOGOUT:
      return state
        .set('token', null);
    default:
      return state;
  }
};
