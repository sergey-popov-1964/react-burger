import React from 'react';
import '../../../index.css'
import style from "./Ingredients.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import IngredientDetails from "../Main/IngredientDetails/IngredientDetails";

function Ingredients() {

  const params = useParams()
  const ingredient = useSelector(state => state.burgerIngredient.ingredients.filter(item => item._id === params.id))

  return (
    <div className={style.block}>
      {
        ingredient[0]
        &&
        <IngredientDetails item={ingredient[0]}/>
      }
    </div>
  );
}

export default Ingredients;
