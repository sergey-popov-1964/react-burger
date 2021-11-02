import React from 'react';
import style from './ModalOverlay.module.css'

type TOverlayProps = {
  children: React.ReactNode,
  onClose: () => void
}

const ModalOverlay: React.FC<TOverlayProps> = ({children, onClose}) => {

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

export default ModalOverlay;
