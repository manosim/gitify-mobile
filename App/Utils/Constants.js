import { Platform } from 'react-native';

export default {
  STORAGE_KEY: 'gitify-mobile',

  oAuthOptions: {
    client_id: '8a99ca115f5d52d21ec4',
    client_secret: '258527033a19eec16c91bec2bce503d286be15a1',
    scopes: ['user:email', 'notifications']
  },

  BRAND_SUCCESS: '#5EBA7D',
  BRAND_DANGER: '#B93936',

  THEME_PRIMARY: '#3F3F3F',
  THEME_PRIMARY_ACTIVE: '#000000',
  THEME_ALT: '#BFBFBF',
  THEME_ALT_ACTIVE: '#7F7F7F',

  REPO_TITLE_BG: '#EEE',
  BG_COLOR: '#F5FCFF',

  NAVBAR_BG: '#333',
  NAVBAR_HEIGHT: (Platform.OS === 'ios' ? 64 : 56),
  NAVBAR_BUTTON_ICON_SIZE: 32,
  BASE_BORDER_RADIUS: 5
};
