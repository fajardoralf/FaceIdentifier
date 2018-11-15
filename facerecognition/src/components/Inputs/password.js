import React from "react";

const Password = ({ onPasswordChange }) => {
  return (
    <div className="mv3">
      <label className="db fw6 lh-copy f6" htmlFor="password">
        Password
      </label>
      <input
        onChange={onPasswordChange}
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
        type="password"
        name="password"
        id="password"
      />
    </div>
  );
};

export default Password;
