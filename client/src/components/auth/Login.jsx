import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../actions/auth";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email, password} = formData;

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    props.login(formData);
    setFormData({
      email: "",
      password: ""
    })
  }

  if(props.isAuth) {
    return <Redirect to="/dashboard" />   
  }

  return (
    <React.Fragment>
      {props.isLoading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChangeHandler(e)}
            required
          />
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </React.Fragment>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.loading,
    isAuth: state.authReducer.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      dispatch(login(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);