import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import {
  AppRegistry,
  StyleSheet
} from 'react-native';

import configureStore from './Store/configureStore';
import Constants from './Utils/Constants';
import Routes from './Navigation/Routes';

// Store
const store = configureStore();

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: Constants.THEME_ALT,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

class Gitify extends Component {
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
    const dashboardRoute = Routes.Dashboard();

    return (
      <Provider store={store}>
        <Navigator
          initialRoute={dashboardRoute}
          renderScene={this.renderScene}
          navigationBar={<Navigator.NavigationBar style={styles.navbar} routeMapper={RouteMapper} />} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Gitify', () => Gitify);
