import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from "./ForgotPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import api from "../../../utils/Api";
import PropTypes from "prop-types";



function ForgotPassword({onClickRestore}):any {

  const history = useHistory()
  let location = useLocation();

  let {from} = location.state || {from: {pathname: "/"}};
  const [isReady, setIsReady] = useState(false)
  const [loginState, setLoginState] = useState(
    {
      email: '',
    }
  )

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      history.replace(from)
    } else {
      setIsReady(true)
    }
  }, [])

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.forgotPassword(loginState.email)
      .then(res => {
        onClickRestore()
        history.replace('./reset-password')
      })
      .catch((e) => console.log(`Ошибка сервера`, e));
  }

  const inputRef = React.useRef(null)

  return (
    isReady &&
    <div className="block">
      <form action="#"
            onSubmit={handleSubmit}
            className={styles.forgot__form}
            name='login' noValidate>
        <h2 className={styles.forgot__title}>Восстановление пароля</h2>
        <div className={styles.forgot__input}>
          <Input
            type={'email'}
            placeholder={'укажите e-mail'}
            onChange={handleChange}
            value={loginState.email}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className={styles.forgot__button}>
          <Button type="primary" size="small">
            Восстановить
          </Button>
        </div>
        <p className={`${styles.forgot__text} text text_type_main-small`}>Вспомнили пароль?&nbsp;
          <Link className={styles.forgot__link} to='/login'>Войти</Link>
        </p>
      </form>
    </div>

  );
}

ForgotPassword.propTypes = {
  onClickRestore: PropTypes.func.isRequired,
};

export default ForgotPassword;