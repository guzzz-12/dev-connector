import React from "react";
import {connect} from "react-redux";
import Moment from "react-moment";
import {deleteExperience} from "../../actions/profile";

const Experience = (props) => {
  const experiences = props.experience.map(el => {
    return (
      <tr key={el._id}>
        <td>{el.company}</td>
        <td className="hide-sm">{el.title}</td>
        <td>
          <Moment format="YYYY-MM-DD">{el.from}</Moment> - {
            !el.to ? (" Now") : (<Moment format="YYYY-MM-DD">{el.to}</Moment>)
          }
        </td>
        <td>
          <button
            onClick={() => props.deleteExperience(el._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
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
