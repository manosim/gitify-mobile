import { Platform } from 'react-native';

export default {
  STORAGE_KEY: 'gitify-mobile',

  oAuthOptions: {
    client_id: '',
    client_secret: '',
    scopes: ['user:email', 'notifications']
  },

  THEME_PRIMARY: '#3F3F3F',
  THEME_ALT: '#BFBFBF',

  BG_COLOR: '#F5FCFF',

  NAVBAR_HEIGHT: (Platform.OS === 'ios' ? 64 : 56),
  NAVBAR_BUTTON_ICON_SIZE: 32
};
