import React from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css'

const Modal = ({onClose}) => {

  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div className={style.name}>
        <p>Модальное окно</p>
        <button onClick={onClose}>Нажми меня</button>
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default Modal;
