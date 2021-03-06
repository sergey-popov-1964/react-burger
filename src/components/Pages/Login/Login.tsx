import React, {useState} from 'react';
import '../../../index.css'
import styles from './Login.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";

type TLoginState = {
  email: string,
  password: string,
}

type TLogin = {
  onLogin: (loginState: TLoginState) => void,
  onLogged: () => void,
}

const Login: React.FC<TLogin> = ({onLogin, onLogged}) => {

  const history = useHistory()
  let location = useLocation();

  let {from} = location.state || {from: {pathname: "/"}};

  const [loginState, setLoginState] = useState<TLoginState>(
    {
      email: '',
      password: '',
    }
  )

  function handleChange(e: React.SyntheticEvent) {
    const {name, value} = e.target as HTMLInputElement;
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    onLogin(loginState)
    onLogged()
    history.push(from)
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
