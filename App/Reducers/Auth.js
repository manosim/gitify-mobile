import * as actions from '../Actions';

const initialState = {
  loaded: false,
  isFetching: false,
  token: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: {
          ...state.token,
          github: action.payload.access_token
        }
      };
    case actions.FETCH_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
        token: {
          ...state.token,
          github: null
        }
      };
    default:
      return state;
  }
};
