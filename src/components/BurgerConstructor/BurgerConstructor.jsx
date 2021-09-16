import React, {useState} from 'react';
import style from './BurgerConstructor.module.css'
import bun from '../../images/bun-02.png'
import mark from '../../images/mark-item.svg'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import done from "../../images/done.png";
import {menuItemPropTypes} from "../../utils/constants";

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     "_id": PropTypes.string.isRequired,
//     "name": PropTypes.string.isRequired,
//     "type": PropTypes.string.isRequired,
//     "proteins": PropTypes.number.isRequired,
//     "fat": PropTypes.number.isRequired,
//     "carbohydrates": PropTypes.number.isRequired,
//     "calories": PropTypes.number.isRequired,
//     "price": PropTypes.number.isRequired,
//     "image": PropTypes.string.isRequired,
//     "image_mobile": PropTypes.string.isRequired,
//     "image_large": PropTypes.string.isRequired,
//     "__v": PropTypes.number.isRequired
//   }).isRequired).isRequired
// };

function BurgerConstructor({data}) {

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handlerClickOpen() {
    console.log("Клик на ингредиенте")
    setIsOpenModal(true)
  }

  function handlerClickClose() {
    setIsOpenModal(false)
  }
  return (
    <>

      <div className={style.block}>
        <div className={style.blockTop}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bun}
          />
        </div>

        <div className={style.blockWithScroll}>
          {
            data.map((item, index) => (
              <div className={style.itemsList} key={index}>
                <img className={style.itemMark} src={mark} alt="Метка"/>
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  key={item._id}
                />
              </div>
            ))
          }
        </div>

        <div className={style.blockBottom}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bun}
          />
        </div>

        <div className={style.count}>
          <div className={style.total}>
            <p className="text text_type_digits-medium">600</p>
            <div className={style.icon}>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
          <div onClick={handlerClickOpen}>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
          </div>
        </div>
      </div>

      {
        isOpenModal &&
        <Modal onClose={handlerClickClose}>
          <div className={style.modalBlock}>
            <button className={style.modalClose} onClick={handlerClickClose}></button>
            <div className={style.modalContent}>
              <p className={ `${style.modalNumberOrder} text text_type_digits-large`}>123456</p>
              <p className={ `${style.modalTitle} text text_type_main-medium`}>идентификатор заказа</p>
              <img className={style.modalImage} src={done} alt=""/>
              <p className={ `${style.modalTextOrder} text text_type_main-small`}>Ваш заказ начали готовить</p>
              <p className={ `${style.modalTextWait} text text_type_main-small`}>Дождитесь готовности на орбитальной станции</p>
            </div>
          </div>
        </Modal>
      }

    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
};


export default BurgerConstructor;
