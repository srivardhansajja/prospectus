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
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
import Wishlist from 'components/Wishlist';
// wishlist
import RelevantCourses from 'components/RelevantCourses.jsx';
// relevant course
import CoursesPlanner from 'components/CoursesPlanner.jsx';
import CoursesTaken from 'components/CoursesTaken.jsx';

import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';

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
                        <h2 className="text-white mb-0">Course Planner</h2>
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
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Recommended Courses</h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table
                    style={{ height: 20 }}
                    className="align-items-center table-flush"
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Course ID</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Credit Hours</th>
                        <th scope="col">Average GPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">CS 498</th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">ME 180</th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">CS 242</th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">ECE 374</th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">ECE 445</th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
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
