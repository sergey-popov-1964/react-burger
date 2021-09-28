import React, {useCallback, useEffect, useState} from 'react';
import style from './BurgerConstructor.module.css'
import mark from '../../images/mark-item.svg'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from '../../services/actions/order'
import {useDrop} from "react-dnd";
import {CLEAR_CONSTRUCTOR} from "../../services/actions/constructor";


function BurgerConstructor({deleteItem}) {

  const dispatch = useDispatch();

  const constructor = useSelector(state => state.burgerConstructor)
  const {orderRequest, orderFailed, orderName, orderNumber} = useSelector(state => state.order)

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sumTotal, setSumTotal] = useState(0);

  useEffect(() => {
    if (constructor.ingredients.length > 0 && constructor.bun) {
      setSumTotal(constructor.ingredients.reduce((a, o, i, p) => a + o.price, 0)
        + constructor.bun.price * 2)
    }
  }, [constructor])

  function handlerClickOpen() {
    const order = [...constructor.ingredients.map((item) => item._id), constructor.bun._id]
    createNewOrder(order)
    setIsOpenModal(true)
  }

  function handlerClickClose() {
    setIsOpenModal(false)
    dispatch({type: CLEAR_CONSTRUCTOR})
  }

  function createNewOrder(data) {
    dispatch(createOrder(data))
  }

  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: 'item',
    drop: () => ({name: 'BurgerConstructor'}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop || isOver;

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = constructor.ingredients[dragIndex];
console.log(dragIndex, hoverIndex)
  }, [constructor.ingredients]);

  return (
    <div ref={drop}>

      <div>
        <div className={isActive ? `${style.block} ${style.blockCanDrop}` : `${style.block}`}>
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
                ?
                constructor.ingredients.map((item) => (
                  <div className={style.itemsList} key={item.ingredientID} moveCard={moveCard}>
                    <img className={style.itemMark} src={mark} alt="Метка"/>
                    <ConstructorElement
                      isLocked={false}
                      handleClose={() => deleteItem(item)}
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                ))
                :
                <div className={style.blockMiddle}>
                  <div className={style.noBuns}>
                    Выберите начинку
                  </div>
                </div>
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
                Выберите булку
              </div>
            }
          </div>
        </div>
        {constructor.bun && constructor.ingredients.length > 0 &&
        <div className={style.count}>
          <div className={style.total}>
            <p className="text text_type_digits-medium">{sumTotal}</p>
            <div className={style.icon}>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
          <div>
            <Button type="primary" size="large" onClick={handlerClickOpen}>
              Оформить заказ
            </Button>
          </div>
        </div>
        }
      </div>

      {
        isOpenModal && !orderRequest && !orderFailed &&
        <Modal onClose={handlerClickClose}>
          <OrderDetails
            orderNumber={orderNumber}
            orderName={orderName}
          />
        </Modal>
      }

    </div>
  );
}

BurgerConstructor.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};


export default BurgerConstructor;
