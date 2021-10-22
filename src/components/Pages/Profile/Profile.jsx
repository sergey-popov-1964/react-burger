import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from "./Profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {fetchWithRefresh} from "../../../utils/utillity";

function Profile({updateUser, onLogout}) {
  const [loginState, setLoginState] = useState(
    {
      name: '',
      email: '',
      password: '',
    }
  )

  const profileName = useSelector(state => state.auth.name)
  const profileEmail = useSelector(state => state.auth.email)

  useEffect(() => {
    setLoginState(prevState => ({
      ...prevState,
      name: profileName,
      email: profileEmail
    }))
  }, [profileName, profileEmail])

  useEffect(() => {
    if(localStorage.getItem("refreshToken")) {
      fetchWithRefresh().then()
    }
  }, [])

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(loginState)
  }

  function onIconClick() {
  }

  function handlerClickCancel() {
    setLoginState(prevState => ({
      ...prevState,
      name: profileName,
      email: profileEmail,
      password: '',
    }))
  }


  const inputRef = React.useRef(null)

  return (

    <div className="block">

      <div className={styles.profile__block}>

        <div className={styles.profile__panel}>
          <p className={`text text_type_main-medium ${styles.profile__menu}`}>Профиль</p>
          <p className={`text text_type_main-medium ${styles.profile__menu}`}>История заказов</p>
          <p className={`text text_type_main-medium ${styles.profile__menu} ${styles.profile__menu_click}`} onClick={onLogout}>Выход</p>
          <p className={`text text_type_main-small ${styles.profile__text}`}>В этом разделе вы можете<br/>изменить свои персональные данные</p>
        </div>

        <form action="#"
              onSubmit={handleSubmit}
              className={styles.profile__form}
              name='login' noValidate>
          <div className={styles.profile__input}>
            <Input
              type={'text'}
              placeholder={'имя'}
              onChange={handleChange}
              icon={'EditIcon'}
              onIconClick={onIconClick}
              value={loginState.name}
              name={'name'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={styles.profile__input}>
            <Input
              type={'email'}
              placeholder={'логин'}
              onChange={handleChange}
              icon={'EditIcon'}
              onIconClick={onIconClick}
              value={loginState.email}
              name={'email'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>

          <div className={styles.profile__input}>
            <Input
              type={'password'}
              placeholder={'пароль'}
              onChange={handleChange}
              icon={'EditIcon'}
              value={loginState.password}
              name={'password'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>

          <div className={styles.profile__buttons}>
            <p className={`${styles.profile__cancel} text text_type_main-small`} onClick={handlerClickCancel}>Отмена</p>
            <Button type="primary" size="small">
              Сохранить
            </Button>
          </div>

        </form>

      </div>

    </div>

  );
}

Profile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Profile;
