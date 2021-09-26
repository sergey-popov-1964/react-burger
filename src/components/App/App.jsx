import React, {useEffect, useState} from "react";
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import api from "../../utils/Api";
import {BurgerContext} from '../../context/BurgerContext'
import {ConstructorContext} from '../../context/ConstructorContext'
import {v4 as uuidv4} from 'uuid';

function App() {

  const [dataIngredient, setDataIngredient] = useState([])
  const [dataConstructor, setDataConstructor] = useState({
      bun: null,
      ingredients: []
    }
  )

  useEffect(() => {
    api.getIngredients()
      .then(res => {
        setDataIngredient(res.data)
      })
      .catch((e) => console.log(`Ошибка загрузки данных с сервера`, e));
  }, [])

  function handleSetConstructor(data) {
    const ingredientID = {ingredientID: uuidv4()};
    if (data.type === 'bun') {
      setDataConstructor(prevState => ({...prevState, bun: data}))
    } else {
      setDataConstructor(prevState => ({
        ...prevState,
        ingredients: [...prevState.ingredients, {...data, ...ingredientID}]
      }))
    }
  }

  function handleDeleteItem(data) {
    setDataConstructor(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients.filter((i) => i.ingredientID !== data)]
    }))
  }

  return (
    <div className={style.page}>
      <BurgerContext.Provider value={dataIngredient}>
        <ConstructorContext.Provider value={dataConstructor}>
          <AppHeader/>
          <div className={style.main}>
            <BurgerIngredients
              addItem={handleSetConstructor}
            />
            <BurgerConstructor deleteItem={handleDeleteItem}/>
          </div>
        </ConstructorContext.Provider>
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
