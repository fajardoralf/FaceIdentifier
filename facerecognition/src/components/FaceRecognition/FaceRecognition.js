import React from "react";

import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, boxes, error }) => {
  if (error === "Invalid request") {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <p>Please provide a valid url</p>
      </div>
    );
  }

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageURL} alt="" width="500" height="auto" />
        {boxes.map(box => (
          <div
            className="bounding-box"
            key={`box${box.topRow}${box.rightCol}`}
            style={{
              top: box.topRow,
              right: box.rightCol,
              left: box.leftCol,
              bottom: box.bottomRow
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
