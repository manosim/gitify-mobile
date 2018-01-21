/* global fetch */

import { fromJS } from 'immutable';

// Settings
export const APP_LOADED = 'APP_LOADED';
export function appLoaded() {
  return {
    type: APP_LOADED
  };
}

export const UPDATE_SETTING = 'UPDATE_SETTING';
export function updateSetting(setting, value) {
  return {
    type: UPDATE_SETTING,
    setting: setting,
    value: value
  };
}


// Auth

export const FETCH_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';

export function fetchTokenRequest() {
  return {
    type: FETCH_TOKEN_REQUEST
  };
}

export function fetchTokenSuccess(payload) {
  return {
    type: FETCH_TOKEN_SUCCESS,
    payload
  };
}

export function fetchTokenFailure() {
  return {
    type: FETCH_TOKEN_FAILURE
  };
}

export function fetchToken(data) {
  return (dispatch) => {
    dispatch(fetchTokenRequest());

    return fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        dispatch(fetchTokenSuccess(json));
      })
      .catch(() => {
        dispatch(fetchTokenFailure());
      });
  };
}

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
    meta: {
      isReFetching
    }
  };
}

export function fetchNotificationsSuccess(payload) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload
  };
}

export function fetchNotificationsFailure() {
  return {
    type: FETCH_NOTIFICATIONS_FAILURE
  };
}

export function fetchNotifications(isReFetching = false) {
  return (dispatch, getState) => {
    dispatch(fetchNotificationsRequest(isReFetching));
    const token = 'token ' + getState().auth.get('token');
    const isParticipating = getState().settings.get('participating') ? 'true' : 'false';

    return fetch(`https://api.github.com/notifications?participating=${isParticipating}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        dispatch(fetchNotificationsSuccess(fromJS(json)));
      })
      .catch(() => {
        dispatch(fetchNotificationsFailure());
      });
  };
}


// Single Notification

export const MARK_NOTIFICATION_REQUEST = 'MARK_NOTIFICATION_REQUEST';
export const MARK_NOTIFICATION_SUCCESS = 'MARK_NOTIFICATION_SUCCESS';
export const MARK_NOTIFICATION_FAILURE = 'MARK_NOTIFICATION_FAILURE';

export function markNotificationRequest() {
  return {
    type: MARK_NOTIFICATION_REQUEST
  };
}

export function markNotificationSuccess(id) {
  return {
    type: MARK_NOTIFICATION_SUCCESS,
    id
  };
}

export function markNotificationFailure() {
  return {
    type: MARK_NOTIFICATION_FAILURE
  };
}

export function markNotification(id) {
  return (dispatch, getState) => {
    dispatch(markNotificationRequest());
    const token = 'token ' + getState().auth.get('token');
    return fetch(`https://api.github.com/notifications/threads/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        dispatch(markNotificationSuccess(json.id));
      })
      .catch(() => {
        dispatch(markNotificationFailure());
      });
  };
}


// Repo's Notification

export const MARK_REPO_NOTIFICATION_REQUEST = 'MARK_REPO_NOTIFICATION_REQUEST';
export const MARK_REPO_NOTIFICATION_SUCCESS = 'MARK_REPO_NOTIFICATION_SUCCESS';
export const MARK_REPO_NOTIFICATION_FAILURE = 'MARK_REPO_NOTIFICATION_FAILURE';


export function markRepoNotificationsRequest() {
  return {
    type: MARK_REPO_NOTIFICATION_REQUEST
  };
}

export function markRepoNotificationsSuccess(repoFullName) {
  return {
    type: MARK_REPO_NOTIFICATION_SUCCESS,
    repoFullName
  };
}

export function markRepoNotificationsFailure() {
  return {
    type: MARK_REPO_NOTIFICATION_FAILURE
  };
}

export function markRepoNotifications(loginId, repoId, repoFullName) {
  return (dispatch, getState) => {
    dispatch(markRepoNotificationsRequest());
    const token = 'token ' + getState().auth.get('token');
    return fetch(`https://api.github.com/repos/${loginId}/${repoId}/notifications`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(markRepoNotificationsSuccess(repoFullName));
      })
      .catch(() => {
        dispatch(markRepoNotificationsFailure());
      });
  };
}


// Search

export const SEARCH_NOTIFICATIONS = 'SEARCH_NOTIFICATIONS';
export function searchNotifications(query) {
  return {
    type: SEARCH_NOTIFICATIONS,
    query: query
  };
}

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  };
}
