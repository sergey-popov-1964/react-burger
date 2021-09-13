import React from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardList from "../CardList/CardList";
import PropTypes from 'prop-types';

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "type": PropTypes.string.isRequired,
    "proteins": PropTypes.number.isRequired,
    "fat": PropTypes.number.isRequired,
    "carbohydrates": PropTypes.number.isRequired,
    "calories": PropTypes.number.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
    "image_mobile": PropTypes.string.isRequired,
    "image_large": PropTypes.string.isRequired,
    "__v": PropTypes.number.isRequired
  }).isRequired).isRequired
};

function BurgerIngredients({data}) {
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
        <CardList type="Булки" items={data.filter(item => item.type === 'bun')} />
        <CardList type="Начинки" items={data.filter(item => item.type === 'main')} />
        <CardList type="Соусы" items={data.filter(item => item.type === 'sauce')} />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  thread: PropTypes.arrayOf(BurgerIngredients.isRequired).isRequired
};

export default BurgerIngredients;
