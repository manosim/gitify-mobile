import React from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  ActivityIndicator,
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

const Loading = props => {
  if (!props.isLoading) {
    return null;
  }

  const text = props.text && ' ' + props.text;

  return (
    <View style={[styles.container, props.style && props.style]}>
      <ActivityIndicator animating={true} color={Constants.THEME_PRIMARY} size="large" />
      {!props.hideText && (
        <Text style={styles.loadingText}>Loading{text}</Text>
      )}
    </View>
  );
}

export default Loading;
