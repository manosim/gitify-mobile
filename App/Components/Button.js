import React from 'react';
import PropTypes from 'prop-types';

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

let styles = StyleSheet.create({
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

export default class Button extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    style: {}
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
        style={[styles.button, this.props.style]}
        disabled={this.props.disabled}
        underlayColor={Constants.THEME_ALT_ACTIVE}
        onPress={this.onPress.bind(this)}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }

}
