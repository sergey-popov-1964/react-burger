import React, {useEffect} from 'react';
import '../../../index.css'
import style from "./Ingredients.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";


function Ingredients(props) {

  const params = useParams()
  console.log(params.id)
  const ingredients = useSelector(state => state.burgerIngredient.ingredients.filter(item => item._id === params.id))
  // ((state) => state.todos[props.id])
  console.log("Ингредиент",ingredients[0])

  // useEffect(() => {
  //   const item = ingredients.filter(item => item._id === params.id)
  // }, [])


  // state  => state.burgerIngredient.ingredients.filter(({_id}) => _id === params.id))
  // console.log(ingredients)


  // store.dashboard.dashboards.filter(({ Id }) => Id === id)

  return (
    <div className="block">
      ingredients
      ?
      <div>
        <p className={`${style.title} text text_type_main-large`}>Детали ингредиента</p>
        <div className={style.content}>
          <img className={style.imageIngredient} src={ingredients[0].image} alt=""/>
          <p className={`${style.nameIngredient} text text_type_main-medium`}>{ingredients[0].name}</p>
          <ul className={style.list}>
            <li>
              <p className={`${style.text} text text_type_main-small`}>Калории,ккал</p>
              <p className={`${style.text} text text_type_digits-small`}>{ingredients[0].calories}</p>
            </li>
            <li>
              <p className={`${style.text} text text_type_main-small`}>Белки, г</p>
              <p className={`${style.text} text text_type_digits-small`}>{ingredients[0].proteins}</p>
            </li>
            <li>
              <p className={`${style.text} text text_type_main-small`}>Жиры, г</p>
              <p className={`${style.text} text text_type_digits-small`}>{ingredients[0].fat}</p>
            </li>
            <li>
              <p className={`${style.text} text text_type_main-small`}>Углеводы, г</p>
              <p className={`${style.text} text text_type_digits-small`}>{ingredients[0].carbohydrates}</p>
            </li>
          </ul>
        </div>
      </div>
      :
      <div>Ничего не найдено</div>
    </div>);
}

export default Ingredients;
