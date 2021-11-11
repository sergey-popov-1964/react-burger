import api from "../../utils/Api";
import {Dispatch} from "redux";

export const AUTH_LOGIN_REQUEST:'AUTH_LOGIN_REQUEST' = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS:'AUTH_LOGIN_SUCCESS' = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILED:'AUTH_LOGIN_FAILED' = 'AUTH_LOGIN_FAILED'
export const AUTH_REGISTER_REQUEST:'AUTH_REGISTER_REQUEST' = 'AUTH_REGISTER_REQUEST'
export const AUTH_REGISTER_SUCCESS:'AUTH_REGISTER_SUCCESS' = 'AUTH_REGISTER_SUCCESS'
export const AUTH_REGISTER_FAILED:'AUTH_REGISTER_FAILED' = 'AUTH_REGISTER_FAILED'

export const LOGGED_IN:'LOGGED_IN' = 'LOGGED_IN'
export const LOGGED_OUT:'LOGGED_OUT' = 'LOGGED_OUT'

export const GET_CURRENT_USER_REQUEST:'GET_CURRENT_USER_REQUEST' = 'GET_CURRENT_USER_REQUEST'
export const GET_CURRENT_USER_SUCCESS:'GET_CURRENT_USER_SUCCESS' = 'GET_CURRENT_USER_SUCCESS'
export const GET_CURRENT_USER_FAILED:'GET_CURRENT_USER_FAILED' = 'GET_CURRENT_USER_FAILED'

export const SET_CURRENT_USER_REQUEST:'SET_CURRENT_USER_REQUEST' = 'SET_CURRENT_USER_REQUEST'
export const SET_CURRENT_USER_SUCCESS:'SET_CURRENT_USER_SUCCESS' = 'SET_CURRENT_USER_SUCCESS'
export const SET_CURRENT_USER_FAILED:'SET_CURRENT_USER_FAILED' = 'SET_CURRENT_USER_FAILED'

export const LOGOUT_REQUEST:'LOGOUT_REQUEST' = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS:'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED:'LOGOUT_FAILED' = 'LOGOUT_FAILED'

type TLogin = {
  name?: string,
  email: string,
  password: string,
  code?: string
}

type TUpdateUser = {
  data: TLogin,
  auth: string|null,
}


interface authLoginReqest {
  readonly type: typeof AUTH_LOGIN_REQUEST;
  readonly data:TLogin
}
interface authLogin {
  readonly type: typeof AUTH_LOGIN_REQUEST;
  readonly data:TLogin
}


export function authLogin(data:TLogin) {
  return function (dispatch:Dispatch) {
    dispatch({
      type: AUTH_LOGIN_REQUEST,
      data: data,
    })
    api.authorization(data)
      .then((res) => {
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

export function authRegister(data:TLogin) {
  return function (dispatch:Dispatch) {
    dispatch({
      type: AUTH_REGISTER_REQUEST
    })
    api.registration(data)
      .then((res) => {
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

export function getCurrentUser(data:string|null) {
  return function (dispatch:Dispatch) {
    dispatch({
      type: GET_CURRENT_USER_REQUEST
    })
    api.getCurrentUser(data)
      .then((res) => {
        console.log(res)
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

export function updateCurrentUser(data:TUpdateUser) {
  return function (dispatch:Dispatch) {
    dispatch({
      type: SET_CURRENT_USER_REQUEST
    })
    api.updateCurrentUser(data)
      .then((res) => {
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

export function logout(data:any) {
  return function (dispatch:Dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
    api.logout(data)
      .then((res) => {
        console.log(res)
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



