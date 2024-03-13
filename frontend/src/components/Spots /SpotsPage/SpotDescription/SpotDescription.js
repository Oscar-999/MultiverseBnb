import "./SpotDescription.css";

import React from "react";

const SpotDescription = ({spot}) => {
  return (
    <div className="description">
      <h2>About this spot</h2>
      <p>{spot.description}</p>
    </div>
  );
};

export default SpotDescription;
