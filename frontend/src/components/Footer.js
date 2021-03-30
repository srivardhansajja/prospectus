import React from "react";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <Row className="align-items-center justify-content-xl-between">
      <Col xl="8">
        <div>
          <a
            className="font-weight-bold ml-1"
            href="https://www.creative-tim.com?ref=adr-admin-footer"
            target="_blank"
          >
            Project Track 1, CS 411 Spring 2021, University of Illinois
            Urbana-Champaign
          </a>
        </div>
      </Col>

      <Col xl="4">
        <Nav className="nav-footer justify-content-center justify-content-xl-end">
          <NavItem>
            <NavLink
              href="https://www.creative-tim.com?ref=adr-admin-footer"
              target="_blank"
            >
              Team 14: YesSQL
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
    </Row>
  );
};

export default Footer;
