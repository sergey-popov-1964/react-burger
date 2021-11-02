import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from "./Register.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

type TRegisterState = {
  name: string,
  email: string,
  password: string,
}

type TRegister = {
  onRegister: (registerState: TRegisterState) => void,
  onLogged: () => void,
}

const Register: React.FC<TRegister> = ({onRegister, onLogged}) => {

  const history = useHistory()
  const {authFailed} = useSelector((state: any) => state.auth)
  const [isReady, setIsReady] = useState(false)
  const [registerState, setRegisterState] = useState<TRegisterState>(
    {
      name: '',
      email: '',
      password: '',
    }
  )

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      history.replace('/')
    }
    else {
      setIsReady(true)
    }
  }, [])

  function handleChange(e: React.SyntheticEvent) {
    const {name, value} = e.target as HTMLInputElement;
    setRegisterState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e: React.SyntheticEvent) {
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

  if (!isReady) {
    return null
  } else {
    return (
      <div className="block">
        <form action="#"
              onSubmit={handleSubmit}
              className={styles.register__form}
              name='login' noValidate>
          <h2 className={styles.register__title}>Регистрация</h2>
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
              type={'text'}
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

}

export default Register;
