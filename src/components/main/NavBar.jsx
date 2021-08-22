import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar
        className="d-flex justify-content-center user-select-none"
        color="dark"
        dark
        expand="md"
      >
        <NavbarBrand href="/" style={{ fontSize: "1.9rem", fontWeight: "800" }}>
          Milo Soft
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    </div>
  );
};

export default NavBar;
