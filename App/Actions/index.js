// Settings

export const APP_LOADED = 'APP_LOADED';
export function appLoaded() {
  return {
    type: APP_LOADED
  };
};

export const UPDATE_SETTING = 'UPDATE_SETTING';
export function updateSetting(setting, value) {
  return {
    type: UPDATE_SETTING,
    setting: setting,
    value: value
  };
};


// Auth

export const FETCH_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';
export function fetchToken(data) {
  return {
  //   [CALL_API]: {
  //     endpoint: 'https://github.com/login/oauth/access_token',
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Cache-Control': 'no-cache'
  //     },
  //     body: JSON.stringify(data),
  //     types: [FETCH_TOKEN_REQUEST, {
  //       type: FETCH_TOKEN_SUCCESS,
  //       payload: (action, state, res) => getJSON(res)
  //     }, {
  //       type: FETCH_TOKEN_FAILURE,
  //       payload: (action, state, res) => getJSON(res)
  //     }]
  //   }
  };
};

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT
  };
}


// Notifications

export const FETCH_NOTIFICATIONS_REQUEST = 'FETCH_NOTIFICATIONS_REQUEST';
export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
export const FETCH_NOTIFICATIONS_FAILURE = 'FETCH_NOTIFICATIONS_FAILURE';

export function fetchNotificationsRequest(isReFetching) {
  return {
    type: FETCH_NOTIFICATIONS_REQUEST,
  };
};

export function fetchNotificationsSuccess(isReFetching, payload) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    meta: {
      isReFetching
    },
    payload
  };
};

export function fetchNotificationsFailure(isReFetching) {
  return {
    type: FETCH_NOTIFICATIONS_FAILURE,
    meta: {
      isReFetching
    },
  };
};

export function fetchNotifications(isReFetching = false) {
  return (dispatch, getState) => {
    dispatch(fetchNotificationsRequest());

    const token = 'token ' + getState().auth.get('token');

    return fetch('https://api.github.com/notifications', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
    })
    .then(json => {
      dispatch(fetchNotificationsSuccess(isReFetching, json));
    })
    .catch(error => {
      dispatch(fetchNotificationsFailure(isReFetching));
    });
  };

  // return {
    // [CALL_API]: {
    //   endpoint: 'https://api.github.com/notifications',
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Cache-Control': 'no-cache'
    //   },
    //   types: [
    //     {
    //       type: FETCH_NOTIFICATIONS_REQUEST,
    //       meta: { isReFetching }
    //     },
    //     {
    //       type: FETCH_NOTIFICATIONS_SUCCESS,
    //       meta: { isReFetching },
    //       payload: (action, state, res) => getJSON(res)
    //     },
    //     {
    //       type: FETCH_NOTIFICATIONS_FAILURE,
    //       meta: { isReFetching }
    //     }
    //   ]
    // }
  // };
};


// Single Notification

export const MARK_NOTIFICATION_REQUEST = 'MARK_NOTIFICATION_REQUEST';
export const MARK_NOTIFICATION_SUCCESS = 'MARK_NOTIFICATION_SUCCESS';
export const MARK_NOTIFICATION_FAILURE = 'MARK_NOTIFICATION_FAILURE';
export function markNotification(id) {
  return {
    // [CALL_API]: {
    //   endpoint: `https://api.github.com/notifications/threads/${id}`,
    //   method: 'PATCH',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Cache-Control': 'no-cache'
    //   },
    //   types: [
    //     {
    //       type: MARK_NOTIFICATION_REQUEST
    //     },
    //     {
    //       type: MARK_NOTIFICATION_SUCCESS,
    //       meta: { id }
    //     },
    //     {
    //       type: MARK_NOTIFICATION_FAILURE
    //     }
    //   ]
    // }
  };
};


// Repo's Notification

export const MARK_REPO_NOTIFICATION_REQUEST = 'MARK_REPO_NOTIFICATION_REQUEST';
export const MARK_REPO_NOTIFICATION_SUCCESS = 'MARK_REPO_NOTIFICATION_SUCCESS';
export const MARK_REPO_NOTIFICATION_FAILURE = 'MARK_REPO_NOTIFICATION_FAILURE';
export function markRepoNotifications(loginId, repoId, repoFullName) {
  return {
    // [CALL_API]: {
    //   endpoint: `https://api.github.com/repos/${loginId}/${repoId}/notifications`,
    //   method: 'PUT',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({}),
    //   types: [
    //     {
    //       type: MARK_REPO_NOTIFICATION_REQUEST
    //     },
    //     {
    //       type: MARK_REPO_NOTIFICATION_SUCCESS,
    //       meta: { repoFullName }
    //     },
    //     {
    //       type: MARK_REPO_NOTIFICATION_FAILURE
    //     }
    //   ]
    // }
  };
};


// Search

export const SEARCH_NOTIFICATIONS = 'SEARCH_NOTIFICATIONS';
export function searchNotifications(query) {
  return {
    type: SEARCH_NOTIFICATIONS,
    query: query
  };
};

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  };
};
