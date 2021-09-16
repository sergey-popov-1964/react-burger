import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const Modal = (props) => {

  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose}>
        {props.children}
    </ModalOverlay>,
    document.getElementById("modals")
  );
};

export default Modal;
