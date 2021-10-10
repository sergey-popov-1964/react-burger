import api from "../../utils/Api";

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED'
export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST'
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS'
export const AUTH_REGISTER_FAILED = 'AUTH_REGISTER_FAILED'


export const CHECK_TOKEN_REQUEST = 'CHECK_TOKEN_REQUEST'
export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS'
export const CHECK_TOKEN_FAILED = 'CHECK_TOKEN_FAILED'

export function authLogin(data) {
  return function (dispatch) {
    dispatch({
      type: AUTH_LOGIN_REQUEST,
      data: data,
    })
    api.authorization(data)
      .then(res => {
        if (res && res.success) {
          console.log(res)
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

export function authRegister() {
  return function (dispatch) {
    dispatch({
      type: AUTH_REGISTER_REQUEST
    })
    api.registration()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_REGISTER_SUCCESS,
            items: res.data
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
