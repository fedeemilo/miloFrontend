/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Tooltip } from "reactstrap";
import { alertOffErrorAction } from "../../redux/globalDucks";
import PlusIcon from "../utils/PlusIcon";
import { useDispatch } from "react-redux";

const Header = ({ headerTitle, toggleCreate, tooltipOpen, toggle }) => {
  const dispatch = useDispatch();

  let handleCreate = () => {
    toggleCreate();
    dispatch(alertOffErrorAction());
  };

  return (
    <div className="mt-5 components__header d-flex justify-content-center">
      <h3 className="ml-4 text-uppercase text-center user-select-none">
        {headerTitle}
      </h3>
      <a
        id="TooltipPlusIcon"
        href="#"
        onClick={handleCreate}
        className="mr-3 position-absolute"
        style={{ left: ".5rem" }}
      >
        <PlusIcon />
      </a>
      <Tooltip
        placement="right"
        isOpen={tooltipOpen}
        target="TooltipPlusIcon"
        toggle={toggle}
      >
        Crear nuevo
      </Tooltip>
    </div>
  );
};

export default Header;
