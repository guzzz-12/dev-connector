import React, {useEffect} from "react";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import {getProfiles} from "../../actions/profile";

const Profiles = (props) => {
  useEffect(() => {
    props.getProfiles();
  }, []);

  return (
    <React.Fragment>
      {props.loading ?
        <Spinner /> :
        <React.Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>
            {" "} Connect with developers
          </p>
          <div className="profiles">
            {props.profiles.length > 0 ?
              (props.profiles.map(profile => {
                return <ProfileItem key={profile._id} profileData={profile} />
              })) :
              <h4>No profiles found</h4>
            }
          </div>
        </React.Fragment>
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
