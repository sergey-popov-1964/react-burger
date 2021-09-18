import React from 'react';
import Modal from "../Modal/Modal";
import style from './IngredientDetails.module.css'
import PropTypes from "prop-types";

function IngredientDetails({item, onClose}) {
  return (
    <>
      <Modal onClose={onClose}>
        <div>
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
      </Modal>
    </>
  );
}

IngredientDetails.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
