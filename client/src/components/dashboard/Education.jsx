import React from "react";
import {connect} from "react-redux";
import Moment from "react-moment";
import {deleteEducation} from "../../actions/profile";

const Education = (props) => {
  const education = props.education.map(el => {
    return (
      <tr key={el._id}>
        <td>{el.school}</td>
        <td className="hide-sm">{el.degree}</td>
        <td>
          <Moment format="YYYY-MM-DD">{el.from}</Moment> - {
            !el.to ? (" Now") : (<Moment format="YYYY-MM-DD">{el.to}</Moment>)
          }
        </td>
        <td>
          <button
            onClick={() => props.deleteEducation(el._id)}
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
