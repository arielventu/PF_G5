import React from "react";
import "./Modal.css";

const ModalOwner = ({ isOpen, closeModal, title, children }) => {
  const handleModalDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`modal ${isOpen && "modal-open"}`} onClick={closeModal}>
      <div className="modal__dialog" onClick={handleModalDialogClick}>
        <h2>{title}</h2>
        {children}
        {/* <button onClick={closeModal}>Close Modal</button> */}
      </div>
    </div>
  );
};

export default ModalOwner;
