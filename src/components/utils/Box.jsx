import React from "react";
import { Link } from "react-router-dom";

const Box = ({ name, color, disabled, to }) => {
  return (
    <Link
      className={`box ${color} ${disabled ? "box-disabled" : ""}`}
      to={to}
    >
      {name}
    </Link>
  );
};

export default Box;
