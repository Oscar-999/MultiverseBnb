import React from 'react';
import "./PlaceOffers.css";

const PlaceOffers = () => {
    return (
        <>
            <h1>
                What this place offers
            </h1>
            <div className='place-offers-container'>

                <div className="left-place-offers">
                    <p><i class="fa-solid fa-kitchen-set"></i> Kitchen</p>
                    <p><i class="fa-solid fa-wifi"></i> Wifi</p>
                    <p><i class="fa-solid fa-desktop"></i> Dedicated workspace</p>
                    <p><i class="fa-solid fa-paw"></i> Pets allowed</p>
                    <p><i class="fa-solid fa-tv"></i> TV</p>
                </div>

                <div className="right-place-offers">
                    <p><i class="fa-solid fa-hand-sparkles"></i> Washer & Dryer</p>
                    <p><i class="fa-solid fa-bath"></i> Bathtub</p>
                    <p><i class="fa-solid fa-car"></i> Free parking on premises</p>
                    <p><i class="fa-solid fa-leaf"></i> Backyard</p>
                </div>

            </div>
        </>
    )
}
export default PlaceOffers;
