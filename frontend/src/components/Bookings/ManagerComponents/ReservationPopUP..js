
import React from 'react';
import './ReservationPopUP.css';

const ReservationPopUP = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>You must sign up or log in to make a reservation.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReservationPopUP;
