import React, { Component } from 'react';  // eslint-disable-line no-unused-vars

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default class SettingUp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Setting Up Gitify</Text>
      </View>
    );
  }
}
