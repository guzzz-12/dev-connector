import React, {useEffect} from "react";
import {connect} from "react-redux";
import Spinner from "../spinner/Spinner";
import ProfileItem from "./ProfileItem";
import {getProfiles} from "../../actions/profile";

const Profiles = (props) => {
  useEffect(() => {
    props.getProfiles();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>
        {" "} Connect with developers
      </p>
      {props.loading && 
        <div className="spinner-container">
          <Spinner />
        </div>
      }
      {!props.loading && props.profiles.length > 0 &&
        <React.Fragment>
          <div className="profiles">
            {props.profiles.map(profile => {
              return <ProfileItem key={profile._id} profileData={profile} />
            })}
          </div>
        </React.Fragment>      
      }
      {!props.loading && props.profiles.length === 0 &&
        <h4>No profiles found</h4>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profileReducer.profiles,
    loading: state.profileReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfiles: () => {
      dispatch(getProfiles())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
