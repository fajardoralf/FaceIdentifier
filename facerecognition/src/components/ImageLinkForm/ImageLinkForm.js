import React from "react";

import "./ImageLinkForm.css";
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <form onSubmit={onButtonSubmit}>
      <div id="form">
        <p className="f3">
          {"This magic Brain will detect faces in your picture."}
        </p>
        <div className="center">
          <div className="form center pa4 br3">
            <input
              onChange={onInputChange}
              placeholder="place your url here"
              className="f4 pa2 w-70 center z-1"
              type="text"
            />
            <button
              onClick={onButtonSubmit}
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ImageLinkForm;
