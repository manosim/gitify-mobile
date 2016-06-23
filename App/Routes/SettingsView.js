import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { logout, updateSetting } from '../Actions';
import Constants from '../Utils/Constants';
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
  footerButton: {
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
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
    const availableOn = (Platform.OS === 'ios') ? 'OSX, iOS' : 'OSX, iOS and Android';

    return (
      <View style={styles.container}>
        <View style={styles.settingsWrapper}>
          <Setting
            title="Participating"
            value={this.props.settings.get('participating')}
            onChange={(value) => this.props.updateSetting('participating', value)} />

          <Setting
            title="Play Sound"
            value={this.props.settings.get('playSound')}
            onChange={(value) => this.props.updateSetting('playSound', value)} />

          <Setting
            title="Open in Browser"
            value={this.props.settings.get('inBrowser')}
            onChange={(value) => this.props.updateSetting('inBrowser', value)} />

          <Button style={{marginVertical: 20}} onPress={() => this.logout()} text="Logout" />
        </View>

        <TouchableHighlight
          onPress={() => Linking.openURL(Constants.WEBSITE_URL)}
          underlayColor={Constants.BG_COLOR}
          style={styles.footerButton}>
          <Text style={styles.footerText}>www.gitify.io</Text>
        </TouchableHighlight>

        <Text style={styles.footerText}>Available on {availableOn}.</Text>
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
