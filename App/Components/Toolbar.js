import React, { Component, PropTypes } from 'react';  // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';

import { searchNotifications } from '../Actions';
import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Constants.TOOLBAR_BG,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  countWrapper: {
    backgroundColor: Constants.BRAND_SUCCESS,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,

  },
  countIcon: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 7.5
  },
  countText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 10
  },
  textInput: {
    flex: 1,
    marginLeft: 5,
    paddingHorizontal: 15,
    color: '#FFF',
    textAlign: 'right'
  }
});

class Toolbar extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.countWrapper}>
          <Icon name="inbox" style={styles.countIcon} />
          <Text style={styles.countText}>{this.props.count}</Text>
        </View>

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.props.searchNotifications(text)}
          value={this.props.query}
          placeholder="Search Repositories"
          placeholderTextColor="#FFF"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search" />
      </View>
    );
  }
}

export default connect(null, { searchNotifications })(Toolbar);
