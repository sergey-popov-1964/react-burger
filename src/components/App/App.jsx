import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, useLocation, useParams} from 'react-router-dom';
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";

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
  getCurrentUser,
  logout,
  updateCurrentUser
} from "../../services/actions/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import Ingredient from "../Pages/Ingredient/Ingredient";

function App() {

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory()
  const action = history.action ==='PUSH' || history.action ==='REPLACE';
  const background = action && location.state && location.state.background;

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isRestorePassword, setIsRestorePassword] = useState(false)

  useEffect(() => {
    dispatch(getIngredients())
    const jwt = localStorage.getItem('refreshToken');
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, [])

  useEffect(() => {
  }, [isRestorePassword])

  function handleSetConstructor(data) {
    dispatch(
      {
        type: ADD_ITEM_TO_CONSTRUCTOR,
        data: data
      }
    )
  }

  function handleDeleteItem(data) {
    dispatch(
      {
        type: DELETE_ITEM_FROM_CONSTRUCTOR,
        data: data.ingredientID
      }
    )
    dispatch(
      {
        type: DECREMENT_COUNTER,
        id: data._id
      }
    )
  }


  function handlerClickClose() {
    dispatch({type: DELETE_CURRENT_INGREDIENT})
    setIsOpenModal(false)
    history.goBack()
  }

  function handleLogin(data) {
    dispatch(authLogin(data))
  }

  function handleRegister(data) {
    dispatch(authRegister(data))
  }

  function handleGetCurrentUser() {
    dispatch(getCurrentUser(localStorage.getItem('accessToken')))
  }

  function handleUpdateCurrentUser(data) {
    const auth = localStorage.getItem('accessToken')
    dispatch(updateCurrentUser({auth, data}))
  }

  function handleLogout() {
    const data = {token: localStorage.getItem('refreshToken')}
    dispatch(logout({data}))
    dispatch({type: CLEAR_CONSTRUCTOR})
    dispatch({type: CLEAR_COUNTER})
    setIsLoggedIn(false)
  }

  return (
    <div className={style.page}>
      <DndProvider backend={HTML5Backend}>

          <AppHeader isLoggedIn={isLoggedIn}/>
          <Switch location={background || location}>

            <ProtectedRoute
              path="/reset-password"
              isLoggedIn={isRestorePassword}
              resetIsRestorePassword={() => setIsRestorePassword(false)}
              component={ResetPassword}
            />

            <ProtectedRoute
              path="/profile"
              isLoggedIn={isLoggedIn}
              component={Profile}
              getUser={handleGetCurrentUser}
              updateUser={handleUpdateCurrentUser}
              onLogout={handleLogout}
            />

            <Route path="/login">
              <Login
                onLogin={handleLogin}
                onLogged={() => setIsLoggedIn(true)}
              />
            </Route>

            <Route path="/register">
              <Register
                onRegister={handleRegister}
                onLogged={() => setIsLoggedIn(true)}
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
              <Ingredient />
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

export default App;
