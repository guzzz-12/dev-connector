import React from "react";
import {Link} from "react-router-dom";

const ProfileItem = (props) => {
  const {_id, name, avatar} = props.profileData.user;
  const {status, company, location, skills} = props.profileData;
  return (
    <div className="profile bg-light">
      <img src={avatar} alt={name} className="round-img"/>
      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span>at {company}</span>}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profiles/user/${_id}`} className="btn btn-primary">
          View profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, i) => {
          return <li key={i} className="text-primary">
            <i className="fas fa-check"></i>
            {" "}{skill}
          </li>
        })}
      </ul>
    </div>
  );
}

export default ProfileItem;
