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
import axios from 'axios';
import React, { useState, useContext } from 'react';
import GoogleLogin from 'react-google-login';

import { Link } from 'react-router-dom';

import { Authorization } from '../index.js';

// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap';

const Login = () => {
  const [userData, setUserData] = useState();
  const setIsAuthorized = useContext(Authorization)[1];

  const handleLogin = async ({ tokenId }) => {
    await axios.post('/login', { idToken: tokenId, withCredentials: true });
    const resp = await axios.get('/user/profile', { withCredentials: true });
    const [info] = resp.data;
    setUserData(info);
  };

  return (
    <>
      <div className="header bg-gradient-info py-7 py-lg-8">
        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6" style={{ marginTop: 100, marginBottom: -70 }}>
                <h1 style={{ fontSize: 50 }} className="text-white">
                  <b>Welcome!</b>
                </h1>
                <p
                  style={{ fontSize: 20 }}
                  className="font-weight-bold text-light"
                >
                  <b>
                    Sign in or Register with Google to start using PROSPECTUS
                  </b>
                </p>
              </Col>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
      {/* Page content */}
      <Container className="mt--8 pb-8">
        {/* <Row className="justify-content-center" style={{ marginTop: 60 }}>
          <Col lg="6" md="8"> */}
        {userData ? (
          <Row
            className="justify-content-center"
            style={{
              marginTop: 30,
            }}
          >
            <Col lg="6" md="8" className="text-center">
              <h1 className="text-center text-white">Hi {userData.Name}!</h1>

              <Button
                className="btn-neutral btn-icon"
                color="default"
                to="/prospectus/explore"
                tag={Link}
              >
                <span className="btn-inner--text">Explore</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                to="/prospectus/dashboard"
                tag={Link}
              >
                <span className="btn-inner--text">Dashboard</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                to="/prospectus/user-profile"
                tag={Link}
              >
                <span className="btn-inner--text">Profile</span>
              </Button>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center" style={{ marginTop: 60 }}>
            <Col lg="6" md="8">
              <div className="text-center mt-2 mb-2">
                <GoogleLogin
                  className="justify-content-center"
                  render={(renderProps) => (
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      onClick={() => {
                        renderProps.onClick();
                        setIsAuthorized(true);
                      }}
                      disabled={renderProps.disabled}
                    >
                      <span className="btn-inner--icon">
                        <img
                          alt="..."
                          src={require('../assets/img/google.svg').default}
                        />
                      </span>
                      <span className="btn-inner--text">
                        Sign In / Register with Google
                      </span>
                    </Button>
                  )}
                  clientId="293807431976-vmcdk2a59qaf0cgq8nlr2fo8qo8bp5ti"
                  buttonText="Sign in / Register with Google"
                  onSuccess={handleLogin}
                  onFailure={(err) => console.log(err)}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Login;
