import React, {useEffect} from 'react';
import style from './ModalOverlay.module.css'

const ModalOverlay = (props) => {

  function handlerKeyPress(KeyboardEvent) {
    console.log(KeyboardEvent)
    if (KeyboardEvent.key === "Escape") {
      props.onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handlerKeyPress);
  }, [])

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
