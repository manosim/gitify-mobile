import _ from 'underscore';
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noItemsText: {
    fontSize: 25,
    fontWeight: '300'
  },
  noItemsTextSub: {
    fontSize: 18
  },
  noItemsEmoji: {
    fontSize: 44,
  }
});

export default class AllRead extends Component {

  render() {
    const message = _.sample(Constants.ALLREAD_MESSAGES);
    const emoji = _.sample(Constants.ALLREAD_EMOJIS);

    return (
      <View style={styles.container}>
        <Text style={styles.noItemsText}>{message}</Text>
        <Text style={styles.noItemsTextSub}>No new notifications.</Text>
        <Text style={styles.noItemsEmoji}>{emoji}</Text>
      </View>
    );
  };

};
