import React, {useEffect} from "react";
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {useDispatch} from "react-redux";
import {ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONSTRUCTOR} from '../../services/actions/constructor'
import {getIngredients} from '../../services/actions/ingredient'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  function handleSetConstructor(data) {
    dispatch(
      {
        type: ADD_ITEM_TO_CONSTRUCTOR,
        data: data
      }
    )
  }

  function handleDeleteItem(data) {
    dispatch(
      {
        type: DELETE_ITEM_FROM_CONSTRUCTOR,
        data: data
      }
    )
  }

  return (
    <div className={style.page}>
      <AppHeader/>
      <div className={style.main}>
        <BurgerIngredients
          addItem={handleSetConstructor}
        />
        <BurgerConstructor deleteItem={handleDeleteItem}/>
      </div>
    </div>
  );
}

export default App;
