import React from 'react'; // eslint-disable-line no-unused-vars

import NavigationTitle from './NavbarTitle';
import NavigationButton from './NavbarButton';
import NavigationBackButton from './NavbarBackButton';

export default {

  LeftButton(route, navigator, index, navState) {
    return (
      <NavigationBackButton navigator={navigator} index={index} direction="left" />
    );
  },

  RightButton(route, navigator, index, navState) {
    return (
      <NavigationButton route={route} index={index} navigator={navigator} direction="right" />
    );
  },

  Title(route, navigator, index, navState) {
    return (
      <NavigationTitle route={route} />
    );
  },

};
