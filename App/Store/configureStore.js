import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import filter from 'redux-storage-decorator-filter';

import { FETCH_TOKEN_SUCCESS, LOGOUT, UPDATE_SETTING, appLoaded } from '../Actions';
import Constants from '../Utils/Constants';
import soundMiddleware from '../Middleware/Sound';
import rootReducer from '../Reducers';

const engine = filter(createEngine(Constants.STORAGE_KEY), ['auth', 'settings'], [['settings', 'loaded']]);
const storeMiddleware = storage.createMiddleware(engine, [], [FETCH_TOKEN_SUCCESS, LOGOUT, UPDATE_SETTING]);
const middlewares = [
  thunkMiddleware,
  storeMiddleware,
  soundMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger'); // eslint-disable-line no-undef
  const loggerMiddleware = createLogger({ collapsed: true });
  middlewares.push(loggerMiddleware);
}

export default function configureStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  const load = storage.createLoader(engine);
  load(store)
    .then(() => {
      store.dispatch(appLoaded());
    })
    .catch(() => {});

  return store;
}
