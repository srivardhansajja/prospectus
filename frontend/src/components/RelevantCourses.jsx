import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import RelevantCoursesItem from './RelevantCoursesItem.jsx';
import { Authorization } from '../index.js';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Table,
  Col,
} from 'reactstrap';

const RelevantCourses = (props) => {
  const [relCoursesList, setRelCoursesList] = useState([]);
  const isAuthorized = useContext(Authorization)[0];

  const getRelCourses = async () => {
    if (isAuthorized)
      Axios.get('/user/relevantcourses', {
        withCredentials: true,
        params: {},
      }).then(
        (response) => {
          var names = response.data.data.map(function (item) {
            return [item['CourseID'], item['CourseName'], item['AverageGPA']];
          });
          names.sort((a, b) => (a[2] > b[2] ? -1 : 1));
          setRelCoursesList(names);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getRelCourses();
    // eslint-disable-next-line
  }, []);

  let listsElements = null;
  if (props.page === 'dashboard') {
    listsElements = relCoursesList.map((course) => (
      <RelevantCoursesItem
        key={course}
        page="dashboard"
        courseid={course[0]}
        coursename={course[1]}
        averageGPA={course[2]}
      ></RelevantCoursesItem>
    ));
  } else if (props.page === 'explore') {
    listsElements = relCoursesList.map((course) => (
      <RelevantCoursesItem
        key={course}
        page="explore"
        courseid={course[0]}
        coursename={course[1]}
        averageGPA={course[2]}
      ></RelevantCoursesItem>
    ));
  }

  if (props.page === 'dashboard') {
    return (
      <Col xl="13">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Recommended Courses</h3>
              </div>
              <div className="col text-right">
                <Button color="info" onClick={getRelCourses} size="sm">
                  Refresh
                </Button>
              </div>
            </Row>
          </CardHeader>
          <CardBody
            style={{
              padding: 0,
              overflowY: 'auto',
              height: 290,
            }}
          >
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Course ID</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Average GPA</th>
                </tr>
              </thead>
              <tbody>{listsElements}</tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  } else if (props.page === 'explore') {
    return (
      <Col xl="5">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Recommended Courses</h3>
              </div>
              <div className="col text-right">
                <Button color="info" onClick={getRelCourses} size="sm">
                  Refresh
                </Button>
              </div>
            </Row>
          </CardHeader>
          <CardBody
            style={{
              padding: 0,
              overflowY: 'auto',
              height: 260,
            }}
          >
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Course ID</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Average GPA</th>
                </tr>
              </thead>
              <tbody>{listsElements}</tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
};

export default RelevantCourses;
