import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import filter from 'redux-storage-decorator-filter';

import { FETCH_TOKEN_SUCCESS, LOGOUT, appLoaded } from '../Actions';
import Constants from '../Utils/Constants';
import requestsMiddleware from '../Middleware/Requests';
import rootReducer from '../Reducers';

const engine = filter(createEngine(Constants.STORAGE_KEY), ['auth']);
const storeMiddleware = storage.createMiddleware(engine, [], [FETCH_TOKEN_SUCCESS, LOGOUT]);
const middlewares = [
  requestsMiddleware, // Should be passed before 'apiMiddleware'
  apiMiddleware,
  storeMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export default function configureStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  const load = storage.createLoader(engine);
  load(store)
    .then((newState) => {
      console.log('Loaded state:', newState);
      store.dispatch(appLoaded());
    })
    .catch(() => console.log('Failed to load previous state'));

  return store;
};
