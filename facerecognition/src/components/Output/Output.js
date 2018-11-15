import React from "react";

const Output = ({ faceCount, name }) => {
  return faceCount === 1 ? (
    <div>
      <div className="white f3 ">{`Hello ${name}! `}</div>
      <div className="white f3 ">{`The magic brain has detected...`}</div>
      {console.log("In face", faceCount)}
      <div className="white f1">{faceCount + " face."}</div>
    </div>
  ) : faceCount > 1 ? (
    <div>
      <div className="white f3 ">{`Hello ${name}! `}</div>
      <div className="white f3 ">{`The magic brain has detected...`}</div>
      {console.log("In face", faceCount)}
      <div className="white f1">{faceCount + " faces."}</div>
    </div>
  ) : (
    <div className="white f3 ">{`Hello ${name}! `}</div>
  );
};

export default Output;
