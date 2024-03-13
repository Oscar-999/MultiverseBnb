import React from "react";
import "./SpotImages.css";

const SpotImage = ({ spot }) => {
  const { SpotImages } = spot;
  return (
    <div className="images">
      <div className="img1">
        <img src={SpotImages[0].url} alt="house" className="img1" />
      </div>
      <div className="img2">
        {SpotImages.slice(1, 5).map((image, index) => (
          <img key={index} src={image.url} alt="house" className="img2" />
        ))}
      </div>
    </div>
  );
};

export default SpotImage;
