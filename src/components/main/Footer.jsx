import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar
            className="d-flex justify-content-center user-select-none navbar fixed-bottom"
            color="dark"
            dark
            expand="md"
        >
            <NavbarBrand href="/" className="font-italic">
                <small>&copy; Copyright 2022 milosoft</small>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
        </Navbar>
    );
};

export default Footer;
