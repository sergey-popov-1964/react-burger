import React from 'react';
import style from './CardList.module.css'
import Card from "../Card/Card";
import PropTypes from "prop-types";
import {menuItemPropTypes} from "../../utils/constants";

function CardList({type, items, onCard, addItem, count, bun}) {

  return (
    <>
      <div className={style.cardBlock}>
        <p className={`${style.title} text text_type_main-small`}>{type}</p>
        <div className={style.cardList}>
          {
            items.map(item => (
              <Card item={item}
                    onCard={onCard}
                    addItem={addItem}
                    key={item._id}
                    count={count}
                    bun={bun}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}

CardList.propTypes = {
  items: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
  type: PropTypes.string.isRequired,
  onCard: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default CardList;
