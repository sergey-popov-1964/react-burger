import React from 'react';
import style from "./Card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Card({image, price, name}) {
  return (
    <>
      <div className={style.card}>
        <img className={style.cardImage} src={image} alt=""/>
        <div className={style.cardPrice}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${style.cardName} text text_type_main-small`}>{name}</p>
      </div>
    </>
  );
}

export default Card;
