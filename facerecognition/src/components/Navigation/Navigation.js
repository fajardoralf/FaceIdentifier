import React from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {
  return(
    isSignedIn ? 
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p onClick={() => onRouteChange('signin')} 
      className="f3 link dim black underline pa3 pointer z-1">Sign Out</p>
    </nav>
   :
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange('register')} 
        className="f3 link dim black underline pa3 pointer z-1">Register</p>
       <p onClick={() => onRouteChange('signin')} 
       className="f3 link dim black underline pa3 pointer z-1">Sign In</p>
    </nav>
  );
};

export default Navigation;
