import React from "react";
import PlaceOffers from "../PlaceOffers/PlaceOffers";
import SpotDescription from "../SpotDescription/SpotDescription";
const HostInfo = ({ spot }) => {
  return (
    <div className="host">
      <h2>
        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
      </h2>

      <h3 style={{ fontWeight: "bold" }}>
        <i class="fa-solid fa-door-open"></i> Self check-in
      </h3>
      <p>Check yourself in with the keypad.</p>
      <h3 style={{ fontWeight: "bold" }}>
        <i class="fa-solid fa-trophy"></i> Great Superhost
      </h3>
      <p>
        Superhosts are experienced, highly rated hosts who are committed to
        providing great stays for guests.
      </p>
      <h3 style={{ fontWeight: "bold" }}>
        <i class="fa-solid fa-calendar"></i> Free Cancellation
      </h3>
      <SpotDescription spot={spot} />
      <PlaceOffers />
    </div>
  );
};

export default HostInfo;
