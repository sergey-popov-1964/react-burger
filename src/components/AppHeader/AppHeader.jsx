import React from 'react';
import style from './AppHeader.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <div className={style.page}>
      <div className={style.block}>
      <ul className={style.nav}>
        <li className={style.navItem}>
          <a href="#" className={style.navLink}>
            <BurgerIcon type="primary"/>
            <p className={`text text_type_main-small ${style.navText}`}>
              Конструктор
            </p>
          </a>
        </li>
        <li className={style.navItem}>
          <a href="#" className={style.navLink}>
            <ListIcon type="secondary"/>
            <p className={`text text_type_main-small ${style.navText} ${style.navTextGray}`}>
              Лента заказов
            </p>
          </a>
        </li>
      </ul>
      <div className={style.he}>
        <Logo/>
      </div>
      <div className={style.cabinet}>
        <a href="#" className={`${style.navLink} ${style.headerCabinet}`}>
          <ProfileIcon type="primary"/>
          <p className={`text text_type_main-small ${style.navText}`}>
            Личный кабинет
          </p>
        </a>
      </div>
      </div>
    </div>
  );
}

export default AppHeader;
