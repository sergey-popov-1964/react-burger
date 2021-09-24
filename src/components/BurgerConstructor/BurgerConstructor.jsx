import React, {useEffect, useState} from 'react';
import style from './BurgerConstructor.module.css'
import mark from '../../images/mark-item.svg'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import {ConstructorContext} from '../../context/ConstructorContext'
import api from "../../utils/Api";

function BurgerConstructor({deleteItem}) {

  const constructor = React.useContext(ConstructorContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sumTotal, setSumTotal] = useState(0);

  const [orderNumber, setOrderNumber] = useState('');
  const [orderName, setOrderName] = useState('');

  const [isOrderReceived, setisOrderReceived] = useState(false);

  useEffect(() => {
    if (constructor.ingredients.length || constructor.bun) {
      setSumTotal(constructor.ingredients.reduce((a, o, i, p) => a + o.price, 0)
        + constructor.bun.price * 2)
    }
  }, [constructor])


  function handlerClickOpen() {
    const order = constructor.ingredients.map((item) => item._id)
    order.push(constructor.bun._id);
    createNewOrder(order)
    setIsOpenModal(true)
  }

  function handlerClickClose() {
    setIsOpenModal(false)
    setisOrderReceived(false)
  }

  function createNewOrder(data) {
    api.createOrder(data)
      .then(res => {
        setOrderNumber(res.order.number)
        setOrderName(res.name)
        setisOrderReceived(true)
      })
      .catch((e) => console.log(`Ошибка загрузки данных с сервера`, e));
  }

  return (
    <>

      <div className={style.block}>
        <div className={style.blockTop}>
          {constructor.bun
            ?
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${constructor.bun.name} (верх)`}
              price={constructor.bun.price}
              thumbnail={constructor.bun.image}
            />
            :
            <div className={`${style.noBuns} ${style.noBunsTop}`}>
              Выберите булку
            </div>
          }
        </div>

        <div className={style.blockWithScroll}>
          {
            constructor.ingredients.length !== 0
            &&
            constructor.ingredients.map((item, index) => (
              <div className={style.itemsList} key={index}>
                <img className={style.itemMark} src={mark} alt="Метка"/>
                <ConstructorElement
                  isLocked={false}
                  handleClose={() => deleteItem(item._id)}
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
          {constructor.bun
            ?
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${constructor.bun.name} (верх)`}
              price={constructor.bun.price}
              thumbnail={constructor.bun.image}
            />
            :
            <div className={`${style.noBuns} ${style.noBunsBottom}`}>
            </div>
          }
        </div>

        <div className={style.count}>
          <div className={style.total}>
            <p className="text text_type_digits-medium">{sumTotal}</p>
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
        isOpenModal && isOrderReceived &&
        <Modal onClose={handlerClickClose}>
          <OrderDetails
            orderNumber={orderNumber}
            orderName={orderName}
          />
        </Modal>
      }

    </>
  );
}

BurgerConstructor.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};


export default BurgerConstructor;
