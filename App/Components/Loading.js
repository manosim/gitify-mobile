import React, { Component } from 'react';  // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Constants.BG_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 20,
    margin: 15
  }
});

export default class Loading extends Component {
  render() {
    if (!this.props.isLoading) {
      return null;
    }

    const text = this.props.text ? ' ' + this.props.text : null;
    const loading = Platform.OS === 'ios' ? (
      <ActivityIndicatorIOS animating={true} color={Constants.THEME_PRIMARY} size="large" />
    ) : (
      <ProgressBarAndroid styleAttr="Inverse" color={Constants.THEME_PRIMARY} />
    );

    return (
      <View style={[styles.container, this.props.style && this.props.style]}>
        {loading}
        {this.props.hideText ? <View /> : (
          <Text style={styles.loadingText}>Loading{text}</Text>
        )}
      </View>
    );
  }
}
