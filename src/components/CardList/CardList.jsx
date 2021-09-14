import React from 'react';
import style from './CardList.module.css'
import Card from "../Card/Card";

function CardList({type, items}) {
  return (
    <div className={style.cardBlock}>
      <p className={`${style.title} text text_type_main-small`}>{type}</p>
      <div className={style.cardList}>
        {
          items.map(item => (
            <Card image={item.image}
                  price={item.price}
                  name={item.name}
                  key={item._id}
            />
          ))
        }
      </div>

    </div>
  );
}

export default CardList;
