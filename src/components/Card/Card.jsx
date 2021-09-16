import React, {useState} from 'react';
import style from "./Card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";

function Card(props) {

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handlerClickOpen() {
    setIsOpenModal(true)
  }

  function handlerClickClose() {
    setIsOpenModal(false)
  }

  return (
    <>
      <div className={style.card} onClick={handlerClickOpen}>
        <img className={style.cardImage} src={props.item.image} alt="Изображение ингредиента"/>
        <div className={style.cardPrice}>
          <p className="text text_type_digits-default">{props.item.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${style.cardName} text text_type_main-small`}>{props.item.name}</p>
      </div>

      {
        isOpenModal &&
        <Modal onClose={handlerClickClose}>
          <div className={style.modalBlock}>
            <button className={style.modalClose} onClick={handlerClickClose}></button>
            <p className={`${style.modalTitle} text text_type_main-large`}>Детали ингредиента</p>
            <div className={style.modalContent}>
              <img className={style.modalImageIngredient} src={props.item.image} alt=""/>
              <p className={`${style.modalNameIngredient} text text_type_main-medium`}>{props.item.name}</p>
              <ul className={style.modalList} >
                <li>
                  <p className={`${style.modalText} text text_type_main-small`}>Калории,ккал</p>
                  <p className={`${style.modalText} text text_type_digits-small`}>{props.item.calories}</p>
                </li>
                <li>
                  <p className={`${style.modalText} text text_type_main-small`}>Белки, г</p>
                  <p className={`${style.modalText} text text_type_digits-small`}>{props.item.proteins}</p>
                </li>
                <li>
                  <p className={`${style.modalText} text text_type_main-small`}>Жиры, г</p>
                  <p className={`${style.modalText} text text_type_digits-small`}>{props.item.fat}</p>
                </li>
                <li>
                  <p className={`${style.modalText} text text_type_main-small`}>Углеводы, г</p>
                  <p className={`${style.modalText} text text_type_digits-small`}>{props.item.carbohydrates}</p>
                </li>
              </ul>

            </div>

          </div>
        </Modal>
      }


    </>
  );
}

export default Card;
