import React from "react";
import SpotCard from "../SpotCard/SpotCard";

const SpotList = ({ spots }) => {
  return (
    <main className="main landing-page">
      <ul>
        {spots.length > 0 &&
          spots.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
      </ul>
    </main>
  );
};

export default SpotList;
