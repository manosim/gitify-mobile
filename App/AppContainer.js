import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';

import {
  Navigator,
  StyleSheet
} from 'react-native';

import Constants from './Utils/Constants';
import configureStore from './Store/configureStore';
import NavigationBar from './Navigation/NavigationBar';
import SceneContainer from './Navigation/SceneContainer';
import SettingUp from './Components/SettingUp';
import RouteMapper from './Navigation/RouteMapper';
import Routes from './Navigation/Routes';

// Create Store
const store = configureStore();

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: Constants.NAVBAR_BG,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default class AppContainer extends Component {
  renderScene(route, navigator) {
    return (
      <SceneContainer
        title={route.title}
        route={route}
        navigator={navigator}
        onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }
        }}
        {...this.props} />
    );
  }

  _getInitialRoute() {
    const isLoggedIn = store.getState().auth.get('token') !== null;
    if (isLoggedIn) {
      return Routes.Notifications();
    }
    return Routes.LoginView();
  }

  render() {
    const hasLoaded = store.getState().settings.get('loaded') !== false;

    if (!hasLoaded) {
      return <SettingUp />;
    }

    const initialRoute = this._getInitialRoute();

    return (
      <Provider store={store}>
        <Navigator
          initialRoute={initialRoute}
          renderScene={this.renderScene}
          navigationBar={<NavigationBar style={styles.navbar} routeMapper={RouteMapper} />} />
      </Provider>
    );
  }
};
