import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Icon from 'react-native-vector-icons/Octicons';

import Constants from '../Utils/Constants';
import Routes from './Routes';

import {
  StyleSheet,
  TouchableHighlight,
  View
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
    fontSize: Constants.NAVBAR_BUTTON_ICON_SIZE - 7.5,
    color: '#FFF'
  }
});

export default class NavigationButton extends Component {
  _goToSettings() {
    const route = Routes.SettingsView();
    this.props.navigator.push(route);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.toolbarButton}
          underlayColor={Constants.THEME_COLOR}
          onPress={() => this._goToSettings()}>
          <Icon name="gear" style={styles.icon} />
        </TouchableHighlight>
      </View>
    );
  }
}
