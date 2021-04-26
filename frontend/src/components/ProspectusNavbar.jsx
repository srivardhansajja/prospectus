import { Authorization } from 'index';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

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
} from 'reactstrap';

const ProspectusNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const setIsAuthorized = useContext(Authorization)[1];

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="bg-gradient-info" color="light " light expand="md">
        <NavbarBrand
          className="text-white"
          style={{
            fontWeight: 'bold',
            fontSize: '20pt',
            backgroundColor: 'black',
            borderRadius: '10px',
          }}
          to="/prospectus/explore"
          tag={Link}
        >
          &nbsp; PROSPECTUS &nbsp;
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink
                className="text-white"
                style={{ fontWeight: 'bold', fontSize: '15pt' }}
                to="/prospectus/dashboard"
                tag={Link}
              >
                <i className="ni ni-app" />
                &nbsp;Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="text-white"
                style={{ fontWeight: 'bold', fontSize: '15pt' }}
                to="/prospectus/explore"
                tag={Link}
              >
                <i className="ni ni-planet" />
                &nbsp;Explore
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Nav>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={require('../assets/img/profile.jpg').default}
                />
              </span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                to="/prospectus/user-profile"
                tag={Link}
                style={{ textAlign: 'right' }}
              >
                Profile / Settings
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                href="/auth/login"
                onClick={() => {
                  setIsAuthorized(false);
                }}
                style={{ textAlign: 'right' }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default ProspectusNavbar;
