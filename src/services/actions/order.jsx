import api from "../../utils/Api";

export const SET_NEW_ORDER_REQUEST = 'SET_NEW_ORDER_REQUEST'
export const SET_NEW_ORDER_SUCCESS = 'SET_NEW_ORDER_SUCCESS'
export const SET_NEW_ORDER_FAILED = 'SET_NEW_ORDER_FAILED'


export function createOrder(order) {
  return function (dispatch) {
    dispatch({
      type: SET_NEW_ORDER_REQUEST
    });
    api.createOrder(order).then(res => {
      if (res && res.success) {
        dispatch({
          type: SET_NEW_ORDER_SUCCESS,
          order: res
        });
      } else {
        dispatch({
          type: SET_NEW_ORDER_FAILED
        });
      }
    });
  };
}
