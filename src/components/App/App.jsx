import React, {useEffect} from "react";
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import api from "../../utils/Api";

function App() {

  const [data, setData] = React.useState([])

  useEffect(() => {
    api.getIngredients()
      .then(res => {
        setData(res.data)
      })
      .catch(() => console.log(`Ошибка загрузки данных с сервера`));
  }, [])

  return (
    <div className={style.page}>
      <AppHeader/>
      <div className={style.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
    </div>
  );
}

export default App;
