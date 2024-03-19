import React from "react";
import "./ThingsToKnow.css";

export default function ThingsToKnow() {
  return (
    <>
      <h2>Things To Know</h2>
      <div className="things-to-know-container">
        <div className="things-to-know-col">
          <h3>House Rules</h3>
          <p>No smoking</p>
          <p>6 guests maximum</p>
          <p>Quiet Hours: 11PM - 8AM</p>
        </div>
        <div className="things-to-know-col">
          <h3>Safety & Property</h3>
          <p>Smoke alarm</p>
          <p>Carbon monoxide alarm</p>
          <p>Security Ring Door Camera</p>
        </div>
        <div className="things-to-know-col">
          <h3>Cancellation Policy</h3>
          <p>Free cancellation 1 month before booked dates</p>
          <p>
            Review the Host's full cancellation policy which applies even if you
            cancel for illness or disruptions caused by COVID-19.
          </p>
        </div>
      </div>
    </>
  );
}
