import React from 'react';
import style from './BurgerConstructor.module.css'
import {data} from '../../utils/data'
import bun from '../../images/bun-02.png'
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";


function BurgerConstructor() {

  return (
    <div className={style.block}>
      <div className={style.blockTop}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bun}
        />
      </div>
      <div className={style.blockWithScroll}>
        {
          data.map(item => (
            <div className={style.itemsList}>
              <p className={style.itemMark}>11</p>
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))
        }
      </div>
      <div className={style.blockBottom}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bun}
        />
      </div>
    </div>
  );
}

export default BurgerConstructor;
