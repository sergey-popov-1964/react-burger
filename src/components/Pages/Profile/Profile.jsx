import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from "./Profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function Profile({getUser, updateUser, onLogout}) {
  // const [currentError, setCurrentError] = useState("");
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
  },[profileName, profileEmail])


  // const [isValid, setIsValid] = useState(false);
  // const [errorMessageEmail, setErrorMessageEmail] = useState("l")
  // const [errorMessagePassword, setErrorMessagePassword] = useState("")

  // useEffect(() => {
  //   const emailValidity = loginState.email.match(/^[\w-\.\d*]+@[\w\d]+(\.\w{2,4})$/);
  //   const passwordValidity = loginState.password.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g);
  //   emailValidity ? setErrorMessageEmail("") : setErrorMessageEmail("Поле должно содержать e-mail")
  //   passwordValidity ? setErrorMessagePassword("") : setErrorMessagePassword("Пароль должен быть длиной не менее 6 символов и содержать спецсимвол, цифру, латинскую букву в верхнем и нижнем регистре")
  //   setIsValid(emailValidity && passwordValidity);
  // }, [loginState.email, loginState.password])
  //
  // function typeError(data) {
  //   setCurrentError(data)
  // }

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(loginState)
    // onLogin(loginState, typeError)
  }

  function onProfileClick() {
    getUser()
  }

  function onIconClick() {
  }

  const inputRef = React.useRef(null)

  return (

    <div className="block">

      <div className={styles.profile__block}>

        <div className={styles.profile__panel}>
          <p className="text text_type_main-default" onClick={onProfileClick}>Профиль</p>
          <p className="text text_type_main-default">История заказов</p>
          <p className="text text_type_main-default" onClick={onLogout}>Выход</p>
          <p>В этом разделе вы можете изменить свои персональные данные</p>
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

          <div className={styles.profile__button}>
            <Button type="primary" size="small">
              Зарегистрироваться
            </Button>
          </div>

        </form>

      </div>

    </div>

  );
}

Profile.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Profile;
