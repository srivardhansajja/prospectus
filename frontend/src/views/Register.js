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
import React from "react";

// reactstrap components
import { Button, Card, CardHeader, Container, Row, Col } from "reactstrap";

const Register = () => {
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
                    Sign up with Google to use Prospectus, or start
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
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-4 mb-3">
                  <small>
                    <b>Sign up</b> with
                  </small>
                </div>
                <div className="text-center mt-2 mb-4">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={require("../assets/img/google.svg").default}
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
                <div
                  style={{ padding: "20" }}
                  className="text-muted text-center"
                >
                  <small style={{ margin: "20" }}>
                    Already signed up?{" "}
                    <a className="font-weight-bold" href="/auth/login">
                      <u>Sign in</u>
                    </a>
                  </small>
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
