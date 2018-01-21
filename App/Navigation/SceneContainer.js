import React from 'react';
import PropTypes from 'prop-types';

import {
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import Constants from '../Utils/Constants';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.BG_COLOR
  }
});

export default class SceneContainer extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    // authUrl: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.paintStatusBar();
  }

  componentWillReceiveProps() {
    this.paintStatusBar();
  }

  paintStatusBar() {
    if (Platform.OS !== 'ios') { return; }

    if (this.props.route.displayNavBar) {
      StatusBar.setBarStyle('light-content', true);
    } else {
      StatusBar.setBarStyle('default', false);
    }
  }

  render() {
    const Component = this.props.route.component;
    const navbarStyle = {marginTop: (this.props.route.displayNavBar ? Constants.NAVBAR_HEIGHT : 0 )};

    return (
      <View style={[styles.container, navbarStyle]}>
        <Component
          navigator={this.props.navigator}
          currentRoute={this.props.route}
          {...this.props.route.passProps}
        />
      </View>
    );
  }
}
