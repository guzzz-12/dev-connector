import React, {useState} from "react";
import {connect} from "react-redux";
import {format} from "date-fns";
import {deleteExperience} from "../../actions/profile";
import Modal from "../confirm-modal/Modal";

const Experience = (props) => {
  const [toggleModal, setToggleModal] = useState(false);

  const toggleModalHandler = (val) => {
    setToggleModal(val)
  }

  const deleteExperienceHandler = (id) => {
    props.deleteExperience(id);
  }

  const experiences = props.experience.map(el => {
    return (
      <React.Fragment>
        {toggleModal && 
          <Modal
            show={toggleModal}
            toggleModal={toggleModalHandler}
            action={deleteExperienceHandler}
            actionName="deleteExperience"
            id={el._id}
          />
        }
        <tr key={el._id}>
          <td>{el.company}</td>
          <td className="hide-sm">{el.title}</td>
          <td>
            {format(new Date(el.from), "yyyy-MM-dd")} - {!el.to ? (" NOW") : format(new Date(el.to), "yyyy-MM-dd")}
          </td>
          <td>
            <button
              onClick={() => toggleModalHandler(true)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </React.Fragment>
    )
  })
  return (
    <React.Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteExperience: (id) => {
      dispatch(deleteExperience(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(Experience);
