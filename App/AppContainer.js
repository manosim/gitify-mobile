import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';

import {
  Navigator,
  StyleSheet
} from 'react-native';

import configureStore from './Store/configureStore';
import Constants from './Utils/Constants';
import NavigationBar from './Navigation/NavigationBar';
import SceneContainer from './Navigation/SceneContainer';
import RouteMapper from './Navigation/RouteMapper';
import Routes from './Navigation/Routes';

// Store
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

  render() {
    const initialRoute = Routes.Loading();

    return (
      <Provider store={store}>
        <Navigator
          initialRoute={initialRoute}
          renderScene={this.renderScene}
          navigationBar={<NavigationBar style={styles.navbar} routeMapper={RouteMapper} />} />
      </Provider>
    );
  }
}
