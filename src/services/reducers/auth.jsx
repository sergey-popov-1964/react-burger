import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED, AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILED,
} from '../actions/auth'

const initialState = {
  name: '',
  email: '',
  authRequest: false,
  authFailed: false,

};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authFailed: false,
      }
    }
    case AUTH_LOGIN_SUCCESS: {
      localStorage.setItem('refreshToken', action.items.refreshToken);
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        name: action.items.user.name,
        email: action.items.user.email,
        isLoggedIn: true,
      };
    }
    case AUTH_LOGIN_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
        isLoggedIn: false,
      };
    }

    case AUTH_REGISTER_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authFailed: false,
      }
    }
    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        authRequest: false,
        authFailed: false,
      };
    }
    case AUTH_REGISTER_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
