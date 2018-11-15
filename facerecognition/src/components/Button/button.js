import React from "react";

const Button = props => {
  return (
    <div className="">
      <input
        onClick={props.onSubmit}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        type="submit"
        value={props.name}
      />
    </div>
  );
};

export default Button;
