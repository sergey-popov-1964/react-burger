import React, {useState} from 'react';
import style from './CardList.module.css'
import Card from "../Card/Card";
import Modal from "../Modal/Modal";


function CardList({type, items}) {

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
    <div className={style.cardBlock}>
      <p className={`${style.title} text text_type_main-small`}>{type}</p>
      <div className={style.cardList}>
        {
          items.map(item => (
            <Card image={item.image}
                  price={item.price}
                  name={item.name}
                  clickOpen={handlerClickOpen}
            />
          ))
        }
      </div>

    </div>

      {
        isOpenModal && <Modal onClose={handlerClickClose}/>
      }

    </>
  );
}

export default CardList;
