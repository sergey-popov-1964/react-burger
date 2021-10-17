import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from './Login.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function Login({onLogin, onLogged}) {

  const history = useHistory()
  const {authFailed} = useSelector(state => state.auth)
  const [loginState, setLoginState] = useState(
    {
      email: '',
      password: '',
    }
  )

  useEffect(() => {
    localStorage.getItem('refreshToken') && history.replace('/login')
  }, [])

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(loginState)
    if (!authFailed) {
      onLogged()
      history.replace('/')
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

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogged: PropTypes.func.isRequired,
};

export default Login;
