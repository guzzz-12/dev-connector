import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from "../layout/Spinner";
import {getProfile} from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

const Profile = (props) => {
  useEffect(() => {
    props.getProfile(props.match.params.userId);
  }, [props.getProfile]);

  return (
    <React.Fragment>
      {!props.userProfile || props.loading ?
        <Spinner /> :
        <React.Fragment>
          <div className="profile-grid-my-1">
            <ProfileTop profileData={props.userProfile} />
            <ProfileAbout profileData={props.userProfile} />
          </div>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles page
          </Link>
          {props.userProfile.user._id === props.auth._id &&
            <Link to="/edit-profile" className="btn btn-dark">
              Edit your profile
            </Link>
          }
        </React.Fragment>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profileReducer.profile,
    auth: state.authReducer.user,
    loading: state.profileReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id) => {
      dispatch(getProfile(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
