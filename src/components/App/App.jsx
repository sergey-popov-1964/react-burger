import React, {useEffect} from "react";
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

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

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

  return (
    <div className={style.page}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <AppHeader/>
          <Switch>
            <Route path="/" exact={true}>
              <Main addItem={handleSetConstructor}
                    deleteItem={handleDeleteItem}
              />
            </Route>

            <Route path="/login">
              <Login/>
            </Route>

            <Route path="/register">
              <Register/>
            </Route>

            <Route path="/forgot-password">
              <ForgotPassword/>
            </Route>

            <Route path="/reset-password">
              <ResetPassword/>
            </Route>

            <Route path="/profile">
              <Profile/>
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
