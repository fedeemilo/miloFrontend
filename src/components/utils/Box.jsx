import React from "react";
import { Link } from "react-router-dom";

const Box = ({ name, color, disabled, to, newFeature }) => {
  return (
    <Link
      className={`box ${color} ${disabled ? "box-disabled" : ""}`}
      to={to}
    >
      {name}
      {newFeature ? <p className="new-feature">NUEVO</p> : ""}
    </Link>
  );
};

export default Box;
