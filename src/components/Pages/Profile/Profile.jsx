import React, {useState} from 'react';
import '../../../index.css'
import styles from "./Profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import api from "../../../utils/Api";
import {AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS} from "../../../services/actions/auth";

function Profile(props) {
  // const [currentError, setCurrentError] = useState("");
  const [loginState, setLoginState] = useState(
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
    console.log(e.target.value)
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // onLogin(loginState, typeError)
  }

  function onProfileClick() {
    const data = localStorage.getItem('accessToken')
    api.getUser(data)
      .then(res => {
        console.log(res)
      })
      }


      function onIconClick() {}

    const inputRef = React.useRef(null)


    return (

      <div className="block">

        <div className={styles.profile__block}>

          <div className={styles.profile__panel}>
            <p className="text text_type_main-default" onClick={onProfileClick}>Профиль</p>
            <p className="text text_type_main-default">История заказов</p>
            <p className="text text_type_main-default">Выход</p>
            <p>В этом разделе вы можете изменить свои персональные данные</p>
          </div>

          <div className={styles.profile__form}>

            <div className={styles.profile__input}>
              <Input
                type={'text'}
                placeholder={'имя'}
                onChange={handleChange}
                icon={'EditIcon'}
                onIconClick={onIconClick}
                value={loginState.name}
                name={'name'}
                error={false}
                ref={inputRef}
                errorText={'Ошибка'}
                size={'default'}
              />
            </div>

            <div className={styles.profile__input}>
              <Input
                type={'email'}
                placeholder={'логин'}
                onChange={handleChange}
                icon={'EditIcon'}
                onIconClick={onIconClick}
                value={loginState.email}
                name={'email'}
                error={false}
                ref={inputRef}
                errorText={'Ошибка'}
                size={'default'}
              />
            </div>

            <div className={styles.profile__input}>
              <Input
                type={'password'}
                placeholder={'пароль'}
                onChange={handleChange}
                icon={'EditIcon'}
                value={loginState.password}
                name={'password'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
              />
            </div>

          </div>

        </div>

      </div>

    );
  }

  export default Profile;
