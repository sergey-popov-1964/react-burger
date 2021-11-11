import api from "../../utils/Api";
import {Dispatch} from "redux";

export const SET_NEW_ORDER_REQUEST:'SET_NEW_ORDER_REQUEST' = 'SET_NEW_ORDER_REQUEST'
export const SET_NEW_ORDER_SUCCESS:'SET_NEW_ORDER_SUCCESS' = 'SET_NEW_ORDER_SUCCESS'
export const SET_NEW_ORDER_FAILED:'SET_NEW_ORDER_FAILED' = 'SET_NEW_ORDER_FAILED'

export function createOrder(order:string[]) {
  return function (dispatch:Dispatch) {
    dispatch({
      type: SET_NEW_ORDER_REQUEST
    });
    api.createOrder(order)
      .then((res:any) => {
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
      })
      .catch((e) => console.log(`Ошибка сервера`, e));
  };
}
