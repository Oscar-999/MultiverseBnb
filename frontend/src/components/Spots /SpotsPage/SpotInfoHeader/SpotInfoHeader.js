import React from "react";
import SpotImage from "../SpotImage/SpotImage";
import './SpotInfoHeader.css'
const SpotInfoHeader = ({ spot }) => {
  return (
    <div>
      <h1>{spot.name}</h1>
      <div className="info">
        {spot.city}, {spot.state}, {spot.country}
      </div>
      <SpotImage spot={spot} />
    </div>
  );
};

export default SpotInfoHeader;
