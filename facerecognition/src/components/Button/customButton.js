import React from "react";

const CustomButton = props => {
  return (
    <div className="lh-copy  mt3">
      <p
        onClick={() => props.onRouteChange("register")}
        className="f6 link dim black db pointer"
      >
        {props.name}
      </p>
    </div>
  );
};

export default CustomButton;
