import React, {useEffect, useState} from 'react';
import style from "./Card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {INCREMENT_COUNTER} from "../../services/actions/ingredient";

function Card({item, onCard, addItem, count, bun}) {

  const [countIngredient, setCountIngredient] = useState(0);

  useEffect(() => {
    if (item.type === 'bun') {
      bun && bun === item._id ? setCountIngredient(1) : setCountIngredient(0)

    } else {
      setCountIngredient(count.filter(count => count === item._id).length)
    }
  }, [count])


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
      <div className={countIngredient > 0 ? `${style.counter}` : `${style.counterHide}`}>
        <Counter count={countIngredient} size="default" />
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
  onCard: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default Card;
