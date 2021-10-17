import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";

import {useDispatch} from "react-redux";
import {ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONSTRUCTOR} from '../../services/actions/constructor'
import {DECREMENT_COUNTER, getIngredients} from '../../services/actions/ingredient'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Main from "../Pages/Main/Main";
import Notfound from "../Pages/Notfound/Notfound";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import Profile from "../Pages/Profile/Profile";
import Ingredients from "../Pages/Ingredients/Ingredients";
import {
  authLogin,
  authRegister,
  getCurrentUser,
  logout,
  updateCurrentUser
} from "../../services/actions/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRestorePassword, setIsRestorePassword] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
    const jwt = localStorage.getItem('refreshToken');
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, [dispatch])

  useEffect(() => {
    console.log(isRestorePassword)
  }, [isRestorePassword])

  useEffect(() => {
    dispatch(getIngredients())
    const jwt = localStorage.getItem('refreshToken');
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, [dispatch])

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
    setIsLoggedIn(false)
  }

  return (
    <div className={style.page}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <AppHeader isLoggedIn={isLoggedIn}/>
          <Switch>

            <ProtectedRoute
              path="/reset-password"
              isLoggedIn={isRestorePassword}
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
              <Ingredients/>
            </Route>

            <Route path="*">
              <Notfound/>
            </Route>

          </Switch>
        </BrowserRouter>
      </DndProvider>
    </div>

  );
}

export default App;
