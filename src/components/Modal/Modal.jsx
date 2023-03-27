import React, { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';

import './Modal.scss';

const Modal = ({ children }) => {
  const { closeModal } = useContext(ModalContext);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="modal" onClick={handleOutsideClick} data-testid="modal-overlay">
      <div className="content">
        <div className="header">
          <button className="close-button" onClick={closeModal}>
            <span className="close-icon">&#x2716;</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
