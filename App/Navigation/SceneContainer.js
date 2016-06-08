import React from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import Constants from '../Utils/Constants';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.BG_COLOR

  }
});

export default class SceneContainer extends React.Component {
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
};
