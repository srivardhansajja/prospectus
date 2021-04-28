import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import CoursesTakenItem from './CoursesTakenItem.jsx';
import { Authorization } from '../index.js';

import { Card, CardHeader, CardBody, Row, Table, Col } from 'reactstrap';
import { data } from 'jquery';

const CoursesTaken = () => {
  const [CoursesTakenList, setCoursesTakenList] = useState([]);
  const isAuthorized = useContext(Authorization)[0];

  const getCoursesTaken = () => {
    if (isAuthorized) {
      Axios.get('/user/coursesTaken', {
        withCredentials: true,
        params: {},
      }).then(
        (response) => {
          var names = response.data.data.map(function (item) {
            return [
              item['CourseID_ct'],
              item['CourseName'],
              item['CreditHours'],
            ];
          });
          setCoursesTakenList(names);
        },
        (error) => {
          console.log(error);
        }
      );
      return data;
    }
    return [];
  };

  useEffect(() => {
    getCoursesTaken();
    // eslint-disable-next-line
  }, []);

  var listsElements = CoursesTakenList.map((course) => (
    <CoursesTakenItem
      key={course}
      courseid={course[0]}
      coursename={course[1]}
      credithours={course[2]}
      onChange={getCoursesTaken}
    ></CoursesTakenItem>
  ));

  return (
    <Col xl="13">
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Courses Taken</h3>
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
          <Table className="table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Course ID</th>
                <th scope="col">Course Name</th>
                <th scope="col">Credit Hours</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{listsElements}</tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CoursesTaken;
