import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './constructor';
import {burgerIngredientReducer} from "./ingrdient";
import {orderReducer} from "./order";
import {AuthReducer} from "./auth";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredient: burgerIngredientReducer,
  order: orderReducer,
  auth: AuthReducer,
});
