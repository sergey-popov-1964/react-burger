import api from "../../utils/Api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT'
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT'

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'
export const CLEAR_COUNTER = 'CLEAR_COUNTER'

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    api.getIngredients()
      .then(res => {
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
