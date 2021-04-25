import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import RelevantCoursesItem from './RelevantCoursesItem.jsx';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Table,
  Col,
} from 'reactstrap';

const RelevantCourses = () => {
  const [relCoursesList, setRelCoursesList] = useState([]);

  const getRelCourses = () => {
    Axios.get('/user/relevantcourses', {
      withCredentials: true,
      params: {},
    }).then(
      (response) => {
        var names = response.data.data.map(function (item) {
          return [item['CourseID'], item['CourseName'], item['AverageGPA']];
        });
        setRelCoursesList(names);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getRelCourses();
  }, []);

  var listsElements = relCoursesList.map((course) => (
    <RelevantCoursesItem
      key={course}
      courseid={course[0]}
      coursename={course[1]}
      averageGPA={course[2]}
    ></RelevantCoursesItem>
  ));

  return (
    <Col xl="5">
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Relevant Courses</h3>
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
            height: 295,
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
};

export default RelevantCourses;
