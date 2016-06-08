import Dashboard from '../Routes/Dashboard';
import LoadingView from '../Routes/LoadingView';
import NotificationsView from '../Routes/Notifications';
import OAuthView from '../Routes/OAuth';

export default {

  Loading() {
    return {
      id: 'loading-view',
      title: 'Loading',
      component: LoadingView,
      displayNavBar: false
    };
  },

  Dashboard() {
    return {
      id: 'dashboard-view',
      title: 'Dashboard',
      component: Dashboard,
      displayNavBar: false
    };
  },

  Notifications(props) {
    return {
      id: 'notifications-view',
      title: 'Notifications',
      component: NotificationsView,
      passProps: props,
      displayNavBar: true
    };
  },

  OAuth(props) {
    return {
      id: 'oauth-view',
      title: 'Authentication',
      component: OAuthView,
      passProps: props,
      displayNavBar: true
    };
  },

};
