import React from 'react';
import style from './BurgerConstructor.module.css'
import bun from '../../images/bun-02.png'
import mark from '../../images/mark-item.svg'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

BurgerConstructor.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.shape({
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

function BurgerConstructor({data}) {

  return (
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
          data.map(item => (
            <div className={style.itemsList}>
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
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bun}
        />
      </div>

      <div className={style.count}>
        <div className={style.total}>
          <p className="text text_type_digits-medium">600</p>
          <div className={style.icon}>
          <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  thread: PropTypes.arrayOf(BurgerConstructor.isRequired).isRequired
};

export default BurgerConstructor;
