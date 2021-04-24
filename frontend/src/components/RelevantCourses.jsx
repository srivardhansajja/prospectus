import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import RelevantCoursesItem from './RelevantCoursesItem.jsx';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Progress,
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
        // console.log(response.data.data);
        // data = JSON.parse(JSON.stringify(response.data));
        // console.log(data);

        var names = response.data.data.map(function (item) {
          return [item['CourseID'], item['CourseName'], item['AverageGPA']];
        });

        console.log(names);

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
            <tbody>
              {listsElements}
              {/* <tr>
                <th scope="row">ECE 110</th>
                <td>Intro to Electronics</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">3.40</span>
                    <div>
                      <Progress
                        max="100"
                        value="85"
                        barClassName="bg-gradient-success"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">ECE 120</th>
                <td>Intro to Computing</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">3.04</span>
                    <div>
                      <Progress
                        max="100"
                        value="76"
                        barClassName="bg-gradient-warning"
                      />
                    </div>
                  </div>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RelevantCourses;
