import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import {Location, History} from 'history';
import {IItem} from "../../utils/interfaces"

import {useDispatch, useSelector} from "react-redux";
import {
  ADD_ITEM_TO_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  DELETE_ITEM_FROM_CONSTRUCTOR
} from '../../services/actions/constructor'
import {
  CLEAR_COUNTER,
  DECREMENT_COUNTER,
  DELETE_CURRENT_INGREDIENT,
  getIngredients
} from '../../services/actions/ingredient'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Main from "../Pages/Main/Main";
import Notfound from "../Pages/Notfound/Notfound";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import Profile from "../Pages/Profile/Profile";
import {
  authLogin,
  authRegister,
  getCurrentUser, LOGGED_IN, LOGGED_OUT,
  logout,
  updateCurrentUser
} from "../../services/actions/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import Ingredient from "../Pages/Ingredient/Ingredient";
import {fetchWithRefresh} from "../../utils/utillity";

type TLogin = {
  name?: string,
  email: string,
  password: string
}

type TLocataionState = {
  from?: Location;
  background?: Location;
};

type THistory = {
  action?: History;
  push?: History;
  replace?: History;
};

const App: React.FC = () => {

  const Location = useLocation<TLocataionState>();
  const dispatch = useDispatch();
  const History = useHistory<THistory>()
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn)

  const action = History.action === 'PUSH' || History.action === 'REPLACE';
  const background = action && Location.state && Location.state.background;

  const [isReady, setIsReady] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isRestorePassword, setIsRestorePassword] = useState(false)

  useEffect(() => {
    dispatch(getIngredients())
    if (localStorage.getItem("refreshToken")) {
      fetchWithRefresh()
        .then(() => {
          dispatch({type: LOGGED_IN})
          setIsReady(true)
        })
        .catch(() => {
          dispatch({type: LOGGED_OUT})
          setIsReady(true)
        })
    } else {
      dispatch({type: LOGGED_OUT})
      setIsReady(true)
    }
  }, [])

  function handleSetConstructor(data:IItem) {
    dispatch(
      {
        type: ADD_ITEM_TO_CONSTRUCTOR,
        data: data
      }
    )
  }

  function handleDeleteItem(ingredientID: string, _id: string) {
    dispatch(
      {
        type: DELETE_ITEM_FROM_CONSTRUCTOR,
        data: ingredientID
      }
    )
    dispatch(
      {
        type: DECREMENT_COUNTER,
        id: _id
      }
    )
  }

  function handlerClickClose() {
    dispatch({type: DELETE_CURRENT_INGREDIENT})
    setIsOpenModal(false)
    History.push("/")
    setIsReady(true)
  }

  function handleLogin(data:TLogin) {
    dispatch(authLogin(data))
    dispatch({type: LOGGED_IN})
    setIsReady(true)
  }

  function handleRegister(data:TLogin) {
    dispatch(authRegister(data))
    dispatch({type: LOGGED_IN})
    setIsReady(true)
  }

  // function handleGetCurrentUser() {
  //   dispatch(getCurrentUser(localStorage.getItem('accessToken')))
  // }

  function handleUpdateCurrentUser(data:TLogin) {
    const auth = localStorage.getItem('accessToken')
    dispatch(updateCurrentUser({auth, data}))
  }

  function handleLogout() {
    dispatch({type: LOGGED_OUT})
    const data = {token: localStorage.getItem('refreshToken')}
    dispatch(logout({data}))
    dispatch({type: CLEAR_CONSTRUCTOR})
    dispatch({type: CLEAR_COUNTER})
    History.push('login')
    setIsReady(true)
  }

  if(!isReady) {
    return null
  } else {
    return (
      <div className={style.page}>
        <DndProvider backend={HTML5Backend}>

          <AppHeader/>

          <Switch location={background || Location}>

            {isRestorePassword
            &&
            <ProtectedRoute<React.ComponentProps<typeof ResetPassword>>
              path="/reset-password"
              isLoggedIn={isRestorePassword}
              resetIsRestorePassword={() => setIsRestorePassword(false)}
              component={ResetPassword}
            />
            }

            <ProtectedRoute<React.ComponentProps<typeof Profile>>
              path="/profile"
              isLoggedIn={isLoggedIn}
              component={Profile}
              updateUser={handleUpdateCurrentUser}
              onLogout={handleLogout}
            />

            <ProtectedRoute<React.ComponentProps<typeof Login>>
              path="/login"
              isLoggedIn={!isLoggedIn}
              onLogin={handleLogin}
              component={Login}
              onLogged={() => dispatch({type: LOGGED_IN})}
            />

            <Route path="/register">
              <Register
                onRegister={handleRegister}
                onLogged={() => dispatch({type: LOGGED_OUT})}
              />
            </Route>

            <Route path="/forgot-password">
              <ForgotPassword onClickRestore={() => setIsRestorePassword(true)}/>
            </Route>

            <Route path="/" exact={true}>
              <Main addItem={handleSetConstructor}
                    deleteItem={handleDeleteItem}
                    isLoggedIn={isLoggedIn}
              />
            </Route>

            <Route path="/ingredients/:id">
              <Ingredient/>
            </Route>

            <Route path="*">
              <Notfound/>
            </Route>

          </Switch>

          {background && (<Route path="/ingredients/:id">
            <Modal onClose={handlerClickClose}>
              <Ingredient/>
            </Modal>
          </Route>)}

        </DndProvider>

      </div>

    );
  }

}

export default App;
