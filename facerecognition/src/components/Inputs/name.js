import React from "react";

const Name = ({ onNameChange }) => {
  return (
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="name">
        Name
      </label>
      <input
        onChange={onNameChange}
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
        type="name"
        name="name"
        id="names"
      />
    </div>
  );
};

export default Name;
