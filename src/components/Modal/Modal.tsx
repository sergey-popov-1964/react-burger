import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

type TModalProps = {
  children: React.ReactNode,
  onClose: () => void
}

const Modal: React.FC<TModalProps> = ({children, onClose}) => {
//const Modal = ({children, onClose}) => {

//  function handlerKeyPress(KeyboardEvent) {
//    if (KeyboardEvent.key === "Escape") {
//      onClose()
//    }
//  }

  function handlerKeyPress() {

      onClose()

  }

  useEffect(() => {
    document.addEventListener("keydown", handlerKeyPress);

    return () => {
      document.removeEventListener("keydown", handlerKeyPress);
    }
  }, [])

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={style.modalBlock}>
        <button className={style.modalClose} onClick={onClose}></button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modals") as HTMLLIElement
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
