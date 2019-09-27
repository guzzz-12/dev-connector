import React from "react";
import spinner from "../common/spinner.gif";

const Spinner = () => {
  return (
    <React.Fragment>
      <img
        src={spinner}
        alt="Loading"
        style={{display: "block", width: "200px", margin: "auto"}}
      />
    </React.Fragment>
  );
}

export default Spinner;
