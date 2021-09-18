import React from 'react';
import style from './ModalOverlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({children, onClose}) => {

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={style.modal} onClick={handleClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
