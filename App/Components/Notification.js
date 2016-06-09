import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';

import { markNotification } from '../Actions';
import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 7.5,
    borderBottomWidth: 1,
    borderBottomColor: Constants.THEME_ALT,
  },
  typeIcon: {
    fontSize: 20,
    marginLeft: 15
  },
  title: {
    flex: 1,
    marginHorizontal: 10
  },
  checkIcon: {
    fontSize: 20,
    marginRight: 15,
    color: Constants.THEME_ALT
  }
});

class Notification extends Component {
  static propTypes = {
    details: PropTypes.object.isRequired
  };

  _getTypeIcon() {
    switch (this.props.details.subject.type) {
      case 'Issue':
        return 'issue-opened';
      case 'PullRequest':
        return 'git-pull-request';
      case 'Commit':
        return 'git-commit';
      case 'Release':
        return 'tag';
      default:
        return 'question';
    }
  }

  markAsRead() {
    this.props.markNotification(this.props.details.id);
  }

  render() {
    const details = this.props.details;

    return (
      <View style={styles.container}>
        <Icon name={this._getTypeIcon()} style={styles.typeIcon} />
        <Text style={styles.title} numberOfLines={1}>{details.subject.title}</Text>
        <TouchableHighlight
          onPress={() => this.markAsRead()}>
          <Icon name="check" style={styles.checkIcon} />
        </TouchableHighlight>
      </View>
    );
  };
};


export default connect(null, { markNotification })(Notification);
