import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { logout } from '../Actions';
import Button from '../Components/Button';
import Routes from '../Navigation/Routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footerText: {
    textAlign: 'center'
  }
});

class SettingsView extends Component {
  logout() {
    this.props.logout();
    this.props.navigator.replace(Routes.LoginView());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.footerText}>Settings</Text>

        <Button onPress={() => this.logout()} text="Logout" />

        <View>
          <Text style={styles.footerText}>Made with ❤ in Brighton.</Text>
          <Text style={styles.footerText}>Copyright (c) 2016 Emmanouil Konstantinidis</Text>
        </View>
      </View>
    );
  }
};

export default connect(null, { logout })(SettingsView);
