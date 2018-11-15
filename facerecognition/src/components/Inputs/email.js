import React from "react";

const Email = ({ onEmailChange }) => {
  return (
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="email-address">
        Email
      </label>
      <input
        onChange={onEmailChange}
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
        type="email"
        name="email-address"
        id="email-address"
      />
    </div>
  );
};

export default Email;
