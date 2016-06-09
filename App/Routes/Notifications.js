import _ from 'underscore';
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import { fetchNotifications } from '../Actions';
import Loading from '../Components/Loading';
import RepositoryTitle from '../Components/RepositoryTitle';
import Notification from '../Components/Notification';

import {
  ListView,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class NotificationsView extends Component {

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
      const response = _.chain(nextProps.notifications)
        .groupBy((object) => object.repository.full_name)
        .map((notifications, repository) => ({
          id: notifications[0].repository.id,
          repository: notifications[0].repository,
          notifications }))
        .value();

      this.transformData(response);
    }
  }

  componentWillMount() {
    this.props.fetchNotifications(false);
  }

  transformData(repositories) {
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
      dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
    });
  }

  _renderSectionHeader(sectionData, sectionID) {
    return <RepositoryTitle details={sectionData} />;
  }

  _renderRow(rowData) {
    return <Notification key={rowData.id} details={rowData} />;
  }

  render() {
    return (
      <View style={styles.container}>
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
        <Loading isLoading={this.props.isFetching} />
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    isFetching: state.notifications.get('isFetching'),
    isReFetching: state.notifications.get('isReFetching'),
    notifications: state.notifications.get('response', [])
  };
};

export default connect(mapStateToProps, { fetchNotifications })(NotificationsView);
