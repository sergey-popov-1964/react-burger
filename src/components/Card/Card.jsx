import React from 'react';
import style from "./Card.module.css";

function Card({image, price, name}) {
  return (
    <>
      <div className={style.card}>
        <div>
          <img src={image} alt=""/>
          <p>{price}</p>
          <p>{name}</p>
        </div>

      </div>
    </>
  );
}

export default Card;
