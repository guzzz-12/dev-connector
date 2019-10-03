import React, {useState} from "react";
import {connect} from "react-redux";
import {format} from "date-fns";
import {deleteEducation} from "../../actions/profile";
import Modal from "../confirm-modal/Modal";

const Education = (props) => {
  const [toggleModal, setToggleModal] = useState(false);

  const toggleModalHandler = (val) => {
    setToggleModal(val)
  }

  const deleteEducationHandler = (id) => {
    props.deleteEducation(id);
  }

  const education = props.education.map(el => {
    return (
      <React.Fragment key={el._id}>
        {toggleModal &&
          <Modal
            show={toggleModal}
            toggleModal={toggleModalHandler}
            action={deleteEducationHandler}
            actionName="deleteEducation"
            id={el._id}
          />
        }
        <tr key={el._id}>
          <td>{el.school}</td>
          <td className="hide-sm">{el.degree}</td>
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
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEducation: (id) => {
      dispatch(deleteEducation(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(Education);
