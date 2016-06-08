import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

var styles = StyleSheet.create({
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

export default class NavigationTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.route.title}</Text>
      </View>
    );
  }
}
