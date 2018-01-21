import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';

import { fetchNotifications } from '../Actions';
import AllRead from '../Components/AllRead';
import ErrorPage from '../Components/ErrorPage';
import Loading from '../Components/Loading';
import RepositoryTitle from '../Components/RepositoryTitle';
import Notification from '../Components/Notification';
import Toolbar from '../Components/Toolbar';

import {
  ListView,
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

  constructor(props) {
    super(props);

    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };

    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    };

    this.state = {
      dataSource: new ListView.DataSource({
        getSectionData: getSectionData,
        getRowData: getRowData,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications !== this.props.notifications) {
      this.transformData(nextProps.notifications);
    }

    if (nextProps.query !== this.props.query) {
      const notifications = nextProps.query ?
        _.filter(this.props.notifications, this.matchesSearchTerm.bind(this)) : this.props.notifications;

      this.transformData(notifications);
    }
  }

  componentWillMount() {
    this.props.fetchNotifications(false);
  }

  areIn(repoFullName, searchTerm) {
    return repoFullName.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
  }

  matchesSearchTerm(obj) {
    const searchTerm = this.props.query.replace(/^\s+/, '').replace(/\s+$/, '');
    const searchTerms = searchTerm.split(/\s+/);
    return _.all(searchTerms, this.areIn.bind(null, obj.repository.full_name));
  }

  transformData(notificationsPayload) {
    const repositories = _.chain(notificationsPayload)
      .groupBy((object) => object.repository.full_name)
      .map((notifications, repository) => ({
        id: notifications[0].repository.id,
        repository: notifications[0].repository,
        notifications }))
          .value();

    // Thanks to: http://moduscreate.com/react-native-listview-with-section-headers/
    var repositoriesLength = repositories.length;
    var repository;
    var notification;
    var notifications;
    var notificationsLength;
    var dataBlob = {};
    var sectionIDs = [];
    var rowIDs = [];

    for (var i = 0; i < repositoriesLength; i++) {
      repository = repositories[i];

      // Add Section to Section ID Array
      sectionIDs.push(repository.id);
      // Set Value for Section ID that will be retrieved by getSectionData
      dataBlob[repository.id] = repository.repository;

      notifications = repository.notifications;
      notificationsLength = notifications.length;

      // Initialize Empty RowID Array for Section Index
      rowIDs[i] = [];

      for (var j = 0; j < notificationsLength; j++) {
        notification = notifications[j];
        // Add Unique Row ID to RowID Array for Section
        rowIDs[i].push(notification.id);

        // Set Value for unique Section+Row Identifier that will be retrieved by getRowData
        dataBlob[repository.id + ':' + notification.id] = notification;
      }
    }

    this.setState({
      dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    });
  }

  _renderSectionHeader(sectionData, sectionID) {
    return <RepositoryTitle details={sectionData} />;
  }

  _renderRow(rowData) {
    return <Notification key={rowData.id} details={rowData} navigator={this.props.navigator} />;
  }

  render() {
    if (this.props.errored) {
      return <ErrorPage
        subheading="Couldn't get your notifications."
        onReload={() => this.props.fetchNotifications()} />;
    }

    if (!this.state.dataSource.getRowCount() && this.props.query) {
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

    if (!this.props.notifications.length && !this.props.query
      && !this.props.isFetching && !this.props.isReFetching) {
      return <AllRead onReload={() => this.props.fetchNotifications()} />;
    }

    return (
      <View style={styles.container}>
        <Toolbar count={this.props.notifications.length} query={this.props.query} />
        <ListView
          style={styles.listContainer}
          dataSource={this.state.dataSource}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isReFetching}
              onRefresh={() => this.props.fetchNotifications(true)} />
          } />
        <Loading isLoading={this.props.isFetching} text="Notifications" />
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    isFetching: state.notifications.get('isFetching'),
    isReFetching: state.notifications.get('isReFetching'),
    notifications: state.notifications.get('response', []),
    errored: state.notifications.get('errored'),
    query: state.search.get('query')
  };
};

export default connect(mapStateToProps, { fetchNotifications })(NotificationsView);
