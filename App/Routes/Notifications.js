import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { fetchNotifications } from '../Actions';
import AllRead from '../Components/AllRead';
import ErrorPage from '../Components/ErrorPage';
import Loading from '../Components/Loading';
import RepositoryTitle from '../Components/RepositoryTitle';
import Notification from '../Components/Notification';
import Toolbar from '../Components/Toolbar';

import {
  SectionList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noResultsWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noResultsTitle: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 5
  },
  noResultsDesc: {
    fontSize: 18,
    textAlign: 'center'
  }
});

class NotificationsView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isReFetching: PropTypes.bool.isRequired,
    errored: PropTypes.bool.isRequired,
    query: PropTypes.string.isRequired,
    fetchNotifications: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchNotifications(false);
  }

  searchNotifications() {
    const searchTerm = this.props.query.replace(/^\s+/, '').replace(/\s+$/, '');
    return this.props.notifications
      .filter((item) => {
        const repoFullName = item.getIn(['repository', 'full_name']).toLowerCase();
        return repoFullName.toLowerCase().includes(searchTerm);
      });
  }

  _renderSectionHeader(sectionData) {
    return (
      <RepositoryTitle
        details={sectionData}
      />
    );
  }

  _renderRow(rowData) {
    return (
      <Notification
        details={rowData}
        navigator={this.props.navigator}
      />
    );
  }

  render() {
    const filteredNotifications = this.props.query ?
      this.searchNotifications() : this.props.notifications;

    const sectionData = filteredNotifications
      .groupBy(item => item.getIn(['repository', 'full_name']))
      .map((item, groupName) => ({
        title: groupName,
        data: item.toArray()
      }))
      .toArray();

    if (this.props.errored) {
      return (
        <ErrorPage
          subheading="Couldn't get your notifications."
          onReload={() => this.props.fetchNotifications()}
        />
      );
    }

    if (this.props.notifications.isEmpty() && this.props.query) {
      return (
        <View style={styles.container}>
          <Toolbar count={this.props.notifications.length} query={this.props.query} />
          <View style={styles.noResultsWrapper}>
            <Text style={styles.noResultsTitle}>No Search Results.</Text>
            <Text style={styles.noResultsDesc}>No Organisations or Repositories{'\n'}match your search term.</Text>
          </View>
        </View>
      );
    }

    if (this.props.notifications.isEmpty() && !this.props.query
      && !this.props.isFetching && !this.props.isReFetching) {
      return <AllRead onReload={() => this.props.fetchNotifications()} />;
    }

    return (
      <View style={styles.container}>
        <Toolbar count={this.props.notifications.size} query={this.props.query} />
        <SectionList
          style={styles.listContainer}
          sections={sectionData}
          keyExtractor={(item) => item.get('id')}
          renderSectionHeader={({section}) => this._renderSectionHeader(section)}
          renderItem={({item}) => this._renderRow(item)}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isReFetching}
              onRefresh={() => this.props.fetchNotifications(true)}
            />
          }
        />
        <Loading isLoading={this.props.isFetching} text="Notifications" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.notifications.get('isFetching'),
    isReFetching: state.notifications.get('isReFetching'),
    notifications: state.notifications.get('response', List()),
    errored: state.notifications.get('errored'),
    query: state.search.get('query')
  };
}

export default connect(mapStateToProps, { fetchNotifications })(NotificationsView);
