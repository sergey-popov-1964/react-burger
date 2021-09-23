import React, {useEffect, useState} from "react";
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import api from "../../utils/Api";
import {BurgerContext} from '../../context/BurgerContext'
import {ConstructorContext} from '../../context/ConstructorContext'

function App() {

  const [dataIngredient, setDataIngredient] = useState([])
  const [dataConstructor, setDataConstructor] = useState({
      bun: {},
      ingredients: []
    }
  )

  function handleSetConstructor(data) {
    if (data.type === 'bun') {
      setDataConstructor(prevState => ({...prevState, data}))
    } else {
      setDataConstructor(prevState => ({
        ...prevState,
        ingredients: [...prevState.ingredients, data]
      }))
    }
  }

  useEffect(() => {
    api.getIngredients()
      .then(res => {
        setDataIngredient(res.data)
      })
      .catch(() => console.log(`Ошибка загрузки данных с сервера`));
  }, [])

  return (
    <div className={style.page}>
      <BurgerContext.Provider value={dataIngredient}>
        <ConstructorContext.Provider value={dataConstructor}>
          <AppHeader/>
          <div className={style.main}>
            <BurgerIngredients onConsrtructor={handleSetConstructor}/>
            <BurgerConstructor/>
          </div>
        </ConstructorContext.Provider>
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
