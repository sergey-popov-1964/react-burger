import React from 'react';
import style from "./Main.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import {IItem} from "../../../utils/interfaces"

type TMainProps = {
  deleteItem: (ingredientID: string|undefined, _id: string) => void,
  addItem: (item: IItem) => void,
  isLoggedIn: boolean
}

const Main: React.FC<TMainProps> = ({addItem, deleteItem, isLoggedIn}) => {

  return (
    <div className={style.block}>
      <div className={style.main}>
        <BurgerIngredients
          addItem={addItem}
        />
        <BurgerConstructor
          deleteItem={deleteItem}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}

export default Main;
