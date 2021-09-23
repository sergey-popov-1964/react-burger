import React from 'react';
import style from "./Card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Card({item, onCard, onConsrtructor}) {

  function handlerClickOnCard() {
    onCard(item)
    onConsrtructor(item)
  }




  return (
    <div className={style.card} onClick={handlerClickOnCard}>
      <img className={style.cardImage} src={item.image} alt="Изображение ингредиента"/>
      <div className={style.cardPrice}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${style.cardName} text text_type_main-small`}>{item.name}</p>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
  onCard: PropTypes.func.isRequired,
  onConsrtructor: PropTypes.func.isRequired,
};

export default Card;
