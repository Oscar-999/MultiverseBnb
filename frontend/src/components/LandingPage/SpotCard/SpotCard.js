import React from "react";
import {Link} from 'react-router-dom'
import './SpotCard.css'
const SpotCard = ({ spot }) => {
  return (
    <div key={spot.id} className="spot" title={spot.name}>
      <Link to={`/spots/${spot.id}`}>
        <div className="image">
          <img src={spot.previewImage} alt="home" />
        </div>
        <div className="list">
          <div className="star">
            <li>
              {spot.city}, {spot.state}
            </li>
            {spot.avgRating === 0 ? (
              <li className="star-avg">★ New</li>
            ) : (
              typeof spot.avgRating === "number" && (
                <li className="star-avg">★ {spot.avgRating.toFixed(1)}</li>
              )
            )}
          </div>
          <li className="price">${spot.price} night</li>
        </div>
      </Link>
    </div>
  );
};

export default SpotCard;
