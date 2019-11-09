import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from "../layout/Spinner";
import {getProfile} from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileRepos from "./ProfileRepos";
import { CLEAR_PROFILE } from "../../actions/types";

const Profile = (props) => {
  useEffect(() => {
    props.getProfile(props.match.params.userId);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {!props.userProfile && props.loading && <Spinner />}
      {props.userProfile && 
        <React.Fragment>
          <div className="profile-grid my-1">
            <ProfileTop profileData={props.userProfile} />
            <ProfileAbout profileData={props.userProfile} />
            
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {props.userProfile.experience.length > 0 ?
                props.userProfile.experience.map(exp => {
                  return <ProfileExperience key={exp._id} experienceData={exp} />
                }) :             
                <h4>No experience credentials</h4>
              }
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {props.userProfile.education.length > 0 ?
                props.userProfile.education.map(edu => {
                  return <ProfileEducation key={edu._id} educationData={edu} />
                }) :
                <h4>No education credentials</h4>
              }
            </div>
          </div>
          
          <div className="profile-github">
            <h2 className="text-primary my-1">
              <i className="fab fa-github"></i> Github Repos
            </h2>
            {props.userProfile.githubUsername ?
              <ProfileRepos githubUser={props.userProfile.githubUsername} /> :
              <h4>No github repositories</h4>
            }
          </div>

          <div className="my-1">
            <Link to="/profiles" className="btn btn-light">
              Back to profiles page
            </Link>
            {props.userProfile.user._id === props.auth._id &&
              <Link to="/edit-profile" className="btn btn-dark">
                Edit your profile
              </Link>
            }
          </div>
        </React.Fragment>
      }
      {props.error.msg &&
        <div className="my-1">
          <h2 className="text-primary">{props.error.msg}</h2>
          <Link to="/posts" className="btn btn-light">
              Back to posts
            </Link>
        </div>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profileReducer.profile,
    error: state.profileReducer.error,
    auth: state.authReducer.user,
    loading: state.profileReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id) => {
      dispatch(getProfile(id))
    },
    clearProfile: () => {
      dispatch({type: CLEAR_PROFILE})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
