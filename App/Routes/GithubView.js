import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Icon from 'react-native-vector-icons/FontAwesome';

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  View,
  WebView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Constants.TOOLBAR_BG,
  },
  toolbarIcon: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 24,
    color: '#FFF'
  },
  toolbarLeft: {
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',

  },
  toolbarRight: {
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

export default class GithubView extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: this.props.url}}
          automaticallyAdjustContentInsets={true}
          startInLoadingState={true} />

        <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}>
            <Icon name="chevron-left" style={styles.toolbarIcon} />
            <Icon name="chevron-right" style={styles.toolbarIcon} />
          </View>

          <View style={styles.toolbarRight}>
            <Icon name="refresh" style={styles.toolbarIcon} />
          </View>
        </View>
      </View>
    );
  }
};
