import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addExperience} from "../../actions/profile";

const AddExperience = (props) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
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
    props.addExperience(formData, props.history);
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={formData.title}
            onChange={onChangeHandler}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            onChange={onChangeHandler}
            value={formData.company}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={onChangeHandler}
            value={formData.location}
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
            {" "}Current Job
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
            placeholder="Job Description"
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
    addExperience: (formData, history) => {
      dispatch(addExperience(formData, history))
    }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AddExperience));
