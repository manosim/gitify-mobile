import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Routes from './Routes';

import {
  View,
} from 'react-native';

export default class NavigationButton extends Component {
  _goTo() {
    const route = Routes.example({});
    this.props.navigator.push(route);
  }

  render() {
    // FIXME
    return <View />;
  }
}
