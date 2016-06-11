import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { logout, updateSetting } from '../Actions';
import Button from '../Components/Button';
import Routes from '../Navigation/Routes';
import Setting from '../Components/Setting';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  settingsWrapper: {
    flex: 1
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
        <View style={styles.settingsWrapper}>
          <Setting
            title="Participating"
            value={this.props.settings.get('participating')}
            onChange={(value) => this.props.updateSetting('participating', value)} />

          <Button style={{marginVertical: 20}} onPress={() => this.logout()} text="Logout" />
        </View>

        <Text style={styles.footerText}>Made with ❤ in Brighton.</Text>
        <Text style={styles.footerText}>Copyright (c) 2016 Emmanouil Konstantinidis</Text>
      </View>
    );
  }
};


function mapStateToProps(state) {
  return {
    settings: state.settings
  };
};

export default connect(mapStateToProps, { logout, updateSetting })(SettingsView);
