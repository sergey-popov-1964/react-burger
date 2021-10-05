import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './constructor';
import {burgerIngredientReducer} from "./ingrdient";
import {orderReducer} from "./order";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredient: burgerIngredientReducer,
  order: orderReducer,
});
