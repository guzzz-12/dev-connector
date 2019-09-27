import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/profile";
import Spinner from "../layout/Spinner";

const Dashboard = (props) => {
  useEffect(() => {
    props.getCurrentProfile()
  }, [])

  return (
    props.isLoading && props.profile === null ?
      <Spinner /> :
      <React.Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i>
          Welcome {props.user && props.user.name}
        </p>
        {props.profile !== null ?
          <React.Fragment>
            Has profile
          </React.Fragment> :
          <React.Fragment>
            <p>You have not created a profile yet</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </React.Fragment>
        }
      </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    profile: state.profileReducer.profile,
    isAuth: state.authReducer.isAuthenticated,
    isLoading: state.authReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentProfile: () => {
      dispatch(getCurrentProfile())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
