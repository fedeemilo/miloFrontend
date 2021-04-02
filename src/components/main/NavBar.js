import React, { useState } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler
} from "reactstrap";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar
        className="d-flex justify-content-center"
        color="dark"
        dark
        expand="md"
      >
        <NavbarBrand href="/" style={{ fontSize: "1.9rem" }}>
          Milo Soft
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    </div>
  );
}

export default NavBar;
