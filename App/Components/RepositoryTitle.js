import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';

import { markRepoNotifications } from '../Actions';
import Constants from '../Utils/Constants';

import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Constants.REPO_TITLE_BG,
    alignItems: 'center'
  },
  avatar: {
    width: 25,
    height: 25,
    marginLeft: 5,
    borderRadius: 12.5
  },
  title: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkIcon: {
    fontSize: 20,
    marginRight: 10,
    color: Constants.THEME_ALT
  }
});

class RepositoryTitle extends React.Component {

  static propTypes = {
    details: PropTypes.object.isRequired,
    markRepoNotifications: PropTypes.func.isRequired
  };

  markAsRead() {
    const loginId = this.props.details.data.getIn(['owner', 'login']);
    const repoId = this.props.details.data.get('name');
    const fullName = this.props.details.data.get('full_name');
    return this.props.markRepoNotifications(loginId, repoId, fullName);
  }

  render() {
    const firstRepoDetails = this.props.details.data[0].get('repository');
    const avatar_url = firstRepoDetails.getIn(['owner', 'avatar_url']);

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{uri: avatar_url}} />
        <Text style={styles.title} numberOfLines={1}>{firstRepoDetails.get('full_name')}</Text>

        <TouchableHighlight
          onPress={() => this.markAsRead()}
          underlayColor={Constants.REPO_TITLE_BG}
        >
          <Icon name="check" style={styles.checkIcon} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect(null, { markRepoNotifications })(RepositoryTitle);
