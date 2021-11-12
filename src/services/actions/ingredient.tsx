import api from "../../utils/Api";
import {Dispatch} from "redux";
import {IItem} from '../../utils/interfaces'

export const GET_INGREDIENTS_REQUEST:'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS:'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED:'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED'

export const INCREMENT_COUNTER:'INCREMENT_COUNTER' = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER:'DECREMENT_COUNTER' = 'DECREMENT_COUNTER'
export const CLEAR_COUNTER:'CLEAR_COUNTER' = 'CLEAR_COUNTER'

export function getIngredients() {
  return function (dispatch:Dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    api.getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            items: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      })
      .catch((e) => console.log(`Ошибка загрузки данных с сервера`, e));
  };
}

export interface IGetIngredient {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}
export interface IGetIngredientSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  readonly items:IItem
}
export interface IGetIngredientFiled {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export interface IIncrementCounter {
  readonly type: typeof INCREMENT_COUNTER
  readonly id: number
}
export interface IDecrementCounter {
  readonly type: typeof DECREMENT_COUNTER
  readonly id: number
}
export interface IClearCounter {
  readonly type: typeof CLEAR_COUNTER
}

export type TIngredientActions =
  | IGetIngredient
  | IGetIngredientSuccess
  | IGetIngredientFiled
  | IIncrementCounter
  | IDecrementCounter
  | IClearCounter

export const getIngredient = (items:IItem):IGetIngredientSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  items
})
export const incrementCounter = (id:number):IIncrementCounter => ({
  type: INCREMENT_COUNTER,
  id
})
export const decrementCounter = (id:number):IDecrementCounter => ({
  type: DECREMENT_COUNTER,
  id
})
