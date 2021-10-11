import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from './Login.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

function Login({onLogin, onLogged}) {

  const history = useHistory()
  const {authFailed} = useSelector(state => state.auth)
  const [loginState, setLoginState] = useState(
    {
      email: '',
      password: '',
    }
  )

  // useEffect(() => {
  //   localStorage.getItem('refreshToken') && history.push('/')
  // }, [])

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
    onLogin(loginState)
    if (!authFailed) {
      onLogged()
      history.push('/')
    }
  }

  function onIconClick() {

  }

  const inputRef = React.useRef(null)

  return (
    <div className="block">
      <form action="#"
            onSubmit={handleSubmit}
            className={styles.login__form}
            name='login' noValidate>
        <h2 className={styles.login__title}>Вход</h2>
        <div className={styles.login__input}>
          <Input
            type={'email'}
            placeholder={'e-mail'}
            onChange={handleChange}
            value={loginState.email}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={styles.login__input}>
          <Input
            type={'password'}
            placeholder={'пароль'}
            onChange={handleChange}
            icon={'ShowIcon'}
            value={loginState.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className={styles.login__button}>
          <Button type="primary" size="small">
            Войти
          </Button>
        </div>
        <p className={`${styles.login__text} text text_type_main-small`}>Вы - новый пользователь?&nbsp;
          <Link className={styles.login__link} to='/register'>Регистрация</Link>
        </p>
        <p className={`${styles.login__text} text text_type_main-small`}>Забыли пароль?&nbsp;
          <Link className={styles.login__link} to='/forgot-password'>Восстановить пароль</Link>
        </p>
      </form>
    </div>


  );
}

export default Login;
