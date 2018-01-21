import React from 'react'; // eslint-disable-line no-unused-vars

import NavigationTitle from './NavbarTitle';
import NavigationButton from './NavbarButton';
import NavigationBackButton from './NavbarBackButton';

export default {

  LeftButton(route, navigator, index) {
    if (index === 0) {
      return null;
    }

    return (
      <NavigationBackButton navigator={navigator} index={index} direction="left" />
    );
  },

  RightButton(route, navigator, index) {
    if (route.id === 'settings-view') {
      return null;
    }

    return (
      <NavigationButton
        route={route}
        index={index}
        navigator={navigator}
        direction="right"
      />
    );
  },

  Title(route) {
    return (
      <NavigationTitle route={route} />
    );
  },

};
