import React, {useEffect, useState} from 'react';
import '../../../index.css'
import styles from "./Profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {fetchWithRefresh} from "../../../utils/utillity";
import {getCurrentUser} from "../../../services/actions/auth";


type TLoginState = {
  name: string,
  email: string,
  password: string,
}

type TProfile = {
  updateUser: (loginState: TLoginState) => void,
  onLogout: () => void,
}

  const Profile: React.FC<TProfile> = ({updateUser, onLogout}) => {

  const dispatch = useDispatch()

  const [isReady, setIsReady] = useState(false)
  const [loginState, setLoginState] = useState<TLoginState>(
    {
      name: '',
      email: '',
      password: '',
    }
  )

  const profileName = useSelector((state:any) => state.auth.name)
  const profileEmail = useSelector((state:any) => state.auth.email)

  useEffect(() => {
    setLoginState(prevState => ({
      ...prevState,
      name: profileName,
      email: profileEmail
    }))
  }, [profileName, profileEmail])

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      fetchWithRefresh().then(() => {
          dispatch(getCurrentUser(localStorage.getItem("accessToken")))
          setIsReady(true)
        }
      )
    } else {
      setIsReady(true)
    }
  }, [])

  function handleChange(e: React.SyntheticEvent) {
    const {name, value} = e.target as HTMLInputElement
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    updateUser(loginState)
  }

  function onIconClick() {
  }

  function handlerClickCancel() {
    setLoginState(prevState => ({
      ...prevState,
      name: profileName,
      email: profileEmail,
      password: '',
    }))
  }

  const inputRef = React.useRef(null)


  if(!isReady) return null

  return (
    <div className="block">

      <div className={styles.profile__block}>

        <div className={styles.profile__panel}>
          <p className={`text text_type_main-medium ${styles.profile__menu}`}>??????????????</p>
          <p className={`text text_type_main-medium ${styles.profile__menu}`}>?????????????? ??????????????</p>
          <p className={`text text_type_main-medium ${styles.profile__menu} ${styles.profile__menu_click}`}
             onClick={onLogout}>??????????</p>
          <p className={`text text_type_main-small ${styles.profile__text}`}>?? ???????? ?????????????? ???? ????????????<br/>???????????????? ????????
            ???????????????????????? ????????????</p>
        </div>

        <form action="#"
              onSubmit={handleSubmit}
              className={styles.profile__form}
              name='login' noValidate>
          <div className={styles.profile__input}>
            <Input
              type={'text'}
              placeholder={'??????'}
              onChange={handleChange}
              icon={'EditIcon'}
              onIconClick={onIconClick}
              value={loginState.name}
              name={'name'}
              error={false}
              ref={inputRef}
              errorText={'????????????'}
              size={'default'}
            />
          </div>
          <div className={styles.profile__input}>
            <Input
              type={'email'}
              placeholder={'??????????'}
              onChange={handleChange}
              icon={'EditIcon'}
              onIconClick={onIconClick}
              value={loginState.email}
              name={'email'}
              error={false}
              ref={inputRef}
              errorText={'????????????'}
              size={'default'}
            />
          </div>

          <div className={styles.profile__input}>
            <Input
              type={'password'}
              placeholder={'????????????'}
              onChange={handleChange}
              icon={'EditIcon'}
              value={loginState.password}
              name={'password'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'????????????'}
              size={'default'}
            />
          </div>

          <div className={styles.profile__buttons}>
            <p className={`${styles.profile__cancel} text text_type_main-small`} onClick={handlerClickCancel}>????????????</p>
            <Button type="primary" size="small">
              ??????????????????
            </Button>
          </div>

        </form>

      </div>

    </div>

  );
}

export default Profile;
