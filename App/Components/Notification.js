import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';

import { markNotification } from '../Actions';
import Constants from '../Utils/Constants';
import Routes from '../Navigation/Routes';

import {
  Linking,
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
    paddingVertical: 5,
    backgroundColor: '#FFF',
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
  iconWrapper: {
    paddingVertical: 5,

  },
  checkIcon: {
    fontSize: 20,
    marginRight: 15,
    color: Constants.THEME_ALT
  }
});

class Notification extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    inBrowser: PropTypes.bool.isRequired,
    details: PropTypes.object.isRequired,
    markNotification: PropTypes.func.isRequired,
  };

  _getTypeIcon() {
    switch (this.props.details.getIn(['subject', 'type'])) {
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
    this.props.markNotification(this.props.details.get('id'));
  }

  openNotification() {
    let url = this.props.details.getIn(['subject', 'url'])
      .replace('api.github.com/repos', 'www.github.com');
    if (url.indexOf('/pulls/') !== -1) {
      url = url.replace('/pulls/', '/pull/');
    }

    if (this.props.inBrowser) {
      Linking.openURL(url);
    } else {
      const route = Routes.GithubView({ url });
      this.props.navigator.push(route);
    }
  }

  render() {
    const details = this.props.details;

    return (
      <View style={styles.container}>
        <Icon name={this._getTypeIcon()} style={styles.typeIcon} />

        <TouchableHighlight
          style={{flex: 1}}
          onPress={() => this.openNotification()}
          underlayColor="#FFF"
        >
          <Text style={styles.title} numberOfLines={1}>{details.getIn(['subject', 'title'])}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.iconWrapper}
          onPress={() => this.markAsRead()}
          underlayColor="#FFF"
        >
          <Icon name="check" style={styles.checkIcon} />
        </TouchableHighlight>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    inBrowser: state.settings.get('inBrowser')
  };
}

export default connect(mapStateToProps, { markNotification })(Notification);
