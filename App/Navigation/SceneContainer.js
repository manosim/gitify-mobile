import React from 'react';

import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class SceneContainer extends React.Component {
  render() {
    const Component = this.props.route.component;
    const platformStyle = {
      marginTop: (Platform.OS === 'ios' ? 64 : 56)
    };

    return (
      <View style={[styles.container, platformStyle]}>
        <Component
          navigator={this.props.navigator}
          currentRoute={this.props.route}
          {...this.props.route.passProps}
        />
      </View>
    );
  }
};
