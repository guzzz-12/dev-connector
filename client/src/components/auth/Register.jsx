import React, {useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import PropTypes from "prop-types";

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const {name, email, password, passwordConfirm} = formData;

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== passwordConfirm) {
      props.setAlert("Passwords don't match", "danger")
    } else {
      //Ejecutar el action para registrar el usuario
      props.register(formData);
      //Limpiar los datos del formulario
      setFormData({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
      })
    }
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChangeHandler(e)}
            required
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            minLength="6"
            value={passwordConfirm}
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </React.Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => {
      dispatch(setAlert(msg, alertType))
    },
    register: (data) => {
      dispatch(register(data))
    }
  }
}

export default connect(null, mapDispatchToProps)(Register);
