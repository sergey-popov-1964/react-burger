import React from 'react';
import style from './CardList.module.css'
import Card from "../Card/Card";
import {IItem} from '../../../../utils/interfaces'

type TConstructorProps = {
  type: string,
  items: Array<IItem>,
  addItem: (item: IItem) => void,
  count: string[]
  bun: string
}

const CardList: React.FC<TConstructorProps> = ({type, items, addItem, count, bun}) => {

  return (
    <>
      <div className={style.cardBlock}>
        <p className={`${style.title} text text_type_main-small`}>{type}</p>
        <div className={style.cardList}>
          {
            items.map(item => (
              <Card item={item}
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


export default CardList;
