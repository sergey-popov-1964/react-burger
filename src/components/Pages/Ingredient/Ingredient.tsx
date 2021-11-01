import React from 'react';
import style from './Ingredient.module.css'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

//function Ingredient() {

  const Ingredient: React.FC = () => {


  const {id} = useParams<{id?: string}>();
  const item = useSelector((state:any) => state.burgerIngredient.ingredients.filter((item:any) => item._id === id))[0]

  return (
    <>
      {item
        ?
        <div className={style.block}>
          <p className={`${style.title} text text_type_main-large`}>Детали ингредиента</p>
          <div className={style.content}>
            <img className={style.imageIngredient} src={item.image} alt=""/>
            <p className={`${style.nameIngredient} text text_type_main-medium`}>{item.name}</p>
            <ul className={style.list}>
              <li>
                <p className={`${style.text} text text_type_main-small`}>Калории,ккал</p>
                <p className={`${style.text} text text_type_digits-small`}>{item.calories}</p>
              </li>
              <li>
                <p className={`${style.text} text text_type_main-small`}>Белки, г</p>
                <p className={`${style.text} text text_type_digits-small`}>{item.proteins}</p>
              </li>
              <li>
                <p className={`${style.text} text text_type_main-small`}>Жиры, г</p>
                <p className={`${style.text} text text_type_digits-small`}>{item.fat}</p>
              </li>
              <li>
                <p className={`${style.text} text text_type_main-small`}>Углеводы, г</p>
                <p className={`${style.text} text text_type_digits-small`}>{item.carbohydrates}</p>
              </li>
            </ul>
          </div>
        </div>
        :
        null
      }
    </>
  );
}

export default Ingredient;
