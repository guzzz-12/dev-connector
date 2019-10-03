import React, {useState} from "react";
import "./modal.css";

const Modal = (props) => {
  const [password, setPassword] = useState("");

  return (
    <React.Fragment>
      {props.show &&
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="modal-title text-primary">Are you sure?</h2>
            
            {props.actionName === "deleteAccount" && 
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group" style={{marginTop: "0"}}>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
              </form>          
            }

            <div className="modal-buttons">
              <button
                onClick={() => {
                    if(props.actionName === "deleteAccount") {
                      props.action(password, props.userPassword);
                      props.toggleModal(false);
                      return;
                    } else {
                      props.action(props.id && props.id);
                      props.toggleModal(false)
                    }
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
