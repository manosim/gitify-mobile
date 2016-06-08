import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    borderBottomWidth: 1,
    borderBottomColor: Constants.THEME_ALT,
  },
  title: {

  }
});

export default class Notification extends Component {

  static propTypes = {
    details: PropTypes.object.isRequired
  };

  render() {
    const details = this.props.details;

    return (
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>{details.subject.title}</Text>
      </View>
    );
  };

};
