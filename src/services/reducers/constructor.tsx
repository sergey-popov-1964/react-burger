import {
  ADD_ITEM_TO_CONSTRUCTOR,
  DELETE_ITEM_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  SORT_CONSTRUCTOR
} from '../actions/constructor'
import {v4 as uuidv4} from 'uuid';

type TState = {
  bun: string|null,
  ingredients: []
};

const initialState:TState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorReducer = (state = initialState, action:any) => {
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
        ingredients: [...state.ingredients.filter((i:any) => i.ingredientID !== action.data)]
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        bun: null,
        ingredients: []
      }
    }

    case SORT_CONSTRUCTOR: {
      const data = [...state.ingredients];
      data.splice(action.dragIndex, 0, data.splice(action.hoverIndex, 1)[0]);
      return {
        ...state,
        ingredients: data
      }
    }

    default: {
      return state;
    }
  }
};
