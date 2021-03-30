import React, { useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap";

const ProspectusNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="bg-gradient-info" color="light " light expand="md">
        <NavbarBrand
          className="text-white"
          style={{
            fontWeight: "bold",
            fontSize: "20pt",
            backgroundColor: "black",
            borderRadius: "10px",
          }}
          href="/"
        >
          &nbsp; PROSPECTUS &nbsp;
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink
                className="text-white"
                style={{ fontWeight: "bold", fontSize: "15pt" }}
                href="/prospectus/dashboard"
              >
                <i className="ni ni-app" />
                &nbsp;Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="text-white"
                style={{ fontWeight: "bold", fontSize: "15pt" }}
                href="/prospectus/explore"
              >
                <i className="ni ni-planet" />
                &nbsp;Explore
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Nav>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={require("../assets/img/profile.jpg").default}
                />
              </span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="/prospectus/user-profile">
                Profile / Settings
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/auth/login">Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default ProspectusNavbar;
