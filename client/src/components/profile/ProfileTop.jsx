import React from "react";

const ProfileTop = (props) => {
  const {user, status, company, location, website, social} = props.profileData

  const renderSocialLinks = () => {
    let socialLinks = [];
    for(let item in social) {
      socialLinks.push(
        <a key={item} href={social[item]} target="_blank" rel="noopener noreferrer">
          <i className={`fab fa-${item} fa-2x`}></i>
        </a>
      )
    }
    return socialLinks;
  }

  return (
    <div className="profile-top bg-primary p-2">
      <img
        className="round-img my-1"
        src={user.avatar}
        alt={user.name}
      />
      <h1 className="large">{user.name}</h1>
      <p className="lead">{status} {company && <span>at {company}</span>}</p>
      <p>{location}</p>
      <div className="icons my-1">
        {website && 
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        }
        {renderSocialLinks()}
      </div>
    </div>
  );
}

export default ProfileTop;
