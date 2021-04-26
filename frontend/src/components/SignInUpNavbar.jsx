/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

import { Authorization } from '../index.js';

const SignInUpNavbar = () => {
  const isAuthorized = useContext(Authorization)[0];
  const [navbarLink, setNavbarLink] = useState('/auth/login');

  useEffect(() => {
    if (isAuthorized) setNavbarLink('/prospectus/explore');
    else setNavbarLink('/auth/login');
  }, [isAuthorized]);

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand
            className="text-white"
            style={{
              fontWeight: 'bold',
              fontSize: '20pt',
              backgroundColor: 'black',
              borderRadius: '10px',
            }}
            to={navbarLink}
            tag={Link}
          >
            &nbsp; PROSPECTUS &nbsp;
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <NavbarBrand
                    className="text-white"
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20pt',
                      backgroundColor: 'black',
                      borderRadius: '10px',
                    }}
                    href="/auth/login"
                  >
                    &nbsp; PROSPECTUS &nbsp;
                  </NavbarBrand>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default SignInUpNavbar;
