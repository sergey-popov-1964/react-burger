import React from 'react';
import style from "./Card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {CLEAR_CONSTRUCTOR} from "../../services/actions/constructor";
import {INCREMENT_COUNTER} from "../../services/actions/ingredient";

function Card({item, onCard, addItem}) {

  const dispatch = useDispatch();

  const [{isDragging}, drag] = useDrag(() => ({
    type: 'item',
    item: {item},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handlerDropCard()
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  function handlerDropCard() {
    addItem(item)
    dispatch({type: INCREMENT_COUNTER, id: item._id})
  }

  function handlerClickOnCard() {
    onCard(item)
  }

  const opacity = isDragging ? 0.5 : 1;
  return (
    <div className={style.card} onClick={handlerClickOnCard} ref={drag} style={{...style, opacity}}>
      <img className={style.cardImage} src={item.image} alt="Изображение ингредиента"/>
      <div className={style.cardPrice}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${style.cardName} text text_type_main-small`}>{item.name}</p>
      <span
        className={`${style.counter} text text_type_digits-default`}>1</span>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
  onCard: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default Card;
