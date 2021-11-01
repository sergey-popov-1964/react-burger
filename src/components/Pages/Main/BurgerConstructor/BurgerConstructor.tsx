import React, {useEffect, useState} from 'react';
import style from './BurgerConstructor.module.css'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import OrderDetails from "../../../OrderDetails/OrderDetails";
import Modal from "../../../Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from '../../../../services/actions/order'
import {useDrop} from "react-dnd";
import {CLEAR_CONSTRUCTOR, SORT_CONSTRUCTOR} from "../../../../services/actions/constructor";
import ConstructorIngredients from "../ConstructorIngredients/ConstructorIngredients";
import {CLEAR_COUNTER} from "../../../../services/actions/ingredient";
import {useHistory} from "react-router-dom";

type TRegisterState = {
  name: string,
  email: string,
  password: string,
}

type TConstructor = {
  deleteItem: (ingredientID: string, _id: string) => void,
  isLoggedIn: boolean,
}

//function BurgerConstructor({deleteItem, isLoggedIn}) {
  const BurgerConstructor: React.FC<TConstructor> = ({deleteItem, isLoggedIn}) => {

  const history = useHistory();

  const dispatch = useDispatch();

  const constructor = useSelector((state:any) => state.burgerConstructor)
  const {orderRequest, orderFailed, orderName, orderNumber} = useSelector((state:any) => state.order)

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sumTotal, setSumTotal] = useState(0);

  useEffect(() => {
    if (constructor.ingredients.length > 0 && constructor.bun) {
      setSumTotal(constructor.ingredients.reduce((a:any, o:any, i:any, p:any) => a + o.price, 0)
        + constructor.bun.price * 2)
    }
  }, [constructor])

  function handlerClickOpen() {
    if (isLoggedIn) {
      const order = [...constructor.ingredients.map((item:any) => item._id), constructor.bun._id]
      createNewOrder(order)
      setIsOpenModal(true)
    } else {
      history.push('/login');
    }
  }

  function handlerClickClose() {
    setIsOpenModal(false)
    dispatch({type: CLEAR_CONSTRUCTOR})
    dispatch({type: CLEAR_COUNTER})
  }

  function createNewOrder(data:string[]) {
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

  function moveCards(dragIndex: number, hoverIndex: number) {
    dispatch({
      type: SORT_CONSTRUCTOR,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    })
  }

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
                constructor.ingredients.map((item:any, index:number) => (
                  <ConstructorIngredients
                    item={item}
                    index={index}
                    moveCards={moveCards}
                    deleteItem={deleteItem}
                    id={item._id}
                    key={item.ingredientID}/>
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
  isLoggedIn: PropTypes.bool.isRequired,
};


export default BurgerConstructor;
