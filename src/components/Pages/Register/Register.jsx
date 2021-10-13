import React, {useState} from 'react';
import '../../../index.css'
import styles from "./Register.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function Register({onRegister, onLogged}) {

  const history = useHistory()
  const {authFailed} = useSelector(state => state.auth)
  const [registerState, setRegisterState] = useState(
    {
      name: '',
      email: '',
      password: '',
    }
  )

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
    setRegisterState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(registerState)
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
            className={styles.register__form}
            name='login' noValidate>
        <h2 className={styles.register__title}>Вход</h2>
        <div className={styles.register__input}>
          <Input
            type={'text'}
            placeholder={'имя'}
            onChange={handleChange}
            value={registerState.name}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={styles.register__input}>
          <Input
            type={'email'}
            placeholder={'e-mail'}
            onChange={handleChange}
            value={registerState.email}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={styles.register__input}>
          <Input
            type={'password'}
            placeholder={'пароль'}
            onChange={handleChange}
            icon={'ShowIcon'}
            value={registerState.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className={styles.register__button}>
          <Button type="primary" size="small">
            Зарегистрироваться
          </Button>
        </div>
        <p className={`${styles.register__text} text text_type_main-small`}>Уже зарегистрировались?&nbsp;
          <Link className={styles.register__link} to='/login'>Войти</Link>
        </p>
      </form>
    </div>

  );
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onLogged: PropTypes.func.isRequired,
};

export default Register;
