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
import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import Wishlist from 'components/Wishlist';
// wishlist
import RelevantCourses from 'components/RelevantCourses.jsx';
// relevant course
import CoursesPlanner from 'components/CoursesPlanner.jsx';
import CoursesTaken from 'components/CoursesTaken.jsx';

import { Card, CardHeader, Container, Row, Col } from 'reactstrap';

import { Authorization } from '../index.js';

const Dashboard = (props) => {
  const history = useHistory();
  const isAuthorized = useContext(Authorization)[0];

  if (!isAuthorized) history.push('/auth/login');

  const [toggleRefresh, setToggleRefresh] = useState(false);

  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h2 className="text-white mb-0">Planner</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardHeader className="bg-transparent">
                    <Row>
                      <CoursesPlanner
                        semester="FA2021"
                        refresh={{ refresh: [toggleRefresh, setToggleRefresh] }}
                      />
                      <CoursesPlanner
                        semester="SP2021"
                        refresh={{ refresh: [toggleRefresh, setToggleRefresh] }}
                      />
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              <Wishlist
                page="dashboard"
                refresh={{ refresh: [toggleRefresh, setToggleRefresh] }}
              />
            </Row>

            <Row className="mt-3">
              <Col className="mb-5 mb-xl-0" xl="7">
                <RelevantCourses page="dashboard" />
              </Col>
              <Col className="mb-5 mb-xl-0">
                <CoursesTaken />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
