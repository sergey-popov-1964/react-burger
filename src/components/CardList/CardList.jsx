import React from 'react';
import {data} from '../../utils/data'
import style from './CardList.module.css'

function CardList(props) {
  return (
    <div>
        <p>Булки</p>
        <div className={style.cardList}>
          {
            data.filter(item => item.type === 'bun')
              .map(item => (
                <div className={style.Item}>
                  <img className={style.elementImage} src={item.image} alt=""/>
                  <p>{item.price}</p>
                  <p>{item.name}</p>
                </div>
              ))
          }
      </div>

    </div>
  );
}

export default CardList;
