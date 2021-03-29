import React from "react";
import { Link } from "react-router-dom";

const Box = ({ name, color, disabled, to }) => {
  return (
    <div className={`box ${color} ${disabled ? 'box-disabled' : ''}`}>
      <Link to={to}>{name}</Link>
    </div>
  );
};

export default Box;
