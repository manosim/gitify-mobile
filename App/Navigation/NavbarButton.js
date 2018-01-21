import React from 'react';
import PropTypes from 'prop-types';
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

export default class NavigationButton extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  _noDuplicatesPush(route) {
    let routes = this.props.navigator.getCurrentRoutes();
    if (routes[routes.length - 1].id !== route.id) {
      this.props.navigator.push(route);
    }
  }

  _goToSettings() {
    this._noDuplicatesPush(Routes.SettingsView());
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.toolbarButton}
          underlayColor={Constants.NAVBAR_BG}
          onPress={() => this._goToSettings()}
        >
          <Icon name="gear" style={styles.icon} />
        </TouchableHighlight>
      </View>
    );
  }
}
