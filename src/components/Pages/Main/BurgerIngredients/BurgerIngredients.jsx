import React, {Component, createRef, useState} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardList from "../CardList/CardList";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT} from "../../../../services/actions/ingredient";

function BurgerIngredients({addItem}) {

  const {ingredients, currentIngredient,  count} = useSelector(state => state.burgerIngredient)
  const {bun} = useSelector(state => state.burgerConstructor)

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

  const bunsRef = createRef()
  const sauceRef = createRef()
  const mainRef = createRef()
  const parentBlock = createRef()

  const handleTabs = () => {
    const topParentBlock = parentBlock.current.offsetTop;
    const bunsClientRect = bunsRef.current.getBoundingClientRect().top;
    const sauceClientRect = sauceRef.current.getBoundingClientRect().top;
    const mainClientRect = mainRef.current.getBoundingClientRect().top;

    if (topParentBlock > bunsClientRect && topParentBlock <= sauceClientRect) {
      setCurrent('Булки')
    } else if (topParentBlock > sauceClientRect && topParentBlock <= mainClientRect) {
      setCurrent('Соусы')
    } else {
      setCurrent('Начинки')
    }
  }

  function handleClickOnTab(tab, ref) {
    if(ref !== null) {
      setCurrent(tab);
      ref.scrollIntoView();
    }
    return null
  }

  return (
    <>
      <div className={style.block}>
        <p className={`${style.title} text text_type_main-large`}>
          Соберите бургер
        </p>
        <div style={{display: 'flex'}}>
          <Tab value="Булки" active={current === 'Булки'} onClick={ () => handleClickOnTab('Булки', bunsRef.current)}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={ () => handleClickOnTab('Соусы', sauceRef.current)}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={current === 'Начинки'} onClick={() => handleClickOnTab('Начинки', mainRef.current)}>
            Начинки
          </Tab>
        </div>

        <div className={style.ingredientList} ref={parentBlock} onScroll={handleTabs}>
          <div ref={bunsRef} >
            <CardList type="Булки"
                      onCard={handlerModalOpen}
                      items={ingredients.filter(item => item.type === 'bun')}
                      addItem={addItem}
                      count={count}
                      bun={bun ? bun._id : null}
            />
          </div>
          <div ref={sauceRef}>
            <CardList type="Соусы"
                      onCard={handlerModalOpen}
                      items={ingredients.filter(item => item.type === 'sauce')}
                      addItem={addItem}
                      count={count}
                      bun={bun ? bun._id : null}
            />
          </div>
          <div ref={mainRef}>
            <CardList type="Начинки"
                      onCard={handlerModalOpen}
                      items={ingredients.filter(item => item.type === 'main')}
                      addItem={addItem}
                      count={count}
                      bun={bun ? bun._id : null}
            />
          </div>
        </div>
      </div>


    </>
  );
}

BurgerIngredients.propTypes = {
  addItem: PropTypes.func.isRequired,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Component) }),
  ]),
};

export default BurgerIngredients;
