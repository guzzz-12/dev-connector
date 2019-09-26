import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, isAuth, isLoading, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => !isAuth && !isLoading ?
        (<Redirect to="/login" />) :
        (<Component {...props} />)
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuthenticated,
    isLoading: state.authReducer.loading
  }
}

export default connect(mapStateToProps)(PrivateRoute);
