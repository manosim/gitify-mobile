import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF'
  }
});

export default class NavigationTitle extends React.Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.route.title}</Text>
      </View>
    );
  }
}
