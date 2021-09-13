
import React from "react";
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {data} from '../../utils/data'

function App() {
  return (
    <div className={style.page}>
      <AppHeader/>
      <div className={style.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
    </div>
  );
}

export default App;
