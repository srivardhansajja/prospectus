import React from 'react';

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

const Footer = () => {
  return (
    <Row className="align-items-center justify-content-xl-between">
      <Col xl="8">
        <div>
          <a
            className="font-weight-bold ml-1"
            href="https://wiki.illinois.edu/wiki/display/CS411AASP21/Project+Track+1"
            target="_blank"
            rel="noreferrer"
          >
            Project Track 1, CS 411 Spring 2021, University of Illinois
            Urbana-Champaign
          </a>
        </div>
      </Col>

      <Col xl="4">
        <Nav
          className="nav-footer justify-content-center justify-content-xl-end"
          style={{ marginTop: -20, marginBottom: -20 }}
        >
          <NavItem>
            <NavLink
              href="https://wiki.illinois.edu/wiki/display/CS411AASP21/Project+YesSQL"
              target="_blank"
              rel="noreferrer"
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
