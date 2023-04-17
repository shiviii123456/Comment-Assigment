import React from 'react';
import './modal.css';

function Modal(props) {

    const onClose = () => {
        props.onModalClose(false);
    };


  return (
    <div id="myModal" className={`Modal ${props.isOpen === false && 'is-hidden is-visuallyHidden'}`}>
    <div class="Modal-content">
        <span className="Close" onClick={() => onClose()}>&times;</span>
        <div>{props.children}</div>
    </div>
    </div>
  )
}

export default Modal