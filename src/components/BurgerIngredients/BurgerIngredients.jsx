import React from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardList from "../CardList/CardList";


function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('Булки')
  return (

    <div className={style.block}>
      <p className={`${style.title} text text_type_main-large`}>
        Соберите бургер
      </p>
      <div style={{display: 'flex'}}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={style.ingredientList}>
        <CardList/>


      </div>

    </div>
  );
}

export default BurgerIngredients;
