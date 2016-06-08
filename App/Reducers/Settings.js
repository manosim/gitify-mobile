import { Map } from 'immutable';
import * as actions from '../Actions';

const initialState = Map({
  loaded: false
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.APP_LOADED:
      return state
        .set('loaded', true);
    default:
      return state;
  }
};
