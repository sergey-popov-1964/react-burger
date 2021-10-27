import api from "../../utils/Api";

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED'
export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST'
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS'
export const AUTH_REGISTER_FAILED = 'AUTH_REGISTER_FAILED'

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST'
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS'
export const GET_CURRENT_USER_FAILED = 'GET_CURRENT_USER_FAILED'

export const SET_CURRENT_USER_REQUEST = 'SET_CURRENT_USER_REQUEST'
export const SET_CURRENT_USER_SUCCESS = 'SET_CURRENT_USER_SUCCESS'
export const SET_CURRENT_USER_FAILED = 'SET_CURRENT_USER_FAILED'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'


export function authLogin(data) {
  return function (dispatch) {
    dispatch({
      type: AUTH_LOGIN_REQUEST,
      data: data,
    })
    api.authorization(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            items: res
          });
        } else {
          dispatch({
            type: AUTH_LOGIN_FAILED
          });
        }
      })
      .catch((e) => console.log(`Ошибка авторизации`, e));
  };
}

export function authRegister(data) {
  return function (dispatch) {
    dispatch({
      type: AUTH_REGISTER_REQUEST
    })
    api.registration(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_REGISTER_SUCCESS,
            items: res
          });
        } else {
          dispatch({
            type: AUTH_REGISTER_FAILED
          });
        }
      })
      .catch((e) => console.log(`Ошибка авторизации`, e));
  };
}

export function getCurrentUser(data) {
  return function (dispatch) {
    dispatch({
      type: GET_CURRENT_USER_REQUEST
    })
    api.getCurrentUser(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_CURRENT_USER_SUCCESS,
            items: res
          });
        } else {
          dispatch({
            type: GET_CURRENT_USER_FAILED
          });
        }
      })
      .catch((e) => console.log(`Ошибка сервера`, e));
  };
}

export function updateCurrentUser(data) {
  return function (dispatch) {
    dispatch({
      type: SET_CURRENT_USER_REQUEST
    })
    api.updateCurrentUser(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: SET_CURRENT_USER_SUCCESS,
            items: res
          });
        } else {
          dispatch({
            type: SET_CURRENT_USER_FAILED
          });
        }
      })
      .catch((e) => console.log(`Ошибка сервера`, e));
  };
}


export function logout(data) {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
    api.logout(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        } else {
          dispatch({
            type: LOGOUT_FAILED
          });
        }
      })
      .catch((e) => console.log(`Ошибка сервера`, e));
  };
}
