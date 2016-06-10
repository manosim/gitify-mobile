import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';

import {
  AppRegistry
} from 'react-native';

import AppContainer from './App/AppContainer';
import configureStore from './App/Store/configureStore';

// Create Store
const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
};

AppRegistry.registerComponent('Gitify', () => App);
