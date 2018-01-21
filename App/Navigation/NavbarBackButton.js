import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Octicons';

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolbarButton: {
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: Constants.NAVBAR_BUTTON_ICON_SIZE,
    color: '#FFF'
  }
});

export default class NavigationButton extends React.Component {
  static contextTypes = {
    drawer: PropTypes.object
  }

  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.toolbarButton}
          underlayColor={Constants.NAVBAR_BG}
          onPress={() => this._goBack()}>
          <Icon name="chevron-left" style={styles.icon} />
        </TouchableHighlight>
      </View>
    );
  }
}
