import React, {useEffect, useMemo, useState} from 'react';
import style from './BurgerConstructor.module.css'
import bun from '../../images/bun-02.png'
import mark from '../../images/mark-item.svg'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {menuItemPropTypes} from "../../utils/constants";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import {BurgerContext} from '../../context/BurgerContext'
import {ConstructorContext} from '../../context/ConstructorContext'

function BurgerConstructor() {

  const ingredients = React.useContext(BurgerContext);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [test, setTest] = useState([
  ]);


  function handlerClickOpen() {
    setIsOpenModal(true)
  }

  function handlerClickClose() {
    setIsOpenModal(false)
  }

  function handleDeleteElement() {
    console.log("Delete element")
  }


  // useEffect(() => {
  //
  //   const a = {ingredients: ingredients.map((item) => item)};
  //   const b ={a1: "jjj", ingredients: ingredients.map((item) => item)}
  //   // const b ={a1: "jjj", ingredients: ingredients.filter(item => item.type === 'bun')}
  //   setTest(b)
  //   console.log(test)
  // }, [])


  const ingredientList = useMemo(() => ingredients.filter(item => item.type !== 'bun'), [ingredients]);

  return (
    <>

      <div className={style.block}>
        <div className={style.blockTop}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bun}
          />
        </div>

        <div className={style.blockWithScroll}>
          {
            ingredientList.map((item, index) => (
              <div className={style.itemsList} key={index}>
                <img className={style.itemMark} src={mark} alt="Метка"/>
                <ConstructorElement
                  isLocked={false}
                  handleClose={handleDeleteElement}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  key={item._id}
                />
              </div>
            ))
          }
        </div>

        <div className={style.blockBottom}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bun}
          />
        </div>

        <div className={style.count}>
          <div className={style.total}>
            <p className="text text_type_digits-medium">600</p>
            <div className={style.icon}>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
          <div onClick={handlerClickOpen}>
            <Button type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>

      {
        isOpenModal &&
        <Modal onClose={handlerClickClose}>
          <OrderDetails orderNumber={'123456'}/>
        </Modal>
      }

    </>
  );
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
// };


export default BurgerConstructor;
