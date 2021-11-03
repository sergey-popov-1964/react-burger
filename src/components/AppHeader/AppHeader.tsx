import React, {useEffect} from 'react';
import style from './AppHeader.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useRouteMatch} from "react-router-dom";

  const AppHeader: React.FC = () => {

  const isConstructor = !!useRouteMatch({path: '/', exact: true});
  const isFeed = !!useRouteMatch('/feed');
  const isProfile = !!useRouteMatch('/profile');

  useEffect(() => {
  }, [isConstructor, isFeed, isProfile])

  return (
    <div className={style.page}>
      <div className={style.block}>
        <ul className={style.nav}>
          <li className={style.navItem}>
            <Link className={style.navLink} to='/'>
              <BurgerIcon type={isConstructor ? "primary" : "secondary"}/>
              <p className={isConstructor ? `text text_type_main-small ${style.navText}`
                : `text text_type_main-small ${style.navText} ${style.navTextGray}`}>
                Конструктор
              </p>
            </Link>
          </li>
          <li className={style.navItem}>
            <a href="/" className={style.navLink}>
              <ListIcon type="secondary"/>
              <p className={`text text_type_main-small ${style.navText} ${style.navTextGray}`}>
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
        <div className={style.headerLogo}>
          <Logo/>
        </div>
        <div className={style.cabinet}>
          <Link className={`${style.navLink} ${style.headerCabinet}`} to='/profile'>
            <ProfileIcon type={isProfile ? "primary" : "secondary"}/>
            <p className={isProfile ? `text text_type_main-small ${style.navText}`
              : `text text_type_main-small ${style.navText} ${style.navTextGray}`}>
              Личный кабинет
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
