import React from 'react';
import PropTypes from 'prop-types';

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500'
  }
});

export default class Setting extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>

        <Switch
          onValueChange={(value) => this.props.onChange(value)}
          onTintColor={Constants.BRAND_SUCCESS}
          tintColor={Constants.THEME_ALT}
          value={this.props.value} />
      </View>
    );
  };
};
