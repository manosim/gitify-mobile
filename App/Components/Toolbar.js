import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';

import { searchNotifications } from '../Actions';
import Constants from '../Utils/Constants';

import {
  Platform,
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
  },
  countWrapper: {
    backgroundColor: Constants.BRAND_SUCCESS,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  countIcon: {
    marginRight: 7.5,
    color: '#FFF',
    fontSize: 18,
  },
  countText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
  textInput: {
    flex: 1,
    marginLeft: 5,
    paddingHorizontal: 15,
    color: '#FFF',
    textAlign: 'right',

    ...Platform.select({
      android: {
        height: 40
      },
    })
  }
});

class Toolbar extends React.Component {

  static propTypes = {
    searchNotifications: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    query: PropTypes.string,
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
          returnKeyType="search"
        />
      </View>
    );
  }
}

export default connect(null, { searchNotifications })(Toolbar);
