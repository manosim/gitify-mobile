import React from 'react'; // eslint-disable-line no-unused-vars
import { Navigator } from 'react-native-deprecated-custom-components';

export default class NavigationBar extends Navigator.NavigationBar {
  render() {
    var routes = this.props.navState.routeStack;

    if (routes.length) {
      var route = routes[routes.length - 1];

      if (route.displayNavBar === false) {
        return null;
      }
    }

    return super.render();
  }
}
