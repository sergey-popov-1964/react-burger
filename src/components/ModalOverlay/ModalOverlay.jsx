import React from 'react';
import style from './ModalOverlay.module.css'

const ModalOverlay = (props) => {

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      props.onClose()
    }
  }

  return (
    <div className={style.modal} onClick={handleClose}>
      {props.children}
    </div>
  );
};

export default ModalOverlay;
