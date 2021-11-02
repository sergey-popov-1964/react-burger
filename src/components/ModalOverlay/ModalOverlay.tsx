import React from 'react';
import style from './ModalOverlay.module.css'
//import PropTypes from "prop-types";

type TOverlayProps = {
  children: React.ReactNode,
  onClose: () => void
}

const ModalOverlay: React.FC<TOverlayProps> = ({children, onClose}) => {
//const ModalOverlay = ({children, onClose}:TOverlayProps) => {

  function handleClose(e: React.SyntheticEvent) {
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

//ModalOverlay.propTypes = {
//  children: PropTypes.element.isRequired,
//  onClose: PropTypes.func.isRequired,
//};

export default ModalOverlay;
