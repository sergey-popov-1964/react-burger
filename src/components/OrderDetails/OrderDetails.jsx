import React from 'react';
import Modal from "../Modal/Modal";
import style from './OrderDetails.module.css'
import done from "../../images/done.png";
import PropTypes from "prop-types";

function OrderDetails({onClose}) {
  return (
    <>
      <Modal onClose={onClose}>
          <div className={style.content}>
            <p className={ `${style.numberOrder} text text_type_digits-large`}>123456</p>
            <p className={ `${style.title} text text_type_main-medium`}>идентификатор заказа</p>
            <img className={style.image} src={done} alt=""/>
            <p className={ `${style.textOrder} text text_type_main-small`}>Ваш заказ начали готовить</p>
            <p className={ `${style.textWait} text text_type_main-small`}>Дождитесь готовности на орбитальной станции</p>
          </div>
      </Modal>
    </>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
