import React, {useState} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardList from "../CardList/CardList";
import PropTypes from 'prop-types';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT} from "../../services/actions/ingredient";

function BurgerIngredients({addItem}) {

  const {ingredients, currentIngredient} = useSelector(state => state.burgerIngredient)

  const [current, setCurrent] = React.useState('Булки')
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();

  function handlerModalOpen(data) {
    dispatch(
      {
        type: SET_CURRENT_INGREDIENT,
        data: data
      }
    )
    setIsOpenModal(true)
  }

  function handlerClickClose() {
    dispatch({type: DELETE_CURRENT_INGREDIENT})
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
          <IngredientDetails item={currentIngredient}/>
        </Modal>
      }

    </>
  );
}

BurgerIngredients.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default BurgerIngredients;
