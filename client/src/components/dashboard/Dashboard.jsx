import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getCurrentProfile, deleteUserAccount} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

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
            <DashboardActions />
            {props.profile.experience.length > 0 && (
              <Experience experience={props.profile.experience} />
            )}
            {props.profile.education.length > 0 && (
              <Education education={props.profile.education} />
            )}
            <div className="my-2">
              <button onClick={() => props.deleteUserAccount()} className="btn btn-danger">
                <i className="fas fa-user-minus"></i>
                {" "}Delete My Account
              </button>
            </div>
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
    },
    deleteUserAccount: () => {
      dispatch(deleteUserAccount())
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
