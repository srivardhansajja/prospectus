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
import axios from "axios";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";

// reactstrap components
import { Card, CardHeader, Container, Row, Col } from "reactstrap";

const Login = () => {


  const [userData, setUserData] = useState();
  const handleLogin = async ({ tokenId }) => {
    await axios.post('/login', { idToken: tokenId, withCredentials: true })
    const resp = await axios.get('/user/profile', { withCredentials: true });
    const [info] = resp.data
    setUserData(info);
    console.log(await axios.get('/user/wishlist', { withCredentials: true }));
  }

  return (
    <>
      <div className="header bg-gradient-info py-7 py-lg-8">
        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">
                  <b>Welcome!</b>
                </h1>
                <p className="font-weight-bold text-light">
                  <b>
                    Sign in with Google to use Prospectus, or start
                    <a
                      className="font-weight-bold text-light"
                      href="/prospectus/explore"
                    >
                      {" "}
                      <u>exploring</u>&nbsp;
                    </a>
                    directly.
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
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            {userData ? <h1 className="text-center text-white">
              Hi {userData.Name}!
            </h1> : <div className="text-center mt-2 mb-2">
                <GoogleLogin className="justify-content-center"
                  clientId="293807431976-vmcdk2a59qaf0cgq8nlr2fo8qo8bp5ti"
                  buttonText="Login with Google"
                  onSuccess={handleLogin}
                  onFailure={(err) => console.log(err)}
                  cookiePolicy={'single_host_origin'}
                />
              </div>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
