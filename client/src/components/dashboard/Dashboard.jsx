import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/profile";

const Dashboard = (props) => {
  useEffect(() => {
    props.getCurrentProfile()
  }, [])

  return (
    <div>
      Dashboard
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.profile,
    isAuth: state.authReducer.isAuthenticated
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
