import {ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONSTRUCTOR, CLEAR_CONSTRUCTOR} from '../actions/constructor'
import {v4 as uuidv4} from 'uuid';

const initialState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CONSTRUCTOR: {
      const ingredientID = {ingredientID: uuidv4()};
      if (action.data.type === 'bun') {
        return {
          ...state,
          bun: action.data
        }
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, {...action.data, ...ingredientID}],
        }
      }
    }
    case DELETE_ITEM_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [...state.ingredients.filter((i) => i.ingredientID !== action.data)]
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        bun: null,
        ingredients: []
      }
    }
    default: {
      return state;
    }
  }
};
