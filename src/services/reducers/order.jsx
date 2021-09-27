import {
  SET_NEW_ORDER_REQUEST,
  SET_NEW_ORDER_SUCCESS,
  SET_NEW_ORDER_FAILED,
} from '../actions/order'

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderName: '',
  orderNumber: ''
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case SET_NEW_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderName: action.order.name,
        orderNumber: action.order.order.number
      };
    }
    case SET_NEW_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

