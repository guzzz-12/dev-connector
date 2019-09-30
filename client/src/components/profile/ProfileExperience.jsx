import React from "react";
import {format} from "date-fns";

const ProfileExperience = (props) => {
  const {company, title, description, from, to} = props.experienceData;
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {format(new Date(from), "yyyy-MM-dd")} - {!to ? (" NOW") : format(new Date(to), "yyyy-MM-dd")}  
      </p>
      <p>
        <strong>Position: </strong>{title}
      </p>
      {description && 
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      }
    </div>
  );
}

export default ProfileExperience;