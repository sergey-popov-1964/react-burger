import React from 'react';
import style from "./Main.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import PropTypes from "prop-types";

function Main({addItem, deleteItem}) {
  return (
    <div className={style.block}>
      <div className={style.main}>
        <BurgerIngredients
          addItem={addItem}
        />
        <BurgerConstructor deleteItem={deleteItem}/>
      </div>
    </div>
  );
}

Main.propTypes = {
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default Main;
