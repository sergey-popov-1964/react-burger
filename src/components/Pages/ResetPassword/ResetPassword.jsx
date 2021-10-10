import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from "./ResetPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";

function ResetPassword(props) {

  const history = useHistory()
  const [loginState, setLoginState] = useState(
    {
      password: '',
      code: '',
    }
  )

  useEffect(() => {
    localStorage.getItem('refreshToken') && history.push('/')
  }, [])
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
    console.log(e.target.value)
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(1111111111)
    // onLogin(loginState, typeError)
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
            value={loginState.password}
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
            value={loginState.email}
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
