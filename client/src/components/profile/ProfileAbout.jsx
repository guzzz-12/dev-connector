import React from "react";

const ProfileAbout = (props) => {
  const {bio, skills, user} = props.profileData;

  const renderSkills = () => {
    return skills.map(skill => {
      return (
        <div key={skill} className="p-1">
          <i className="fa fa-check"></i>
          {" "}{skill}
        </div>
      )
    })
  }

  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <React.Fragment>
          <h2 className="text-primary">{user.name.split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className="line"></div>
        </React.Fragment>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {renderSkills()}
      </div>
    </div>
  );
}

export default ProfileAbout;
