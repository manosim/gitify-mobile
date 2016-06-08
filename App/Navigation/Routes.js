import Dashboard from '../Routes/Dashboard';
import OAuthView from '../Routes/OAuth';

export default {

  Dashboard() {
    return {
      id: 'dashboard-view',
      title: 'Dashboard',
      component: Dashboard,
      displayNavBar: false
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
