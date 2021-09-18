import React, {useState} from 'react';
import style from "./Card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";

function Card({item}) {

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handlerClickOpen() {
    setIsOpenModal(true)
  }

  function handlerClickClose() {
    setIsOpenModal(false)
  }

  return (
    <>
      <div className={style.card} onClick={handlerClickOpen}>
        <img className={style.cardImage} src={item.image} alt="Изображение ингредиента"/>
        <div className={style.cardPrice}>
          <p className="text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${style.cardName} text text_type_main-small`}>{item.name}</p>
      </div>

      {isOpenModal && <IngredientDetails item={item} onClose={handlerClickClose}/>}

    </>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Card;
