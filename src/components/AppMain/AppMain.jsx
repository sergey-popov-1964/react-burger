import React from 'react';
import style from './AppMain.module.css'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

// import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppMain() {
  return (
    <div className={style.block}>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </div>
  );
}

export default AppMain;
