import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  button: {
    borderRadius: Constants.BASE_BORDER_RADIUS,
    borderWidth: 1.5,
    borderColor: Constants.THEME_PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 5
  },
  buttonText: {
    color: Constants.THEME_PRIMARY,
    fontSize: Constants.BUTTON_FONT_SIZE,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default class Button extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };

  onPress() {
    if (this.props.disabled) {
      return;
    }
    this.props.onPress();
  }

  render() {

    return (
      <TouchableHighlight
        style={styles.button}
        disabled={this.props.disabled}
        underlayColor={Constants.THEME_PRIMARY_ACTIVE}
        onPress={this.onPress.bind(this)}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  };

};
