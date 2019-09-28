import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addEducation} from "../../actions/profile";

const AddEducation = (props) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleToDateDisabled] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.addEducation(formData, props.history);
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">
       Add an Education
      </h1>
      <p className="lead">
      <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={formData.school}
            onChange={onChangeHandler}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            onChange={onChangeHandler}
            value={formData.degree}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldOfStudy"
            onChange={onChangeHandler}
            value={formData.fieldOfStudy}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            onChange={onChangeHandler}
            value={formData.from}
          />
        </div>
         <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              onChange={() => {
                setFormData({...formData, current: !formData.current});
                toggleToDateDisabled(!toDateDisabled)
              }}
              checked={formData.current}
              value={formData.current}
            />
            {" "}Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={formData.to}
            onChange={onChangeHandler}
            disabled={toDateDisabled ? true : false}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            onChange={onChangeHandler}
            value={formData.description}
            placeholder="Program Description"
          ></textarea>
        </div>
        <input
          value="Submit"
          type="submit"
          className="btn btn-primary my-1"
        />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEducation: (formData, history) => {
      dispatch(addEducation(formData, history))
    }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AddEducation));
