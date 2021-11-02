import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

type TModalProps = {
  children: React.ReactNode,
  onClose: () => void
}

const Modal: React.FC<TModalProps> = ({children, onClose}) => {

 function handlerKeyPress(e:KeyboardEvent) {
   if (e.code === "Escape") {
     e.preventDefault();
     onClose()
   }
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

export default Modal;
