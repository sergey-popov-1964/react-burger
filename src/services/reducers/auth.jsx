import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILED,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILED,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_REQUEST,
  SET_CURRENT_USER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOGGED_IN,
  LOGGED_OUT,
} from '../actions/auth'

const initialState = {
  name: '',
  email: '',
  authRequest: false,
  authFailed: false,
  isLoggedIn: false
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
      localStorage.setItem('accessToken', action.items.accessToken);
      localStorage.setItem('refreshToken', action.items.refreshToken);
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        name: action.items.user.name,
        email: action.items.user.email,
      };
    }
    case AUTH_LOGIN_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
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
      localStorage.setItem('accessToken', action.items.accessToken);
      localStorage.setItem('refreshToken', action.items.refreshToken);
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        name: action.items.user.name,
        email: action.items.user.email,
      };
    }
    case AUTH_REGISTER_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      };
    }

    case GET_CURRENT_USER_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authFailed: false,
      }
    }

    case GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        name: action.items.user.name,
        email: action.items.user.email,
        authRequest: false,
        authFailed: false,
      };
    }

    case GET_CURRENT_USER_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      };
    }

    case SET_CURRENT_USER_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authFailed: false,
      }
    }

    case SET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        name: action.items.user.name,
        email: action.items.user.email,
        authRequest: false,
        authFailed: false,
      };
    }
    case SET_CURRENT_USER_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authFailed: false,
      }
    }
    case LOGOUT_SUCCESS: {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        name: '',
        email: '',
        authRequest: false,
        authFailed: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      };
    }
    case LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }

    case LOGGED_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
};
