import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from "./ResetPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import api from "../../../utils/Api";
//import PropTypes from "prop-types";

type TResetPasswordProps = {
  resetIsRestorePassword: () => void,
}

//function ResetPassword({resetIsRestorePassword}) {

  const ResetPassword: React.FC<TResetPasswordProps> = ({resetIsRestorePassword}) => {


    const history = useHistory()
  let location = useLocation();

  let {from} = location.state || {from: {pathname: "/"}};
  const [isReady, setIsReady] = useState(false)
  const [resetPasswordState, setResetPasswordState] = useState(
    {
      password: '',
      code: '',
    }
  )

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      history.replace(from)
    } else {
      setIsReady(true)
    }
  }, [])

  function handleChange(e: React.SyntheticEvent) {
    const {name, value} = e.target as HTMLInputElement
    setResetPasswordState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    api.resetPassword(resetPasswordState)
      .then(() => {
        resetIsRestorePassword()
        history.replace('/login')
      })
      .catch((e) => console.log(`Что-то пошло не так`, e));
  }

  function onIconClick() {
  }

  const inputRef = React.useRef(null)

    if(!isReady) return null

  return (
    <div className="block">
      <form action="#"
            onSubmit={handleSubmit}
            className={styles.reset__form}
            name='login' noValidate>
        <h2 className={styles.reset__title}>Восстановление пароля</h2>
        <div className={styles.reset__input}>
          <Input
            type={'password'}
            placeholder={'введите новый пароль'}
            onChange={handleChange}
            icon={'ShowIcon'}
            value={resetPasswordState.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={styles.reset__input}>
          <Input
            type={'text'}
            placeholder={'введите код из письма'}
            onChange={handleChange}
            value={resetPasswordState.code}
            name={'code'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className={styles.reset__button}>
          <Button type="primary" size="small">
            Сохранить
          </Button>
        </div>
        <p className={`${styles.reset__text} text text_type_main-small`}>Вспомнили пароль?&nbsp;
          <Link className={styles.reset__link} to='/login'>Войти</Link>
        </p>
      </form>
    </div>

  );
}

//ResetPassword.propTypes = {
//  resetIsRestorePassword: PropTypes.func.isRequired,
//};


export default ResetPassword;
