import React, {useEffect} from "react";
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {useDispatch} from "react-redux";
import {ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONSTRUCTOR} from '../../services/actions/constructor'
import {DECREMENT_COUNTER, getIngredients} from '../../services/actions/ingredient'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

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
        data: data.ingredientID
      }
    )
    dispatch(
      {
        type: DECREMENT_COUNTER,
        id: data._id
      }
    )
  }

  return (
    <div className={style.page}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader/>
        <div className={style.main}>
          <BurgerIngredients
            addItem={handleSetConstructor}
          />
          <BurgerConstructor deleteItem={handleDeleteItem}/>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
