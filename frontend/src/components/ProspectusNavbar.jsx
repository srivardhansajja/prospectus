import { Authorization } from 'index';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

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
  const [profPic, setProfPic] = useState('');
  const setIsAuthorized = useContext(Authorization)[1];

  const toggle = () => setIsOpen(!isOpen);

  Axios.get('/user/profile', {
    withCredentials: true,
  }).then((response) => {
    setProfPic(response.data[0].Picture);
  });

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://i.stack.imgur.com/34AD2.jpg';
  };

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
                  alt="Unable to load. Place a new URL in My Account"
                  src={profPic}
                  onError={addDefaultSrc}
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
