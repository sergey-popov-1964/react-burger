import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  CLEAR_COUNTER
} from '../actions/ingredient'

import {TIngredientActions} from '../actions/ingredient'
import {IItem} from '../../utils/interfaces'

type TState = {
  ingredientRequest: boolean,
  ingredientFailed: boolean,
  ingredients: Array<IItem>,
  currentIngredient: Object,
  count: Array<number>,
  items?: Array<IItem>
};

const initialState:TState = {
  ingredientRequest: false,
  ingredientFailed: false,
  ingredients: [],
  currentIngredient: {},
  count: [],
};

export const burgerIngredientReducer = (state = initialState, action:TIngredientActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientRequest: true,
        ingredientFailed: false,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.items,
        ingredientRequest: false,
        ingredientFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientRequest: false,
        ingredientFailed: true,
      };
    }
    case INCREMENT_COUNTER: {
      return {
        ...state,
        count: [...state.count, action.id],
      };
    }
    case DECREMENT_COUNTER: {
      const array = [...state.count]
      array.splice(array.indexOf(action.id), 1);
      return {
        ...state,
        count: array
      }
    }
    case CLEAR_COUNTER: {
      return {
        ...state,
        count: []
      }
    }
    default: {
      return state;
    }
  }
};

