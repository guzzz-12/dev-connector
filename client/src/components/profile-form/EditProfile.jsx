import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {createProfile, getCurrentProfile} from "../../actions/profile";

const EditProfile = (props) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubUsername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocial, toggleSocial] = useState(false);

  useEffect(() => {
    props.getCurrentProfile();
    props.profile && console.log(props.profile.skills)
    setFormData({
      company: props.loading || !props.profile.company ? "" : props.profile.company,
      website: props.loading || !props.profile.website ? "" : props.profile.website,
      location: props.loading || !props.profile.location ? "" : props.profile.location,
      status: props.loading || !props.profile.status ? "" : props.profile.status,
      skills: props.loading || !props.profile.skills ? "" : props.profile.skills.join(", "),
      githubUsername: props.loading || !props.profile.githubUsername ? "" : props.profile.githubUsername,
      bio: props.loading || !props.profile.bio ? "" : props.profile.bio,
      twitter: props.loading || !props.profile.social ? "" : props.profile.social.twitter,
      facebook: props.loading || !props.profile.social ? "" : props.profile.social.facebook,
      linkedin: props.loading || !props.profile.social ? "" : props.profile.social.linkedin,
      youtube: props.loading || !props.profile.social ? "" : props.profile.social.youtube,
      instagram: props.loading || !props.profile.social ? "" : props.profile.social.instagram,
    })
    // eslint-disable-next-line
  }, []);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.createUserProfile(formData, props.history)
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <select name="status" onChange={onChangeHandler} value={formData.status}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={formData.company}
            onChange={onChangeHandler}
          />
          <small className="form-text">Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={formData.website}
            onChange={onChangeHandler}
          />
          <small className="form-text">Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={onChangeHandler}
          />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={formData.skills}
            onChange={onChangeHandler}
          />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubUsername"
            value={formData.githubUsername}
            onChange={onChangeHandler}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={formData.bio}
            onChange={onChangeHandler}>            
          </textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocial(!displaySocial)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocial && (
          <React.Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={formData.twitter}
                onChange={onChangeHandler} />
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={formData.facebook}
                onChange={onChangeHandler} />
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={formData.youtube}
                onChange={onChangeHandler} />
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={formData.linkedin}
                onChange={onChangeHandler} />
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={formData.instagram}
                onChange={onChangeHandler} />
            </div>
          </React.Fragment>
        )}
        <input value="Submit" type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.profile,
    loading: state.authReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUserProfile: (data, history) => {
      dispatch(createProfile(data, history, true))
    },
    getCurrentProfile: () => {
      dispatch(getCurrentProfile())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
