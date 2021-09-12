import React from 'react';
import style from './CardList.module.css'
import Card from "../Card/Card";

function CardList({type, items}) {
  return (
    <div>
      <p>{type}</p>
      <div className={style.cardList}>
        {
          items.map(item => (
            <Card image={item.image}
                  price={item.price}
                  name={item.name}
            />
          ))
        }
      </div>

    </div>
  );
}

export default CardList;
