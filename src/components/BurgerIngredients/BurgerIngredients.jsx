import React, {useState} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardList from "../CardList/CardList";
import PropTypes from 'prop-types';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

import {BurgerContext} from '../../context/BurgerContext'

function BurgerIngredients({addItem}) {

  const ingredients = React.useContext(BurgerContext);

  const [current, setCurrent] = React.useState('Булки')
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState({});

  function handlerModalOpen(data) {
    setIsOpenModal(true)
    setIngredientDetails(data)
  }

  function handlerClickClose() {
    setIsOpenModal(false)
  }

  return (
    <>
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
          <CardList type="Булки"
                    onCard={handlerModalOpen}
                    items={ingredients.filter(item => item.type === 'bun')}
                    addItem={addItem}
          />
          <CardList type="Соусы"
                    onCard={handlerModalOpen}
                    items={ingredients.filter(item => item.type === 'sauce')}
                    addItem={addItem}
          />
          <CardList type="Начинки"
                    onCard={handlerModalOpen}
                    items={ingredients.filter(item => item.type === 'main')}
                    addItem={addItem}
          />
        </div>
      </div>

      {
        isOpenModal &&
        <Modal onClose={handlerClickClose}>
          <IngredientDetails item={ingredientDetails}/>
        </Modal>
      }

    </>
  );
}

BurgerIngredients.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default BurgerIngredients;
