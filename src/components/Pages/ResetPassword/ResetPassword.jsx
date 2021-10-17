import React, {useState} from 'react';
import '../../../index.css'
import styles from "./ResetPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import api from "../../../utils/Api";

function ResetPassword() {

  const history = useHistory()
  const [resetPasswordState, setResetPasswordState] = useState(
    {
      password: '',
      code: '',
    }
  )

  function handleChange(e) {
    const {name, value} = e.target;
    setResetPasswordState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.resetPassword(resetPasswordState)
      .then(() => {
        history.replace('/login')
      })
      .catch((e) => console.log(`Что-то пошло не так`, e));
  }

  function onIconClick() {
  }

  const inputRef = React.useRef(null)

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
            Войти
          </Button>
        </div>
        <p className={`${styles.reset__text} text text_type_main-small`}>Вспомнили пароль?&nbsp;
          <Link className={styles.reset__link} to='/login'>Войти</Link>
        </p>
      </form>
    </div>

  );
}


export default ResetPassword;
