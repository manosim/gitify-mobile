import { Map } from 'immutable';
import * as actions from '../Actions';

const initialState = Map({
  loaded: false,
  participating: false,
  playSound: false
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.APP_LOADED:
      return state
        .set('loaded', true);
    case actions.UPDATE_SETTING:
      return state
        .set(action.setting, action.value);
    default:
      return state;
  }
};
