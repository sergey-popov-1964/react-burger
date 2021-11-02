import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from "./ForgotPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import api from "../../../utils/Api";

type TForgotPassword = {
  onClickRestore: () => void,
}

  const ForgotPassword: React.FC<TForgotPassword> = ({onClickRestore}) => {

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
      }
      else {
        setIsReady(true)
      }
    }, [])

    function handleChange(e:React.SyntheticEvent) {
      const {name, value} = e.target as HTMLInputElement;
      setLoginState(prevState => ({...prevState, [name]: value}));
    }

    function handleSubmit(e:React.SyntheticEvent) {
      e.preventDefault();
      api.forgotPassword(loginState.email)
        .then(res => {
          onClickRestore()
          history.replace('./reset-password')
        })
        .catch((e) => console.log(`Ошибка сервера`, e));
    }

    const inputRef = React.useRef(null)

  if(!isReady) return null

    return (
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

  export default ForgotPassword;
