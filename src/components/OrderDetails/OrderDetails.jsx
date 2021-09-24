import React from 'react';
import style from './OrderDetails.module.css'
import done from "../../images/done.png";
import PropTypes from "prop-types";

function OrderDetails({orderNumber, orderName}) {
  return (
    <div className={style.content}>
      <p className={`${style.numberOrder} text text_type_digits-large`}>{orderNumber}</p>
      <p className={`${style.title} text text_type_main-medium`}>{orderName}</p>
      <img className={style.image} src={done} alt=""/>
      <p className={`${style.textOrder} text text_type_main-small`}>Ваш заказ начали готовить</p>
      <p className={`${style.textWait} text text_type_main-small`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
  orderName: PropTypes.string.isRequired,
};

export default OrderDetails;
