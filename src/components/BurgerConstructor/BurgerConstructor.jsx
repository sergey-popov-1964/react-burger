import React, {useMemo, useState} from 'react';
import style from './BurgerConstructor.module.css'
import bun from '../../images/bun-02.png'
import mark from '../../images/mark-item.svg'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {menuItemPropTypes} from "../../utils/constants";
import OrderDetails from "../OrderDetails/OrderDetails";

function BurgerConstructor({data}) {

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handlerClickOpen() {
    setIsOpenModal(true)
  }

  function handlerClickClose() {
    setIsOpenModal(false)
  }

  const ingredientList = useMemo(() => data.filter(item => item.type !== 'bun'), [data]);

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

      {isOpenModal && <OrderDetails onClose={handlerClickClose}/>}

    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
};


export default BurgerConstructor;
