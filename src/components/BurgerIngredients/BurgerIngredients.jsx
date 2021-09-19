import React, {useState} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardList from "../CardList/CardList";
import PropTypes from 'prop-types';
import {menuItemPropTypes} from "../../utils/constants";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

function BurgerIngredients({data}) {
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
                    items={data.filter(item => item.type === 'bun')}/>
          <CardList type="Соусы"
                    onCard={handlerModalOpen}
                    items={data.filter(item => item.type === 'sauce')}/>
          <CardList type="Начинки"
                    onCard={handlerModalOpen}
                    items={data.filter(item => item.type === 'main')}/>
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
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
