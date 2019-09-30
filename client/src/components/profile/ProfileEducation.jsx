import React from "react";
import {format} from "date-fns";

const ProfileEducation = (props) => {
  const {school, degree, fieldOfStudy, description, from, to} = props.educationData;
  return (
    <div>
      <h3>{school}</h3>
      <p>
        {format(new Date(from), "yyyy-MM-dd")} - {!to ? (" NOW") : format(new Date(to), "yyyy-MM-dd")}
      </p>
      <p><strong>Degree: </strong>{degree}</p>
      <p><strong>Field Of Study: </strong>{fieldOfStudy}</p>
      {description && 
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      }
    </div>
  );
}

export default ProfileEducation;