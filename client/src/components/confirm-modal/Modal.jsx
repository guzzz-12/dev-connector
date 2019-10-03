import React from "react";
import "./modal.css";

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show &&
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="modal-title text-primary">Are you sure?</h2>
            <div className="modal-buttons">
              <button
                onClick={() => {
                    props.action(props.id ? props.id : null);
                    props.toggleModal(false)
                  }
                }
                className="btn btn-danger"
              >
                OK
              </button>
              <button onClick={() => props.toggleModal(false)} className="btn btn-primary">Cancel</button>
            </div>
          </div>
        </div>      
      }
    </React.Fragment>
  );
}

export default Modal;
